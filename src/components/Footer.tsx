import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-card text-primary-foreground dark:text-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex flex-col items-start gap-1">
              <span className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 bg-white/10 px-2 py-1">
                <Logo variant="light" className="h-10" />
              </span>
              <span className="font-heading text-sm font-bold">E-Africa Services</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Helping global companies outsource support, hire virtual assistant talent, and
              find stay-at-home roles across Africa for professionals.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">Quick Links</h4>
            <p className="text-sm opacity-80">
              For Employers | For Job Seekers | About Us | Talent Solutions | FAQ | Contact
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">Contact</h4>
            <p className="text-sm opacity-80">
              Pan-African Operations • +254 700 000 000 • info@eafricaservices.com
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 dark:border-border">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <p className="text-sm opacity-70">
            © 2026 E-Africa Services. All rights reserved. Powered by E-Amplify.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
