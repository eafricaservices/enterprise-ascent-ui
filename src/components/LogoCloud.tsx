import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const logos = [
  "TechCorp Africa",
  "Global Solutions",
  "Innovation Hub",
  "Digital Ventures",
  "Enterprise Systems",
  "Future Tech",
  "Excellence Group",
];

const LogoCloud = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="Trusted by Leading Companies" />

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-marquee gap-12 py-4">
            {[...logos, ...logos].map((name, i) => (
              <motion.div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center justify-center rounded-lg border border-border bg-card px-8 py-4 shadow-sm transition-shadow hover:shadow-md dark:shadow-black/10"
              >
                <span className="whitespace-nowrap font-heading text-sm font-semibold text-muted-foreground">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
