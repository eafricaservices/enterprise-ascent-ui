import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  highlighted?: boolean;
}

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  light = false,
  highlighted = false,
}: SectionHeadingProps) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={`mb-12 sm:mb-16 ${centered ? "text-center" : ""}`}
    >
      <motion.div variants={titleVariants} className="relative inline-block w-full">
        <h2
          className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl ${
            light ? "text-white" : "text-foreground"
          } transition-colors duration-300`}
        >
          {highlighted ? (
            <>
              {title.split(" ").map((word, i) => (
                <span key={i}>
                  {i === title.split(" ").length - 1 ? (
                    <span className="relative inline-block ml-2">
                      <span className="absolute inset-0 bg-gradient-to-r from-accent/30 to-accent/10 blur-lg" />
                      <span className="relative bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                        {word}
                      </span>
                    </span>
                  ) : (
                    <>{word} </>
                  )}
                </span>
              ))}
            </>
          ) : (
            title
          )}
        </h2>
      </motion.div>

      <motion.div
        variants={underlineVariants}
        className={`mt-4 h-1.5 rounded-full bg-gradient-to-r from-accent via-primary to-accent ${
          centered ? "mx-auto" : "ml-0"
        }`}
        style={{ maxWidth: "80px" }}
      />

      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          className={`mt-6 max-w-3xl text-base leading-relaxed sm:text-lg font-light ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/75" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
