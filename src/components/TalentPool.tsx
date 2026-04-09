import { motion } from "framer-motion";
import { BadgeDollarSign, Home, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <section id="job-seekers-talent-pool" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Join Africa's Fastest-Growing Remote Talent Pool - Find{" "}
            <strong className="font-semibold text-foreground">
              remote customer service rep jobs
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-foreground">
              remote virtual assistant work
            </strong>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent mx-auto" />
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-muted-foreground sm:text-lg">
            Get matched with global companies that pay in USD - and grow your career from home.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <benefit.icon className="h-6 w-6 text-accent" />
              <p className="mt-3 text-sm text-muted-foreground">{benefit.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h3
            id="how-to-join"
            className="font-heading text-xl font-bold text-foreground"
          >
            How to join (3 steps)
          </h3>
          <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Apply online + upload CV</li>
            <li>Record a short Loom video introduction</li>
            <li>Complete interviews and get matched (or join our waitlist)</li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          1000+ professionals already in our pool - many have found remote customer service roles
          through us.
        </p>

        <div className="mt-8 text-center">
          <Button
            asChild
            variant="brand"
            size="lg"
            className="group"
          >
            <a href="https://forms.gle/your-application-form" target="_blank" rel="noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TalentPool;
