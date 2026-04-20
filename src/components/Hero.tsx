import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-header-contrast="dark"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Africa's Global Talent Infrastructure for{" "}
            <strong className="font-semibold">Customer Service and Outsourcing</strong>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            We connect global companies with vetted, multilingual African professionals for{" "}
            <strong className="font-semibold text-white">
              stay at home jobs in africa
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-white">
              work from home english speaking jobs
            </strong>{" "}
            - while helping Africans build international careers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo("employers-core-services")}
              className="group"
            >
              Hire Talent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              onClick={() => scrollTo("job-seekers-talent-pool")}
            >
              Find a Job
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-sm uppercase tracking-wide text-white/70"
          >
            Trusted by 100+ companies · 500+ professionals placed · 25+ African countries · A
            trusted{" "}
            <strong className="font-semibold text-white">
              staffing agency for startups
            </strong>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
