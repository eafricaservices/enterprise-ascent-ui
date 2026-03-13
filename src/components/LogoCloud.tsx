import SectionHeading from "./SectionHeading";

type Sponsor = {
  name: string;
  website?: string;
  logoPath?: string;
};

const sponsors: Sponsor[] = [
  {
    name: "BYU-Pathway Worldwide",
    website: "https://www.byupathway.edu/",
    logoPath: "/sponsors/byu-pathway.png",
  },
  {
    name: "E-Amplify",
  },
  {
    name: "AWS",
    website: "https://aws.amazon.com/",
    logoPath: "/sponsors/aws.png",
  },
  {
    name: "Balance of Nature",
    website:
      "https://balanceofnature.com/?srsltid=AfmBOop36LNlHtT9pG5zZ2V_SaDL4SCCNwwoVgyAnaSjATqDTVLjCejr",
    logoPath: "/sponsors/balance-of-nature.png",
  },
  {
    name: "Cadana pay",
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
    website: "https://moniepoint.com/ng/business",
    logoPath: "/sponsors/moniepoint.png",
  },
  {
    name: "Kuda Bank",
    website: "https://kuda.com/",
    logoPath: "/sponsors/kuda-bank.png",
  },
  {
    name: "MaxMigold Limited",
    website: "https://maxmigold.com/",
    logoPath: "/sponsors/maxmigold.png",
  },
  {
    name: "BaoBab Bank",
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
    website:
      "https://www.zoho.com/desk/lp/zendesk-alternative.html?network=g&device=c&keyword=zendesk&campaignid=15070956197&adgroup=146429310691&matchtype=e&placement=&adid=688529073765&gad_source=1&gad_campaignid=15070956197&gbraid=0AAAAACgMnEsJn_gRoxYv25Xfz1DGGqvOo&gclid=CjwKCAjwyMnNBhBNEiwA-Kcgu9zj2gUptHkML2b0tt0z_CKaV_3g-qPISY9M-PB7JF7WGEkj3ElxMBoCPkQQAvD_BwE",
    logoPath: "/sponsors/zendesk.png",
  },
  {
    name: "Hubspot",
    website: "https://www.hubspot.com/",
    logoPath: "/sponsors/hubspot.png",
  },
];

const LogoCloud = () => {
  const marqueeSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="Trusted by Our Sponsors" />

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-marquee gap-12 py-4">
            {marqueeSponsors.map((sponsor, i) => {
              const card = (
                <div className="flex min-w-[200px] shrink-0 flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-4 text-center shadow-sm transition-shadow hover:shadow-md dark:shadow-black/10">
                  {sponsor.logoPath ? (
                    <img
                      src={sponsor.logoPath}
                      alt={`${sponsor.name} logo`}
                      className="mb-2 h-10 w-auto max-w-[140px] object-contain"
                      loading="lazy"
                    />
                  ) : null}
                  <span className="whitespace-nowrap font-heading text-sm font-semibold text-muted-foreground">
                    {sponsor.name}
                  </span>
                </div>
              );

              return sponsor.website ? (
                <a
                  key={`${sponsor.name}-${i}`}
                  href={sponsor.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${sponsor.name} website`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {card}
                </a>
              ) : (
                <div key={`${sponsor.name}-${i}`}>{card}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
