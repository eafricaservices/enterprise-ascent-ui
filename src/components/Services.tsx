import { motion } from "framer-motion";
import { CheckCircle2, Building2, User } from "lucide-react";
import SectionHeading from "./SectionHeading";

const companyServices = [
  "Customer Success Training",
  "AI Automation Implementation",
  "CRM Integration & Optimization",
  "Talent Acquisition Services",
  "Workforce Development Programs",
];

const individualServices = [
  "LinkedIn Optimization Training",
  "CV Optimization & Branding",
  "AI Automation Training",
  "Personal Goal Setting & Mentorship",
  "Job Opportunities & Talent Staffing",
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Tailored solutions for organizations and individuals across Africa."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* For Companies */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm dark:shadow-black/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-card-foreground">
                For Companies
              </h3>
            </div>
            <ul className="space-y-4">
              {companyServices.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Individuals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm dark:shadow-black/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-card-foreground">
                For Individuals
              </h3>
            </div>
            <ul className="space-y-4">
              {individualServices.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
