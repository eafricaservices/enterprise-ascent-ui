import { motion } from "framer-motion";
import { Search, UserCheck, Globe, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: Search,
    title: "Executive Search",
    description:
      "Identify and recruit top-tier executive talent with our rigorous search methodology.",
  },
  {
    icon: UserCheck,
    title: "Talent Acquisition",
    description:
      "End-to-end recruitment solutions connecting you with the right candidates across Africa.",
  },
  {
    icon: Globe,
    title: "Cross-Border Placement",
    description:
      "Navigate international hiring complexities with our pan-African talent network.",
  },
  {
    icon: Zap,
    title: "Rapid Staffing",
    description:
      "Flexible staffing solutions for temporary, contract, and permanent positions.",
  },
];

const TalentPool = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="talent-pool"
      className="relative overflow-hidden bg-primary py-24 text-primary-foreground"
    >
      {/* Decorative bg blurs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Talent Pool"
          subtitle="Access Africa's finest professionals through our extensive talent network spanning 30+ countries."
          light
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={() => scrollTo("contact")}
            className="group"
          >
            Explore Talent Solutions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TalentPool;
