import { motion } from "framer-motion";
import {
  Headset,
  UserCheck,
  PhoneCall,
  LifeBuoy,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  FolderKanban,
  BadgeDollarSign,
  Target,
  HandCoins,
  Phone,
  Code2,
  BarChart3,
  Bot,
  ShieldCheck,
  Megaphone,
  Share2,
  Palette,
  Video,
  PenSquare,
  BookOpen,
  Landmark,
  Scale,
  FileCheck,
  Building2,
  ShoppingCart,
  Wallet,
  Stethoscope,
  GraduationCap,
  Languages,
  CheckCircle2,
  Power,
  Wifi,
  Router,
  Monitor,
  Globe,
  ArrowRight,
  Users,
  MapPinned,
  Milestone,
  Search,
  CalendarClock,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const talentCategories = [
  {
    title: "Customer Experience",
    icon: Headset,
    roles: [
      "Customer Support Specialists",
      "Customer Success Managers",
      "Call Center Agents",
      "Technical Support",
    ],
  },
  {
    title: "Operations & Administration",
    icon: Briefcase,
    roles: [
      "Virtual Assistants",
      "Executive Assistants",
      "Operations Coordinators",
      "Project Managers",
    ],
  },
  {
    title: "Sales & Revenue",
    icon: BadgeDollarSign,
    roles: [
      "Sales Development Representatives",
      "Lead Generation Specialists",
      "Account Executives",
      "Cold Calling Specialists",
    ],
  },
  {
    title: "Technology & Digital",
    icon: Code2,
    roles: [
      "Software Developers",
      "Data Analysts",
      "AI Automation Specialists",
      "IT Support Engineers",
    ],
  },
  {
    title: "Creative & Marketing",
    icon: Megaphone,
    roles: [
      "Digital Marketing Specialists",
      "Social Media Managers",
      "Graphic Designers",
      "Video Editors",
      "Content Writers",
    ],
  },
  {
    title: "Finance & Legal Support",
    icon: Landmark,
    roles: [
      "Bookkeepers",
      "Financial Analysts",
      "Legal Assistants",
      "Compliance Support",
    ],
  },
];

const roleIcons = [
  UserCheck,
  PhoneCall,
  LifeBuoy,
  CalendarCheck,
  ClipboardList,
  FolderKanban,
  Target,
  HandCoins,
  Phone,
  BarChart3,
  Bot,
  ShieldCheck,
  Share2,
  Palette,
  Video,
  PenSquare,
  BookOpen,
  Scale,
  FileCheck,
];

const industries = [
  { icon: Building2, label: "SaaS & Technology" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Wallet, label: "Fintech" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: Headset, label: "Global Customer Support Teams" },
  { icon: GraduationCap, label: "Education Technology" },
  { icon: Stethoscope, label: "Healthcare Support" },
];

const languages = ["English (C1 professional level)", "French", "Portuguese", "Spanish", "German", "Swahili"];

const trainingPrograms = [
  "Customer Success Training",
  "Sales & Revenue Training",
  "Leadership Development",
  "Remote Work Readiness",
  "Communication & Accent Training",
  "Professional Workplace Skills",
];

const corporateTraining = [
  "Customer Experience Training",
  "Leadership Development Programs",
  "Sales Team Enablement",
  "Remote Team Management Training",
];

const remoteReadiness = [
  { icon: Power, label: "Reliable power supply" },
  { icon: Wifi, label: "High-speed internet connectivity" },
  { icon: Router, label: "Backup internet options" },
  { icon: Monitor, label: "Dedicated remote workspace" },
  { icon: ShieldCheck, label: "Professional work equipment" },
];

const hiringFlow = [
  { icon: ClipboardList, title: "Tell us the roles you need" },
  { icon: Search, title: "We match you with vetted professionals" },
  { icon: CalendarClock, title: "Interview your shortlist" },
  { icon: Rocket, title: "Build your remote team" },
];

const networkStats = [
  { icon: Users, value: "1000+", label: "Professionals in Talent Pool" },
  { icon: MapPinned, value: "25+", label: "African Countries Represented" },
  { icon: Languages, value: "6+", label: "Languages for Global Teams" },
  { icon: CheckCircle2, value: "100%", label: "Remote-Ready Verification" },
];

const WhatWeDo = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Global Talent Solutions"
          subtitle="Africa's global talent infrastructure for remote hiring, multilingual professionals, and enterprise-ready workforce solutions."
        />

        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {talentCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-card-foreground">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-2">
                {category.roles.map((role, roleIndex) => {
                  const RoleIcon = roleIcons[(categoryIndex * 4 + roleIndex) % roleIcons.length];
                  return (
                    <li key={role} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <RoleIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{role}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mb-16 rounded-2xl border border-border bg-muted/40 p-8">
          <h3 className="font-heading text-2xl font-bold text-foreground">Industries We Support</h3>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            Trusted remote talent from Africa for high-growth teams across SaaS, e-commerce, fintech, and global support operations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <industry.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-card-foreground">{industry.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Languages className="h-6 w-6 text-accent" />
              <h3 className="font-heading text-xl font-bold text-card-foreground">
                Multilingual Professionals Across Africa
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Many companies hesitate to hire internationally due to communication concerns. E-Africa ensures multilingual professionals are trained to communicate clearly with global clients through professional communication and accent training.
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
            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-foreground">
              <span className="font-semibold">Communication Promise:</span> Global-ready communication standards for international teams and customers.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-6 w-6 text-accent" />
              <h3 className="font-heading text-xl font-bold text-card-foreground">
                Training & Talent Development
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              We don't only source remote talent from Africa — we prepare professionals for the global workplace and support corporate team development.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Talent Development</h4>
                <ul className="space-y-2">
                  {trainingPrograms.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Corporate Training Services</h4>
                <ul className="space-y-2">
                  {corporateTraining.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              variant="brand"
              className="mt-6 group"
              onClick={() => scrollTo("contact")}
            >
              Book Corporate Training
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        <div className="mb-16 rounded-2xl border border-border bg-card p-8">
          <div className="mb-5 flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <h3 className="font-heading text-2xl font-bold text-foreground">Remote-Ready Workforce</h3>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            Every professional in our African workforce network is verified for reliability, infrastructure, and global team readiness before matching.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {remoteReadiness.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16 rounded-2xl border border-border bg-muted/40 p-8">
          <h3 className="font-heading text-2xl font-bold text-foreground">How Companies Hire With E-Africa</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hiringFlow.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-card-foreground">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h3 className="font-heading text-2xl font-bold text-foreground">Africa's Global Talent Network</h3>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            E-Africa powers global talent acquisition with a multilingual, remote-ready African workforce designed for startups, SMEs, and enterprise teams.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {networkStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-xl border border-border bg-muted/40 p-4"
              >
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <stat.icon className="h-5 w-5" />
                  <span className="text-lg font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
