import { motion } from "framer-motion";
import {
  Headphones, Bot, Settings, Users, BarChart3, Phone,
  BookOpen, Scale, PenTool, Palette, GraduationCap, Briefcase,
  Globe, Award
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const talentRoles = [
  { icon: Headphones, label: "Customer Service" },
  { icon: Users, label: "Virtual Assistance" },
  { icon: Bot, label: "Data & Coding" },
  { icon: Settings, label: "IT & AI Automation" },
  { icon: BarChart3, label: "Operations & Management" },
  { icon: Briefcase, label: "Sales & Customer Success" },
  { icon: Phone, label: "Call Center & Voice" },
  { icon: BookOpen, label: "Bookkeeping" },
  { icon: Scale, label: "Legal Support" },
  { icon: PenTool, label: "Writing & Academia" },
  { icon: Palette, label: "Design & Animation" },
  { icon: GraduationCap, label: "Learning & Development" },
];

const languages = [
  "English (C1-level)",
  "French",
  "Portuguese",
  "German",
  "Swahili",
  "Multilingual combos",
];

const consultingServices = [
  "Executive Coaching",
  "Leadership Development",
  "Organizational Performance Consulting",
  "Digital Learning Strategy",
  "Learning Technology Implementation",
];

const WhatWeDo = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="What We Do"
          subtitle="Talent-as-a-Service — fully vetted remote teams across every function."
        />

        {/* Talent roles grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {talentRoles.map((role, i) => (
            <motion.div
              key={role.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <role.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-card-foreground">
                {role.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Languages & Consulting */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-accent" />
              <h3 className="font-heading text-xl font-bold text-card-foreground">
                Multilingual Talent
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              We source top-tier professionals across 25+ African countries including
              South Africa, Nigeria, Ghana, Cameroon, Algeria, Sierra Leone, and more.
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Consulting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-accent" />
              <h3 className="font-heading text-xl font-bold text-card-foreground">
                Training & Consultancy
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Ensuring our talent is not only skilled but leadership-ready.
            </p>
            <ul className="space-y-3">
              {consultingServices.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
