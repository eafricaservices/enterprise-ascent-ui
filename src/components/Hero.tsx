import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section
      id="home"
      data-header-contrast="dark"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Enhanced gradient background with brand colors. Deepen in light mode for readability; keep dark mode as-is. */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-primary/30 to-accent/20 dark:from-slate-900/80 dark:via-primary/20 dark:to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/12 rounded-full filter blur-3xl opacity-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/12 rounded-full filter blur-3xl opacity-48" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/6 rounded-full filter blur-3xl opacity-36 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-black dark:text-white">
                Africa's Fastest-Growing Talent Platform
              </span>
            </div>
          </motion.div>

          {/* Main Heading with gradient text */}
          <motion.h1 variants={itemVariants} className="font-heading text-4xl font-bold leading-[1.15] text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Africa's Global Talent Infrastructure for{" "}
            <span className="text-black dark:text-white">
              Customer Service and Outsourcing
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-10 max-w-5xl mx-auto text-xl md:text-2xl lg:text-3xl leading-snug text-black dark:text-white font-normal"
          >
            We connect global companies with vetted, multilingual African professionals for{' '}
            <span className="font-semibold text-accent dark:text-accent"></span>{' '}
            and{' '}
            <span className="font-semibold text-primary dark:text-primary">work from home English speaking jobs</span>{' '}
            <span className="text-black/90 dark:text-white/90">— while helping Africans build international careers.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          >
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo("employers-core-services")}
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Hire Talent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo("job-seekers-talent-pool")}
              className="group bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent shadow-lg hover:shadow-xl transition-all duration-300 text-white"
            >
              Find a Job
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              onClick={() => scrollTo("pricing")}
              className="group"
            >
              Get the Starter Pack
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust bar */}
          <motion.p
            variants={itemVariants}
            className="mt-12 pt-12 border-t border-white/10 text-center text-sm text-white/70 font-light"
          >
            Trusted by 100+ companies • 500+ professionals placed • 25+ African countries • <strong className="text-white">A trusted staffing agency for startups</strong>
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/50 uppercase tracking-widest">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
