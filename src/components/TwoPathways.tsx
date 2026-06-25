import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const TwoPathways = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* For Employers Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group rounded-3xl border border-border bg-card p-8 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground leading-tight">
              Hire Top African Talent — Risk‑Free
            </h2>
            <div className="mt-6 space-y-3">
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                • Pre‑vetted professionals ready for global teams — outsource customer support and more
              </p>
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                • Hire a remote assistant or full teams with multilingual, accent‑neutral communication
              </p>
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                • Payroll, compliance, and onboarding handled by us
              </p>
            </div>
            <div className="mt-8">
              <Button
                variant="brand"
                size="lg"
                onClick={() => scrollTo("employers-core-services")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                View Hiring Plans
              </Button>
            </div>
          </motion.div>

          {/* For Job Seekers Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-8 shadow-lg hover:shadow-2xl hover:border-accent/50 transition-all duration-300"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground leading-tight">
              Find Global Remote Jobs That Pay in USD — Including{" "}
              <strong>stay at home jobs in africa</strong>
            </h2>
            <div className="mt-6 space-y-3">
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                • <strong className="text-foreground">Work from home english speaking jobs</strong> — entry‑level to expert roles
              </p>
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                • Customer support, VA, sales, tech, creative, finance
              </p>
              <p className="text-base leading-relaxed text-muted-foreground font-light">
                • No upfront fees — get matched with vetted international companies
              </p>
            </div>
            <div className="mt-8">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollTo("job-seekers-how-it-works")}
              >
                Join Talent Pool
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoPathways;
