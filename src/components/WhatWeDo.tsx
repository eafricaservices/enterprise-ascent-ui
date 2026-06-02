import { motion } from "framer-motion";
import { Users, Zap, Target, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Users,
    title: "Customer Experience",
    description:
      "Support specialists, success managers, call center agents, technical support - ideal for customer service and outsourcing",
    highlight: "customer service and outsourcing",
  },
  {
    icon: Briefcase,
    title: "Operations & Admin",
    description:
      "Virtual assistants, executive assistants, operations coordinators, project managers - hire remote virtual assistant talent here",
    highlight: "hire remote virtual assistant",
  },
  {
    icon: Target,
    title: "Sales & Revenue",
    description:
      "SDRs, lead gen specialists, account executives, cold calling specialists",
  },
  {
    icon: Zap,
    title: "Technology & Creative",
    description:
      "Software developers, data analysts, digital marketers, video editors",
  },
];

const WhatWeDo = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="employers-core-services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Global Talent Solutions - Built for Remote Teams"
          subtitle="We provide remote-ready professionals across key business functions. Whether you need to outsource customer support, hire remote virtual assistant roles, or scale your sales team, we deliver."
        />

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 font-heading text-2xl font-bold text-foreground"
        >
          Service Categories
        </motion.h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mt-4 font-heading text-lg font-bold text-foreground">
                {service.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-light">
                {service.highlight ? (
                  <>
                    {service.description.split(service.highlight)[0]}
                    <strong className="text-foreground">{service.highlight}</strong>
                    {service.description.split(service.highlight)[1]}
                  </>
                ) : (
                  service.description
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-8 shadow-sm"
        >
          <p className="text-base leading-relaxed text-muted-foreground font-light">
            Multilingual professionals - English (C1), French, Portuguese, Spanish, German, Swahili. Perfect for{" "}
            <strong className="text-foreground">bilingual remote customer service jobs</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Button
            variant="brand"
            size="lg"
            onClick={() => scrollTo("contact")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Talk to Hiring Team
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
