import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
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
      {/* Enhanced gradient background with brand colors */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/20 to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
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
              <span className="text-sm font-medium text-white">
                Africa's Fastest-Growing Talent Platform
              </span>
            </div>
          </motion.div>

          {/* Main Heading with gradient text */}
          <motion.h1 variants={itemVariants} className="font-heading text-4xl font-bold leading-[1.15] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Africa's Global Talent Infrastructure for{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-red-400 to-accent blur-lg opacity-75" />
              <span className="relative bg-gradient-to-r from-accent via-red-400 to-accent bg-clip-text text-transparent">
                Customer Service and Outsourcing
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-white/80 sm:text-xl font-light"
          >
            We connect global companies with vetted, multilingual African professionals for{" "}
            <span className="font-semibold text-white bg-gradient-to-r from-accent/20 to-primary/20 px-2 py-1 rounded">
              stay at home jobs in africa
            </span>{" "}
            and{" "}
            <span className="font-semibold text-white bg-gradient-to-r from-primary/20 to-accent/20 px-2 py-1 rounded">
              work from home english speaking jobs
            </span>{" "}
            - while helping Africans build international careers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo("employers-core-services")}
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Hire Talent Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              onClick={() => scrollTo("job-seekers-talent-pool")}
              className="group border-2 border-accent/50 hover:border-accent hover:bg-accent/10 text-white font-semibold transition-all duration-300"
            >
              Find a Remote Job
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-12 border-t border-white/10"
          >
            <p className="text-sm uppercase tracking-widest text-white/60 mb-6">
              Trusted by industry leaders
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
              {[
                { number: "500+", label: "Professionals Placed" },
                { number: "100+", label: "Companies Partnered" },
                { number: "25+", label: "African Countries" },
                { number: "6", label: "Languages Supported" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="transition-transform"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-accent to-accent/70 bg-clip-text">
                    {stat.number}
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
};

export default Hero;
