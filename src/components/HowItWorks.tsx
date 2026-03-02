import { motion } from "framer-motion";
import {
  ClipboardList, Search, UserCheck, Handshake, ArrowRight,
  FileText, Calendar, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const talentSteps = [
  {
    icon: ClipboardList,
    number: "1",
    title: "Apply",
    description: "Fill progressive form, upload CV, and record a Loom video introduction.",
  },
  {
    icon: Search,
    number: "2",
    title: "Internal Review",
    description: "We evaluate GPA, creativity, communication, and emotional intelligence.",
  },
  {
    icon: UserCheck,
    number: "3",
    title: "Interviews",
    description: "Two rounds: culture fit assessment, then technical role-specific evaluation.",
  },
  {
    icon: Handshake,
    number: "4",
    title: "Get Matched",
    description: "Placed with a client or held in our Talent Pool until matched.",
  },
];

const companySteps = [
  {
    icon: FileText,
    number: "1",
    title: "Submit Hiring Request",
    description: "Fill form, select service type, describe role needs, and book a meeting.",
  },
  {
    icon: Calendar,
    number: "2",
    title: "We Source & Vet",
    description: "Screening, interviews, assessments, payroll setup, and contracts — handled.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "You Scale",
    description: "You manage outcomes. We manage structure, payroll, and compliance.",
  },
];

const HowItWorks = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-it-works" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="How It Works"
          subtitle="Simple processes for talent and companies alike."
        />

        {/* For Companies */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-heading text-2xl font-bold text-foreground mb-10"
          >
            For Companies
          </motion.h3>
          <div className="grid gap-8 md:grid-cols-3">
            {companySteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {i < companySteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-border shadow-sm">
                  <step.icon className="h-10 w-10 text-primary" />
                  <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-heading text-sm font-bold">
                    {step.number}
                  </span>
                </div>
                <h4 className="mt-6 font-heading text-lg font-bold text-foreground">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo("contact")}
              className="group"
            >
              Start Hiring
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* For Talent */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-heading text-2xl font-bold text-foreground mb-10"
          >
            For Talent
          </motion.h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {talentSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                {i < talentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-border shadow-sm">
                  <step.icon className="h-10 w-10 text-accent" />
                  <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold">
                    {step.number}
                  </span>
                </div>
                <h4 className="mt-6 font-heading text-lg font-bold text-foreground">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo("talent-pool")}
              className="group"
            >
              Join Talent Pool
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
