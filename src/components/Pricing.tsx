import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const plans = [
  {
    name: "Flexible Team Access",
    price: "$13",
    unit: "per team member / hour",
    description: "For companies that need flexible, on-demand remote talent across core business functions.",
    features: [
      "Customer Service & Virtual Assistants",
      "Data Entry, Coding & Bookkeeping",
      "Dedicated Client Success Manager",
      "Home Office Certification",
      "US Hours Availability",
      "Payroll & Compliance Management",
      "English Assessment & Interview Screening",
    ],
    cta: "Talk to Hiring Team",
    featured: false,
  },
  {
    name: "Dedicated Team Buildout",
    price: "Custom",
    unit: "tailored pricing",
    description: "Custom-built remote teams with structured onboarding, role alignment, and managed delivery support.",
    features: [
      "Custom team structure design",
      "Assigned dashboards & workflows",
      "Dedicated management layer",
      "Payroll & compliance handled",
      "Skill-matched professionals",
      "Ongoing performance tracking",
    ],
    cta: "Request Team Proposal",
    featured: true,
  },
  {
    name: "Enterprise Workforce Scale",
    price: "Enterprise",
    unit: "100–1000+ members",
    description: "For organizations scaling distributed operations with full workforce infrastructure and strategic oversight.",
    features: [
      "Infrastructure deployment",
      "Management layer setup",
      "CRM integrations",
      "Workforce analytics",
      "Strategic account oversight",
      "Dedicated scaling partner",
    ],
    cta: "Schedule Workforce Strategy Call",
    featured: false,
  },
];

const Pricing = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Pricing"
          subtitle="Workforce pricing models designed for flexible hiring, dedicated team buildout, and enterprise scale."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl border p-8 transition-all hover:shadow-lg ${
                plan.featured
                  ? "border-accent bg-accent/5 shadow-md dark:bg-accent/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-card-foreground">
                {plan.name}
              </h3>
              <div className="mt-4">
                <span className="font-heading text-4xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {plan.unit}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "brand" : "outline"}
                size="lg"
                className="mt-8 w-full group"
                onClick={() => scrollTo("contact")}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
