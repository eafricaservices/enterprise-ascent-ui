import { motion } from "framer-motion";
import { Check, ArrowRight, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const businessPlans = [
  {
    name: "Pay-As-You-Go",
    price: "$13",
    unit: "per team member / hour",
    description: "Ideal for companies needing flexible, on-demand remote talent.",
    features: [
      "Customer Service & Virtual Assistants",
      "Data Entry, Coding & Bookkeeping",
      "Dedicated Client Success Manager",
      "Home Office Certification",
      "US Hours Availability",
      "Payroll & Compliance Management",
      "English Assessment & Interview Screening",
    ],
    cta: "Start Hiring",
    featured: false,
  },
  {
    name: "Build My Team",
    price: "Custom",
    unit: "tailored pricing",
    description: "Custom-built remote teams with tailored skill combinations and structured departments.",
    features: [
      "Custom team structure design",
      "Assigned dashboards & workflows",
      "Dedicated management layer",
      "Payroll & compliance handled",
      "Skill-matched professionals",
      "Ongoing performance tracking",
    ],
    cta: "Get a Quote",
    featured: true,
  },
  {
    name: "Scale Large Team",
    price: "Enterprise",
    unit: "100–1000+ members",
    description: "For companies hiring at scale with full infrastructure deployment.",
    features: [
      "Infrastructure deployment",
      "Management layer setup",
      "CRM integrations",
      "Workforce analytics",
      "Strategic account oversight",
      "Dedicated scaling partner",
    ],
    cta: "Schedule Strategic Call",
    featured: false,
  },
];

const talentPlans = [
  {
    name: "Free Registration",
    price: "Free",
    unit: "always",
    description: "Join our talent pool at no cost and get matched with global opportunities.",
    features: [
      "Profile creation & visibility",
      "Access to job opportunities",
      "Skills assessment",
      "Interview preparation resources",
      "Job matching notifications",
    ],
    cta: "Join Talent Pool",
    featured: false,
  },
  {
    name: "E-Amplify Training",
    price: "$49",
    unit: "one-time",
    description: "Comprehensive training program to boost your remote work readiness and employability.",
    features: [
      "Remote work best practices",
      "Communication skills training",
      "Tool proficiency (Slack, Zoom, etc.)",
      "Time management & productivity",
      "Certificate of completion",
      "Priority placement consideration",
    ],
    cta: "Enroll Now",
    featured: true,
  },
  {
    name: "Premium Profile",
    price: "$19",
    unit: "per month",
    description: "Stand out from the crowd with enhanced visibility and priority matching.",
    features: [
      "Featured profile badge",
      "Priority job matching",
      "1-on-1 career coaching session",
      "Resume review & optimization",
      "LinkedIn profile enhancement tips",
    ],
    cta: "Upgrade Profile",
    featured: false,
  },
];

const PricingPage = () => {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl font-bold text-foreground sm:text-5xl"
            >
              Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Whether you're a business looking to hire remote talent or a professional 
              seeking global opportunities, we have a plan that fits your needs.
            </motion.p>
          </div>
        </section>

        {/* Business Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  For Businesses
                </h2>
                <p className="text-muted-foreground">
                  Hire vetted African remote professionals for your team
                </p>
              </div>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
              {businessPlans.map((plan, i) => (
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
                    onClick={scrollToContact}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Talent/User Pricing */}
        <section className="py-20 bg-muted/40 dark:bg-secondary/40">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  For Talent / Job Seekers
                </h2>
                <p className="text-muted-foreground">
                  Join our talent pool and access global remote opportunities
                </p>
              </div>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
              {talentPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={`relative rounded-2xl border p-8 transition-all hover:shadow-lg ${
                    plan.featured
                      ? "border-primary bg-primary/5 shadow-md dark:bg-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                      Recommended
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
                    onClick={() => window.location.href = "/#talent"}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ / Additional Info */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Have Questions About Pricing?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Every business is unique. Contact us for custom quotes, volume discounts, 
                or to discuss your specific requirements.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button variant="brand" size="lg" asChild>
                  <Link to="/#contact">
                    Contact Sales
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/#faq">
                    View FAQ
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
