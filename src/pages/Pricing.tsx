import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Globe,
  ShieldCheck,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const concerns = [
  {
    icon: Users,
    title: "Will I actually get quality talent?",
    body: "Every candidate is rigorously vetted — skills tests, English proficiency, background checks, and remote-readiness assessments before you see them.",
  },
  {
    icon: HeadphonesIcon,
    title: "Will they communicate well?",
    body: "We only place professionals with proven communication skills and experience working with international teams.",
  },
  {
    icon: TrendingUp,
    title: "Will they stick around?",
    body: "Our retention rate outperforms industry averages because we support professionals before, during, and after placement.",
  },
  {
    icon: ShieldCheck,
    title: "How do I handle payroll and compliance?",
    body: "We manage payroll, contracts, and compliance across Africa so you never have to navigate foreign labour law alone.",
  },
  {
    icon: CheckCircle2,
    title: "How do I know candidates are the real deal?",
    body: "Multi-stage screening means you only interview shortlisted candidates who have already demonstrated they can do the job.",
  },
];

const tiers = [
  {
    name: "Talent Placement",
    price: "From $14/hr",
    priceSub: "per professional",
    description:
      "For businesses that need reliable, vetted talent fast — without the headache of sourcing yourself.",
    style: "neutral" as const,
    badge: null,
    emoji: "🥉",
    roles: ["Customer Support", "Virtual Assistants", "Administrative Roles"],
    features: [
      "Talent sourcing across 25+ African countries",
      "Multi-stage vetting & skills assessment",
      "English proficiency screening",
      "Payroll management",
      "Dedicated placement support",
      "30-day replacement guarantee",
    ],
    cta: "Get Started",
    icon: Users,
  },
  {
    name: "Build My Team",
    price: "Custom Pricing",
    priceSub: "based on team size",
    description:
      "For growing companies that need a full department — built, onboarded, and managed for you.",
    style: "featured" as const,
    badge: "Most Popular",
    emoji: "🏆",
    roles: ["Sales Teams", "Marketing", "Operations"],
    features: [
      "Full team design & org planning",
      "End-to-end sourcing and vetting",
      "Structured onboarding programme",
      "Performance management support",
      "Dedicated account manager",
      "Ongoing team health monitoring",
    ],
    cta: "Talk to Us",
    icon: Building2,
  },
  {
    name: "Enterprise Scale",
    price: "Custom Pricing",
    priceSub: "for 50–1000+ team members",
    description:
      "For large-scale operations that need a strategic partner across multiple countries and functions.",
    style: "premium" as const,
    badge: null,
    emoji: "🥇",
    roles: ["50–1000+ Professionals", "Multi-Country", "Any Function"],
    features: [
      "Dedicated senior account manager",
      "Multi-country talent deployment",
      "Compliance & legal guidance",
      "Advanced analytics & reporting",
      "Custom onboarding workflows",
      "Priority SLA support",
    ],
    cta: "Contact Sales",
    icon: Globe,
  },
];

const countries = [
  "Nigeria", "Ghana", "South Africa", "Kenya",
  "Cameroon", "Sierra Leone", "Uganda", "Tanzania",
];

const PricingPage = () => {
  const navigate = useNavigate();

  const goToContact = () => navigate("/#contact-form");

  return (
    <div className="min-h-screen">
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/20 to-accent/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fade}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 mb-8"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white">
                Transparent, Flexible Pricing
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            >
              Hire Global Talent{" "}
              <span className="text-primary">With Confidence.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fade}
              className="mt-6 max-w-2xl mx-auto text-lg text-white/70 leading-relaxed"
            >
              From sourcing and vetting to onboarding, payroll, and ongoing support — we handle
              every step of remote hiring so you can focus on building your business.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fade}
              className="mt-8"
            >
              <Button
                variant="brand"
                size="lg"
                onClick={goToContact}
                className="group px-8 shadow-lg shadow-primary/30"
              >
                Talk to Our Hiring Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── Concerns ─────────────────────────────────────────── */}
        <section className="py-20 bg-muted/30 dark:bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                We know what's on your mind.
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Here's how E-Africa addresses every concern founders and hiring managers bring to us.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  variants={fade}
                  className="rounded-xl border border-border bg-card p-6 flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-1">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Tiers ─────────────────────────────────────── */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Simple, Honest Pricing
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                No hidden fees. No lock-in contracts. Scale up or down as your business evolves.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 items-start">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  variants={fade}
                  className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-xl ${
                    tier.style === "featured"
                      ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-lg scale-[1.02]"
                      : tier.style === "premium"
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-border bg-card shadow-sm"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-accent px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="text-3xl">{tier.emoji}</span>
                    <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{tier.name}</h3>
                  </div>

                  <div className="mb-4">
                    <span className={`font-heading text-3xl font-bold ${
                      tier.style === "featured" ? "text-accent" : "text-primary"
                    }`}>{tier.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{tier.priceSub}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {tier.roles.map((r) => (
                      <span
                        key={r}
                        className={`rounded-full px-2.5 py-0.5 text-xs bg-muted text-muted-foreground`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${
                          tier.style === "featured" ? "text-accent" : "text-primary"
                        }`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.style === "featured" ? "brand" : "outline"}
                    size="lg"
                    className={`w-full group ${
                      tier.style === "featured"
                        ? "bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white"
                        : ""
                    }`}
                    onClick={goToContact}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Geographic Reach ──────────────────────────────────── */}
        <section className="py-16 bg-muted/30 dark:bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
              Sourcing Talent Across Africa
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We source professionals from across the continent — wherever the best talent is.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {countries.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                >
                  {c}
                </span>
              ))}
              <span className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                + many more
              </span>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to build your remote team?
            </h2>
            <p className="text-muted-foreground mb-8">
              Talk to our hiring team today. We'll listen to your needs and recommend the right talent solution for your business.
            </p>
            <Button
              variant="brand"
              size="lg"
              onClick={goToContact}
              className="group px-10 shadow-lg shadow-primary/30"
            >
              Talk to Our Hiring Team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
