import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import aboutImg from "@/assets/about-team.jpg";

const values = [
  "Excellence in service delivery",
  "Integrity and transparency",
  "Innovation-driven solutions",
  "Client-centric approach",
  "Pan-African perspective",
  "Sustainable impact",
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/40 dark:bg-secondary/60">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="About E-Africa Services"
          subtitle="A trusted partner in Africa's business ecosystem, delivering excellence since our inception."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
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
              E-Africa Services is dedicated to empowering organizations across
              the African continent with world-class consulting, training, and
              talent solutions. We bridge the gap between ambition and
              achievement, helping businesses navigate complex challenges and
              seize emerging opportunities in Africa's dynamic markets.
            </p>

            <h3 className="mt-8 font-heading text-2xl font-bold text-foreground">
              Our Vision
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              To be the leading catalyst for business excellence across Africa,
              recognized for our innovative approach, deep market expertise, and
              unwavering commitment to delivering measurable impact for our
              clients.
            </p>

            <div className="mt-8">
              <h4 className="mb-4 font-heading text-lg font-semibold text-foreground">
                Core Values
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {values.map((value, i) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image column */}
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
                alt="E-Africa Services team in discussion"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-2xl bg-accent/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
