import { motion } from "framer-motion";
import { BookOpen, TrendingUp, UserCircle, MessageSquare, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SectionHeading from "./SectionHeading";

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Our Expertise"
          subtitle="Bridging the gap between talent and opportunity."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Expert Training */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 dark:shadow-black/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-card-foreground">
              Expert Training
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              World-class programs designed by industry experts for real-world impact.
              Customer Success, AI Automation, CRM, and more.
            </p>

            {/* Inner status area */}
            <div className="mt-6 space-y-4 rounded-xl bg-muted/60 dark:bg-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">AI Automation Mastery</span>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  In Progress
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Module 3: Prompt Engineering</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                <ArrowUpRight className="h-4 w-4" />
                +120 enrolled this week
              </div>
            </div>
          </motion.div>

          {/* Card 2: Strategic Consulting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 dark:shadow-black/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-card-foreground">
              Strategic Consulting
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Optimizing team performance & growth.
            </p>

            {/* Big metric */}
            <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-muted/60 dark:bg-secondary/60 p-8">
              <span className="font-heading text-5xl font-bold text-primary">+45%</span>
              <span className="mt-2 text-sm font-medium text-muted-foreground">
                Efficiency Improvement
              </span>
            </div>
          </motion.div>

          {/* Card 3: Career Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 dark:shadow-black/10 md:col-span-2 lg:col-span-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
              <UserCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-card-foreground">
              Career Development
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Personalized mentorship, CV optimization, and branding to accelerate
              your professional journey. We help you stand out in the global market.
            </p>

            {/* Interactive tags */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Mentorship
                </span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  LinkedIn Opt.
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-muted/60 dark:bg-secondary/60 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-card-foreground">Career Coach</span>
                  <p className="text-xs text-muted-foreground">Ready to help</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Message
                </Button>
              </div>

              <Button variant="brand" size="sm" className="w-full">
                Connect
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
