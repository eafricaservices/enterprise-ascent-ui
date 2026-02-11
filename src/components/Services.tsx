import { motion } from "framer-motion";
import {
  Briefcase,
  Monitor,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    description:
      "Strategic guidance to optimize operations, reduce costs, and drive business transformation across African markets.",
  },
  {
    icon: Monitor,
    title: "IT & Digital Solutions",
    description:
      "Cutting-edge technology solutions including digital transformation, software development, and IT infrastructure.",
  },
  {
    icon: Users,
    title: "Human Capital",
    description:
      "Comprehensive HR solutions from recruitment and onboarding to performance management and employee development.",
  },
  {
    icon: TrendingUp,
    title: "Strategic Advisory",
    description:
      "Expert advisory services for market entry, expansion strategies, and organizational restructuring.",
  },
  {
    icon: Shield,
    title: "Risk & Compliance",
    description:
      "Navigate regulatory landscapes with our risk assessment, compliance management, and governance frameworks.",
  },
  {
    icon: BarChart3,
    title: "Market Research",
    description:
      "Data-driven insights and comprehensive market analysis to inform strategic decision-making.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted/40 dark:bg-secondary/60">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive solutions tailored to drive growth and innovation across diverse industries."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg dark:shadow-md dark:shadow-black/20"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
