import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import {
  getHeaderLogoVariant,
  getHeaderThemeWithContrast,
  type BackgroundContrast,
  type HeaderTheme,
} from "@/lib/branding";

const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "For Employers",
    children: [
      { label: "Talent Solutions", href: "#employers-core-services" },
      { label: "How It Works (Hiring)", href: "#employers-how-it-works" },
      { label: "Pricing", href: "/pricing", isPage: true },
    ],
  },
  {
    label: "For Job Seekers",
    children: [
      { label: "Talent Pool", href: "#job-seekers-talent-pool" },
      { label: "How It Works (Applying)", href: "#how-to-join" },
      { label: "Job Listings", href: "/jobs", isPage: true },
    ],
  },
  { label: "About", href: "#about" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", isPage: true },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  { label: "Contact", href: "/contact", isPage: true },
];

interface HeaderProps {
  theme?: HeaderTheme;
}

const Header = ({ theme }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backgroundContrast, setBackgroundContrast] =
    useState<BackgroundContrast>("dark");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getRgbValues = (color: string) => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
    };
  };

  const getRelativeLuminance = (r: number, g: number, b: number) => {
    const toLinear = (channel: number) => {
      const value = channel / 255;
      return value <= 0.03928
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };

  const detectBackgroundContrast = () => {
    const sampleX = Math.floor(window.innerWidth / 2);
    const sampleY = 92;
    const sampledElement = document.elementFromPoint(sampleX, sampleY) as
      | HTMLElement
      | null;

    if (!sampledElement) {
      return;
    }

    const contrastHint = sampledElement
      .closest<HTMLElement>("[data-header-contrast]")
      ?.dataset.headerContrast;

    if (contrastHint === "light" || contrastHint === "dark") {
      setBackgroundContrast(contrastHint);
      return;
    }

    let currentElement: HTMLElement | null = sampledElement;
    while (currentElement) {
      const backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
      if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)") {
        const rgb = getRgbValues(backgroundColor);
        if (rgb) {
          const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
          setBackgroundContrast(luminance > 0.5 ? "light" : "dark");
          return;
        }
      }
      currentElement = currentElement.parentElement;
    }

    setBackgroundContrast("light");
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      detectBackgroundContrast();
    };

    detectBackgroundContrast();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", detectBackgroundContrast);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", detectBackgroundContrast);
    };
  }, []);

  const headerTheme =
    theme ?? getHeaderThemeWithContrast(scrolled, resolvedTheme, backgroundContrast);
  const logoVariant = getHeaderLogoVariant(headerTheme);
  const logoFrameClass =
    headerTheme === "transparent"
      ? "bg-primary/20 border-white/30"
      : headerTheme === "dark"
        ? "bg-white/10 border-white/20"
        : "bg-white/95 border-border";

  const handleNavClick = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    
    if (isPage) {
      navigate(href);
      return;
    }
    
    // If we're not on the home page and need to scroll to a section
    if (location.pathname !== "/" && href.startsWith("#")) {
      navigate("/" + href);
      return;
    }
    
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || headerTheme === "light"
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <button
          onClick={() => handleNavClick("#home")}
          className="flex flex-col items-center gap-1"
        >
          <span
            className={`inline-flex items-center justify-center rounded-md border px-2 py-1 transition-colors ${logoFrameClass}`}
          >
            <Logo variant={logoVariant} />
          </span>
          <span
            className={`font-heading text-xs font-bold transition-colors ${
              scrolled ? "text-foreground" : "text-white drop-shadow-sm"
            }`}
          >
            E-Africa Services
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled || headerTheme === "light"
                        ? "text-foreground/70 hover:text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full pt-2 w-56">
                      <div className="rounded-lg border border-border bg-background shadow-lg">
                        <div className="py-2">
                          {link.children.map((child) => (
                            <button
                              key={`${link.label}-${child.label}`}
                              onClick={() => handleNavClick(child.href, child.isPage)}
                              className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={`${link.label}-${link.href}`}
                onClick={() => handleNavClick(link.href, link.isPage)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled || headerTheme === "light"
                    ? "text-foreground/70 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className={
                scrolled || headerTheme === "light"
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-brand-red"
              }
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              scrolled || headerTheme === "light" ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <details key={`mobile-${link.label}`} className="rounded-md border border-border">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-medium text-foreground">
                        <span>{link.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </summary>
                      <div className="border-t border-border px-2 py-2">
                        {link.children.map((child) => (
                          <button
                            key={`mobile-${link.label}-${child.label}`}
                            onClick={() => handleNavClick(child.href, child.isPage)}
                            className="block w-full text-left px-3 py-2 rounded-md text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </details>
                  );
                }

                return (
                  <button
                    key={`mobile-${link.label}-${link.href}`}
                    onClick={() => handleNavClick(link.href, link.isPage)}
                    className="block w-full text-left px-4 py-3 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
