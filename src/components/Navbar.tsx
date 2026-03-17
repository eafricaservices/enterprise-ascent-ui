import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Talent Solutions", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Blog", href: "/blog", isPage: true },
  { label: "Pricing", href: "/pricing", isPage: true },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkTheme = resolvedTheme === "dark";
  const logoFrameClass = !scrolled
    ? "bg-primary/20 border-white/30"
    : isDarkTheme
      ? "bg-white/95 border-white/30"
      : "bg-primary/95 border-primary/80";

  const handleNavClick = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    
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
        scrolled
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
            <img
              src="/eafrica-logo-transparent.png"
              alt="E-Africa Services Logo"
              className="h-9 w-auto object-contain"
            />
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
          {navLinks.map((link) => (
            <button
              key={`${link.label}-${link.href}`}
              onClick={() => handleNavClick(link.href, link.isPage)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
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
                scrolled
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
              scrolled ? "text-foreground" : "text-white"
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
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={`mobile-${link.label}-${link.href}`}
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  className="block w-full text-left px-4 py-3 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
