import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    text:
      "Tell us your roles - We blueprint role outcomes, team structure, language needs, and performance expectations. Many clients come to us to ",
  },
  {
    number: "2",
    text:
      "We match & vet - We handle sourcing, assessments, shortlisting, contracts, and payroll setup.",
  },
  {
    number: "3",
    text:
      "Interview & onboard - You interview finalists. We handle onboarding, training, and ongoing support.",
  },
];

const HowItWorks = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="employers-how-it-works" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How It Works for Employers
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent mx-auto" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-heading font-bold">
                {step.number}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {step.text}
                {step.number === "1" && (
                  <>
                    <strong className="font-semibold text-foreground">
                      outsource customer support
                    </strong>{" "}
                    or{" "}
                    <strong className="font-semibold text-foreground">
                      hire a remote assistant
                    </strong>
                    .
                  </>
                )}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="brand" size="lg" onClick={() => scrollTo("contact")}
          >
            Start Hiring
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
