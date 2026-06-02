import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeDollarSign, Home, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TalentApplicationDialog from "@/components/TalentApplicationDialog";
import SectionHeading from "./SectionHeading";

const benefits = [
  {
    icon: BadgeDollarSign,
    text: (
      <>
        Paid in USD - Earn stable income through{" "}
        <strong className="font-semibold text-foreground">
          remote customer service rep jobs
        </strong>
      </>
    ),
  },
  {
    icon: Home,
    text: "Work from home - Anywhere in Africa with reliable internet",
  },
  {
    icon: Briefcase,
    text: (
      <>
        Variety of roles - Including{" "}
        <strong className="font-semibold text-foreground">
          remote virtual assistant work
        </strong>
        , sales, tech, and more
      </>
    ),
  },
  {
    icon: GraduationCap,
    text: "Free training - Communication, accent softening, remote work skills",
  },
];

const TalentPool = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="job-seekers-talent-pool" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Join Africa's Fastest-Growing Remote Talent Pool - Find remote customer service rep jobs and remote virtual assistant work"
          subtitle="Get matched with global companies that pay in USD - and grow your career from home."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300">
                <benefit.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground font-light">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-sm"
        >
          <h3
            id="job-seekers-how-it-works"
            className="font-heading text-2xl font-bold text-foreground"
          >
            How to join (3 steps)
          </h3>
          <ol className="mt-6 space-y-4">
            {[
              { num: "01", text: "Apply online + upload CV", desc: "Submit your details and upload your resume" },
              { num: "02", text: "Record a short Loom video introduction", desc: "Show us your personality and communication skills" },
              { num: "03", text: "Complete interviews and get matched", desc: "Interview with companies or join our waitlist" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/70">
                    <span className="font-bold text-white text-sm">{step.num}</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.text}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </ol>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-base text-muted-foreground font-light"
        >
          1000+ professionals already in our pool — many have found <strong className="text-foreground">remote customer service rep jobs</strong> through us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <Button
            variant="brand"
            size="lg"
            onClick={() => setDialogOpen(true)}
            className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      <TalentApplicationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};

export default TalentPool;
