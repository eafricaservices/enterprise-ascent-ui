import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Talent Pool", href: "#talent-pool" },
  { label: "Contact", href: "#contact" },
];

const servicesList = [
  "Customer Service Teams",
  "Virtual Assistants",
  "IT & AI Automation",
  "Sales & Customer Success",
  "Bookkeeping & Legal",
  "Design & Animation",
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
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <span className="font-heading text-lg font-bold text-accent-foreground">
                  EA
                </span>
              </div>
              <span className="font-heading text-lg font-bold">
                E-Africa Services
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              The first Talent-as-a-Service company built to bridge the global trust
              gap in remote hiring. Remote Work Infrastructure for Africa.
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
          <div className="flex gap-6 text-sm opacity-60">
            <button className="transition-opacity hover:opacity-100">
              Privacy Policy
            </button>
            <button className="transition-opacity hover:opacity-100">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
