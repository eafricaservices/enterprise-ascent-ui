import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAYSTACK_FOUNDATION_URL = import.meta.env.VITE_PAYSTACK_FOUNDATION_URL as string;
const PAYSTACK_PROFESSIONAL_URL = import.meta.env.VITE_PAYSTACK_PROFESSIONAL_URL as string;
const PAYSTACK_EXECUTIVE_URL = import.meta.env.VITE_PAYSTACK_EXECUTIVE_URL as string;

const packs = [
  {
    emoji: "🥉",
    name: "Foundation Pack",
    tagline: "For job seekers who want to do it themselves.",
    originalPrice: "₦20,000",
    launchPrice: "₦15,000",
    hasLaunchPrice: true,
    features: [
      "ATS-Optimized Resume Template",
      "Cover Letter Template",
      "Resume Writing Guide",
      "ATS Formatting Guide",
      "PDF Export Guide",
      "Job Application Checklist",
      "LinkedIn Profile Optimization Checklist",
    ],
    perfectFor: ["Students", "Graduates", "First-time remote job seekers"],
    featured: false,
    payUrl: PAYSTACK_FOUNDATION_URL,
    cta: "Get Foundation Pack",
  },
  {
    emoji: "🥈",
    name: "Professional Pack",
    tagline: "Everything in Foundation, plus hands-on support.",
    originalPrice: "₦35,000",
    launchPrice: null,
    hasLaunchPrice: false,
    features: [
      "Everything in Foundation Pack",
      "Resume Review",
      "Personalized Feedback",
      "LinkedIn Headline Optimization",
      "Career Direction Guide",
      "Email Support",
      "Access to Private Job-Seeker Community",
    ],
    perfectFor: ["Mid-level professionals", "Career switchers", "Serious remote job seekers"],
    featured: true,
    payUrl: PAYSTACK_PROFESSIONAL_URL,
    cta: "Get Professional Pack",
  },
  {
    emoji: "🥇",
    name: "Executive Pack",
    tagline: "Everything in Professional, plus done-for-you services.",
    originalPrice: "₦60,000",
    launchPrice: "₦50,000",
    hasLaunchPrice: true,
    features: [
      "Everything in Professional Pack",
      "Custom Resume Rewrite",
      "Custom Cover Letter",
      "1-on-1 Career Strategy Call",
      "LinkedIn Profile Rewrite",
      "Job Search Strategy Session",
      "Interview Preparation Session",
      "Direct Talent Pool Consideration",
    ],
    perfectFor: ["Managers", "Senior Professionals", "Tech Professionals", "Executives"],
    featured: false,
    payUrl: PAYSTACK_EXECUTIVE_URL,
    cta: "Get Executive Pack",
  },
];

const perks = [
  "ATS-Optimized Resume Templates",
  "Recruiter-Backed Resume Frameworks",
  "Cover Letter Templates",
  "LinkedIn Optimization Guide",
  "Job Search Strategy Guide",
  "Career Support Options",
];

const StarterPackPricing = () => {
  return (
    <section id="starter-pack" className="py-24 bg-muted/30 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Get More Interviews. Stand Out Globally.
          </h2>
          <p className="mt-3 text-xl font-semibold text-primary">
            The E-Africa Remote Job Starter Pack
          </p>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Built for professionals looking to secure remote jobs with international companies.
          </p>
        </motion.div>

        {/* Perks list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6"
        >
          {perks.map((perk) => (
            <span key={perk} className="flex items-center gap-1.5 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary shrink-0" />
              {perk}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center text-muted-foreground text-sm mb-12"
        >
          Choose the package that fits your career stage.
        </motion.p>

        {/* Pricing cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-xl ${pack.featured
                ? "border-accent bg-accent/5 shadow-lg dark:bg-accent/10 scale-[1.02]"
                : "border-border bg-card"
                }`}
            >
              {pack.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1 text-xs font-bold text-accent-foreground whitespace-nowrap">
                  Recommended
                </span>
              )}

              {/* Pack header */}
              <div className="mb-6">
                <span className="text-3xl">{pack.emoji}</span>
                <h3 className="mt-2 font-heading text-xl font-bold text-card-foreground">
                  {pack.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{pack.tagline}</p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {pack.hasLaunchPrice ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {pack.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-heading text-4xl font-bold text-primary">
                        {pack.launchPrice}
                      </span>
                      <span className="text-sm font-medium text-accent">Launch price</span>
                    </div>
                  </>
                ) : (
                  <span className="font-heading text-4xl font-bold text-primary">
                    {pack.originalPrice}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Perfect for */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Perfect for
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pack.perfectFor.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                variant={pack.featured ? "brand" : "outline"}
                size="lg"
                className="w-full group"
                onClick={() => pack.payUrl && window.open(pack.payUrl, "_blank", "noopener,noreferrer")}
                disabled={!pack.payUrl}
              >
                {pack.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarterPackPricing;
