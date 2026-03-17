import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Remote Professionals Placed" },
  { value: "100+", label: "Global Companies Supported" },
  { value: "25+", label: "African Talent Markets" },
  { value: "6", label: "Business Languages Covered" },
];

const flags = ["🇳🇬", "🇰🇪", "🇬🇭", "🇿🇦", "🇪🇬", "🇨🇲", "🇸🇱", "🇩🇿"];

const StatsBar = () => {
  return (
    <section className="py-16 bg-muted/50 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-16"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 text-2xl sm:text-3xl"
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
          E-Africa Services enables reliable remote hiring through vetted talent,
          multilingual workforce readiness, and structured delivery support for
          startups, SMEs, and enterprise teams.
        </motion.p>
      </div>
    </section>
  );
};

export default StatsBar;
