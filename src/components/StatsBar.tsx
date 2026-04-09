import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const StatsBar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-muted/50 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Hire Top African Talent - Risk-Free
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                - Pre-vetted professionals ready for global teams -{" "}
                <strong className="font-semibold text-foreground">
                  outsource customer support
                </strong>{" "}
                and more
              </p>
              <p>
                -{" "}
                <strong className="font-semibold text-foreground">
                  hire a remote assistant
                </strong>{" "}
                or full teams with multilingual, accent-neutral communication
              </p>
              <p>- Payroll, compliance, and onboarding handled by us</p>
            </div>
            <Button
              variant="brand"
              size="lg"
              className="mt-6"
              onClick={() => scrollTo("employers-core-services")}
            >
              View Hiring Plans
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Find Global Remote Jobs That Pay in USD - Including{" "}
              <strong className="font-semibold text-foreground">
                stay at home jobs in africa
              </strong>
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                -{" "}
                <strong className="font-semibold text-foreground">
                  work from home english speaking jobs
                </strong>{" "}
                - entry-level to expert roles
              </p>
              <p>- Customer support, VA, sales, tech, creative, finance</p>
              <p>- No upfront fees - get matched with vetted international companies</p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="mt-6"
              onClick={() => scrollTo("job-seekers-talent-pool")}
            >
              Join Talent Pool
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
