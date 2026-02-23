import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Professionals Trained" },
  { value: "100+", label: "Companies Partnered" },
  { value: "15+", label: "Countries Reached" },
];

const flags = ["🇳🇬", "🇰🇪", "🇬🇭", "🇿🇦", "🇪🇬"];

const StatsBar = () => {
  return (
    <section className="py-16 bg-muted/50 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-4xl font-bold text-primary sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}

          {/* Flags */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-2 text-3xl"
          >
            {flags.map((flag, i) => (
              <span key={i} className="hover:scale-125 transition-transform cursor-default">
                {flag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed"
        >
          We are a technology-backed company dedicated to transforming careers
          and empowering organizations across Africa through innovative training,
          strategic consulting, and talent placement solutions.
        </motion.p>
      </div>
    </section>
  );
};

export default StatsBar;
