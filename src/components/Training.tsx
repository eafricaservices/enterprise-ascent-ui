import { motion } from "framer-motion";
import { GraduationCap, Target, Award, BookOpen } from "lucide-react";
import SectionHeading from "./SectionHeading";
import trainingImg from "@/assets/training-session.jpg";

const programs = [
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "Elevate your career with industry-recognized certification programs and professional skills workshops.",
  },
  {
    icon: Target,
    title: "Leadership & Management",
    description:
      "Build exceptional leaders through executive coaching, management training, and organizational development.",
  },
  {
    icon: Award,
    title: "Corporate Training",
    description:
      "Customized training solutions designed to address your organization's specific needs and strategic objectives.",
  },
  {
    icon: BookOpen,
    title: "Technical Skills",
    description:
      "Stay ahead with cutting-edge technical training in IT, digital marketing, data analytics, and more.",
  },
];

const Training = () => {
  return (
    <section id="training" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Training Programs"
          subtitle="Invest in your team's growth with our comprehensive training and development programs."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={trainingImg}
                alt="Professional training session"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-24 w-24 rounded-2xl bg-accent/20" />
            <div className="absolute -left-6 -top-6 -z-10 h-24 w-24 rounded-2xl bg-primary/10" />
          </motion.div>

          <div className="space-y-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group flex gap-4 rounded-xl p-5 transition-colors duration-300 hover:bg-muted/60 dark:hover:bg-secondary/60"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <program.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {program.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;
