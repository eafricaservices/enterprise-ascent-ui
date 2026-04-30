import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import aboutImg from "@/assets/about-team.jpg";

const painPoints = [
  "Will they deliver?",
  "Will they stay?",
  "Can they communicate effectively?",
  "What about payments and legal structure?",
];

const WhoWeAre = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background pointer-events-none" />
      
      {/* Logo watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
        <img
          src="/eafrica.png"
          alt=""
          className="w-[220px] sm:w-[320px] lg:w-[400px] h-auto opacity-[0.04] object-contain"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading
          title="Who We Are"
          subtitle="A Talent-as-a-Service company building reliable global workforce infrastructure across Africa."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-heading text-3xl font-bold text-foreground leading-tight">
              Our Mission
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground font-light">
              E-Africa Services exists to connect international companies with Africa's
              growing pool of highly skilled professionals through a structured, enterprise-ready
              hiring model.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground font-light">
              We solve the core concerns global employers face in remote hiring:
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {painPoints.map((point, i) => (
                <motion.div
                  key={point}
                  variants={itemVariants}
                  className="flex items-start gap-3 rounded-xl bg-card border border-border/50 p-4 hover:border-primary/30 transition-all duration-300"
                >
                  <Shield className="h-5 w-5 shrink-0 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-base text-foreground">{point}</span>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-lg leading-relaxed text-muted-foreground font-light pt-4">
              Instead of operating like a freelancer marketplace, we provide end-to-end
              workforce infrastructure: sourcing, vetting, training, onboarding support,
              and operational continuity for distributed teams.
            </p>

            <p className="text-lg leading-relaxed pt-4">
              <strong className="text-primary font-semibold">Think of us as your global talent partner.</strong>{" "}
              <span className="text-muted-foreground font-light">
                You define the outcomes, and we deliver remote-ready professionals prepared
                for international teams through our quality standards and E-Amplify training framework.
              </span>
            </p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-2"
            >
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-base text-muted-foreground">
                <strong className="text-foreground">More than staffing.</strong> We are
                infrastructure.
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-80 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={aboutImg}
              alt="About team"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 bg-white dark:bg-card rounded-xl shadow-xl p-6 max-w-xs border border-border"
            >
              <p className="text-sm font-semibold text-foreground mb-2">Impact Achieved</p>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                500+
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Professionals successfully placed
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
