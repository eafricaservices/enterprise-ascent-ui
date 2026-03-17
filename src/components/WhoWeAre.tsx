import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import aboutImg from "@/assets/about-team.jpg";

const painPoints = [
  "Will they deliver?",
  "Will they stay?",
  "Can they communicate effectively?",
  "What about payments and legal structure?",
];

const WhoWeAre = () => {
  return (
    <section id="about" className="relative py-24 bg-muted/40 dark:bg-secondary/40 overflow-hidden">
      {/* Logo watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
        <img
          src="/eafrica.png"
          alt=""
          className="w-[220px] sm:w-[320px] lg:w-[400px] h-auto opacity-[0.06] object-contain"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading
          title="Who We Are"
          subtitle="A Talent-as-a-Service company building reliable global workforce infrastructure across Africa."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Our Mission
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              E-Africa Services exists to connect international companies with Africa's
              growing pool of highly skilled professionals through a structured, enterprise-ready
              hiring model.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              We solve the core concerns global employers face in remote hiring:
            </p>

            <div className="mt-4 space-y-3">
              {painPoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-lg bg-card border border-border p-3"
                >
                  <Shield className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground italic">{point}</span>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              Instead of operating like a freelancer marketplace, we provide end-to-end
              workforce infrastructure: sourcing, vetting, training, onboarding support,
              and operational continuity for distributed teams.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong className="text-primary">Think of us as your global talent partner.</strong>{" "}
              You define the outcomes, and we deliver remote-ready professionals prepared
              for international teams through our quality standards and E-Amplify training framework.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>
                <strong className="text-foreground">More than staffing.</strong> We are
                building Africa's global talent infrastructure for scalable remote hiring.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={aboutImg}
                alt="E-Africa Services diverse team"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-2xl bg-accent/20" />
            <div className="absolute -top-6 -right-6 -z-10 h-24 w-24 rounded-2xl bg-primary/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
