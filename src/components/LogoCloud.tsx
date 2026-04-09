type Sponsor = {
  name: string;
  website?: string;
  logoPath: string;
};

const sponsors: Sponsor[] = [
  {
    name: "BYU-Pathway",
    website: "https://www.byupathway.edu/",
    logoPath: "/sponsors/byu-pathway.png",
  },
  {
    name: "E-Amplify",
    logoPath: "/sponsors/e-amplify.svg",
  },
  {
    name: "AWS",
    website: "https://aws.amazon.com/",
    logoPath: "/sponsors/aws.png",
  },
  {
    name: "Balance of Nature",
    website: "https://balanceofnature.com/",
    logoPath: "/sponsors/balance-of-nature.png",
  },
  {
    name: "Cadana",
    website: "https://cadanapay.com/",
    logoPath: "/sponsors/cadana-pay.png",
  },
  {
    name: "HireBloom",
    website: "https://www.hirebloom.com/",
    logoPath: "/sponsors/hirebloom.png",
  },
  {
    name: "GT Bank",
    website: "https://www.gtbank.com/",
    logoPath: "/sponsors/gtbank.png",
  },
  {
    name: "eAssist Dental",
    website: "https://dentalbilling.com/",
    logoPath: "/sponsors/eassist-dental.png",
  },
  {
    name: "Moniepoint",
    website: "https://moniepoint.com/",
    logoPath: "/sponsors/moniepoint.png",
  },
  {
    name: "Kuda Bank",
    website: "https://kuda.com/",
    logoPath: "/sponsors/kuda-bank.png",
  },
  {
    name: "MaxMigold",
    website: "https://maxmigold.com/",
    logoPath: "/sponsors/maxmigold.png",
  },
  {
    name: "Baobab Bank",
    website: "https://baobab.com/ng/",
    logoPath: "/sponsors/baobab-bank.png",
  },
  {
    name: "Deel",
    website: "https://www.deel.com/",
    logoPath: "/sponsors/deel.png",
  },
  {
    name: "Zendesk",
    website: "https://www.zendesk.com/",
    logoPath: "/sponsors/zendesk.png",
  },
  {
    name: "Hubspot",
    website: "https://www.hubspot.com/",
    logoPath: "/sponsors/hubspot.png",
  },
];

const LogoCloud = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h4 className="text-center font-heading text-lg font-semibold text-muted-foreground">
          Trusted by Global Partners
        </h4>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {sponsors.map((sponsor) => {
            const logo = (
              <img
                src={sponsor.logoPath}
                alt={`${sponsor.name} logo`}
                className="h-8 w-auto max-w-[140px] object-contain opacity-70 transition-opacity hover:opacity-100"
                loading="lazy"
              />
            );

            return sponsor.website ? (
              <a
                key={sponsor.name}
                href={sponsor.website}
                target="_blank"
                rel="noreferrer"
                aria-label={`${sponsor.name} website`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {logo}
              </a>
            ) : (
              <div key={sponsor.name}>{logo}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
