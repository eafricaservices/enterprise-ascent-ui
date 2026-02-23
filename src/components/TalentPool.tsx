import { motion } from "framer-motion";
import { UserPlus, Cpu, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: UserPlus,
    number: "1",
    title: "Create Profile",
    description: "Simple 2-minute setup",
  },
  {
    icon: Cpu,
    number: "2",
    title: "Get Matched",
    description: "AI-driven role recommendations",
  },
  {
    icon: Briefcase,
    number: "3",
    title: "Get Hired",
    description: "Connect directly with top companies",
  },
];

const TalentPool = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="talent-pool"
      className="relative overflow-hidden bg-primary dark:bg-muted py-24 text-primary-foreground dark:text-foreground"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Join Our Talent Pool"
          subtitle="Showcase your skills and connect with top-tier opportunities across Africa. Our streamlined process gets you in front of employers faster."
          light
        />

        <div className="grid gap-8 md:grid-cols-3 mt-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-primary-foreground/20 dark:border-border" />
              )}

              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-foreground/10 dark:bg-card backdrop-blur-sm border border-primary-foreground/10 dark:border-border">
                <step.icon className="h-10 w-10 text-accent" />
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-heading text-sm font-bold">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm opacity-70">{step.description}</p>
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
            variant="brand"
            size="lg"
            onClick={() => scrollTo("contact")}
            className="group bg-accent hover:bg-accent/90"
          >
            Next Step
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TalentPool;
