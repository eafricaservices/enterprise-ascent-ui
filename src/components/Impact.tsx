import { motion } from "framer-motion";
import { Heart, Globe, Briefcase, TrendingUp, Shield, Users } from "lucide-react";
import SectionHeading from "./SectionHeading";

const impacts = [
  {
    icon: Heart,
    title: "Families Empowered",
    description: "Families across Africa better support themselves through stable remote employment.",
  },
  {
    icon: Briefcase,
    title: "Global Careers",
    description: "Young professionals build global careers without leaving their communities.",
  },
  {
    icon: Globe,
    title: "Multilingual Placement",
    description: "Multilingual talent finds rightful placement in international companies.",
  },
  {
    icon: TrendingUp,
    title: "GDP Growth",
    description: "Contributing to GDP growth across multiple African nations.",
  },
  {
    icon: Shield,
    title: "Ethical Employment",
    description: "Structured, ethical remote employment with full compliance.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Creating borderless economic opportunity through trusted remote work.",
  },
];

const Impact = () => {
  return (
    <section id="impact" className="relative overflow-hidden bg-primary dark:bg-muted py-24 text-primary-foreground dark:text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Our Impact"
          subtitle="Making African excellence the global first choice."
          light
        />

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impacts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl bg-primary-foreground/10 dark:bg-card backdrop-blur-sm border border-primary-foreground/10 dark:border-border p-6"
            >
              <item.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-heading text-lg font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm opacity-70">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-heading font-semibold opacity-80">
            Mission: To create borderless economic opportunity through trusted remote work.
          </p>
          <p className="mt-2 text-sm opacity-60">
            Vision: To make African excellence the global first choice.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
