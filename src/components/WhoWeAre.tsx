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
    <section id="about" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Who We Are"
          subtitle="The first Talent-as-a-Service company built to bridge the global trust gap in remote hiring."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Our Story
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We started E-Africa Services because we saw something frustrating happening 
              every day: talented African professionals struggling to break into the global 
              market, while international companies desperately needed skilled remote workers 
              but didn't know where to find reliable ones.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              The questions were always the same:
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
              So we built something different. Instead of just connecting employers 
              with freelancers and hoping for the best, we take responsibility for 
              the entire journey. We find exceptional talent, put them through 
              rigorous vetting and training, handle all the paperwork and payments, 
              and stay involved to make sure everything runs smoothly.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong className="text-primary">Think of us as your remote workforce partner.</strong>{" "}
              You tell us what you need, and we deliver professionals who are ready 
              to hit the ground running — backed by our commitment to quality and 
              our E-Amplify training framework.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>
                <strong className="text-foreground">More than staffing.</strong> We're 
                building Africa's remote work infrastructure — one great hire at a time.
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
