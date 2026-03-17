import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Music2 } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Talent Solutions", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Talent Pool", href: "#talent-pool" },
  { label: "Talk to Hiring Team", href: "#contact" },
];

const servicesList = [
  "Global Talent Solutions",
  "Multilingual Professionals",
  "Remote Team Buildout",
  "Training & Talent Development",
  "Corporate Training Programs",
  "Remote-Ready Workforce Verification",
];

const socialLinks = [
  {
    name: "Facebook",
    username: "E-Africa",
    href: "https://web.facebook.com/profile.php?id=61562074914381",
    icon: Facebook,
  },
  {
    name: "Instagram",
    username: "@e.africa1",
    href: "https://www.instagram.com/e.africa1?igsh=MWhuanR1ODh4NGZmcA%3D%3D&utm_source=qr",
    icon: Instagram,
  },
  {
    name: "X / Twitter",
    username: "@Empower__Africa",
    href: "https://x.com/empower__africa?s=21",
    icon: null,
  },
  {
    name: "TikTok",
    username: "@e_africa01",
    href: "https://www.tiktok.com/@e_africa01?_t=ZS-8zrl8nXXinB&_r=1",
    icon: Music2,
  },
  {
    name: "YouTube",
    username: "e-africaservices",
    href: "https://youtube.com/@e-africaserices?si=CbConmy1ptbJny3Z",
    icon: Youtube,
  },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary dark:bg-card text-primary-foreground dark:text-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex flex-col items-start gap-1">
              <span className="inline-flex items-center justify-center rounded-md bg-white/95 px-2 py-1">
                <img
                  src="/eafrica-logo-transparent.png"
                  alt="E-Africa Services Logo"
                  className="h-10 w-auto object-contain"
                />
              </span>
              <span className="font-heading text-sm font-bold">
                E-Africa Services
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              E-Africa Services helps global companies build remote teams with
              vetted, multilingual professionals across Africa through structured
              talent infrastructure.
            </p>
            <p className="mt-4 text-xs opacity-50">
              Powered by <span className="font-semibold text-accent">E-Amplify</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm opacity-70 transition-all hover:text-accent hover:opacity-100"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">
              Services
            </h4>
            <ul className="space-y-2">
              {servicesList.map((service) => (
                <li key={service} className="text-sm opacity-70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm opacity-70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Pan-African Operations</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@eafricaservices.com</span>
              </div>
            </div>

            <h4 className="mt-6 mb-3 font-heading text-base font-semibold">
              Follow Us
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.name} ${social.username}`}
                    className="inline-flex items-center gap-3 text-sm opacity-70 transition-all hover:text-accent hover:opacity-100"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-foreground/20 dark:border-border">
                      {social.icon ? (
                        <social.icon className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">X</span>
                      )}
                    </span>
                    <span>{social.username}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 dark:border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} E-Africa Services. All rights reserved.
          </p>
          <p className="text-xs opacity-40">
            E-Africa Services is powered by E-Amplify.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm opacity-60">
            {socialLinks.map((social) => (
              <a
                key={`bottom-${social.name}`}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.name} ${social.username}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-foreground/20 transition-opacity hover:opacity-100 dark:border-border"
              >
                {social.icon ? (
                  <social.icon className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">X</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
