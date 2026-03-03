import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Video, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import TalentApplicationDialog from "./TalentApplicationDialog";

const steps = [
  {
    icon: UserPlus,
    number: "1",
    title: "Apply Online",
    description: "Fill out our progressive form, upload CV, and accept T&Cs.",
  },
  {
    icon: Video,
    number: "2",
    title: "Record Loom Video",
    description: "Short face-only video introduction for our team to review.",
  },
  {
    icon: ClipboardCheck,
    number: "3",
    title: "Interview & Pool",
    description: "Complete interviews and join our active talent pool.",
  },
];

const TalentPool = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
    <TalentApplicationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    <section
      id="talent-pool"
      className="py-24 bg-muted/40 dark:bg-secondary/40"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Join Our Talent Pool"
          subtitle="Fill out the application to be considered for remote work opportunities. Even if not placed immediately, you remain in our pool until matched."
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
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
              )}

              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-border shadow-sm">
                <step.icon className="h-10 w-10 text-primary" />
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-heading text-sm font-bold">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
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
            onClick={() => setDialogOpen(true)}
            className="group"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default TalentPool;
