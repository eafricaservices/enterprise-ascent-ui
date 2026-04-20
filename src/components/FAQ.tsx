import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const employerFaqs = [
  {
    q: "How do payments work?",
    a: "Clients pay E-Africa. We handle cross-border payroll.",
  },
  {
    q: "Who handles taxes and legal compliance?",
    a: "Contractors manage their own taxes. We provide structured contracts and compliance alignment.",
  },
  {
    q: "Can I interview the talent myself?",
    a: "Yes. You join final interviews and select from shortlisted candidates.",
  },
  {
    q: "How do I know your talent is qualified?",
    a: (
      <>
        Multi-stage vetting includes English testing, role-specific assessments, and communication checks -
        especially for{" "}
        <strong className="font-semibold text-foreground">
          bilingual remote customer service jobs
        </strong>
        .
      </>
    ),
  },
  {
    q: "What if I need to scale quickly?",
    a: (
      <>
        Our infrastructure supports rapid deployment - from 10 to 1,000+ team members. We are a{" "}
        <strong className="font-semibold text-foreground">staffing agency for startups</strong> that
        grows with you.
      </>
    ),
  },
];

const talentFaqs = [
  {
    q: "Do I need previous experience?",
    a: "No. We have work-from-home English-speaking roles for graduates and entry-level candidates, plus free training.",
  },
  {
    q: "How do I get paid?",
    a: "Monthly USD payments via secure global transfer options.",
  },
  {
    q: "Is there a fee to join?",
    a: "No. Joining our talent pool is completely free.",
  },
  {
    q: "What equipment do I need?",
    a: (
      <>
        A laptop, stable internet, and backup power - standard for{" "}
        <strong className="font-semibold text-foreground">stay at home jobs in africa</strong>.
      </>
    ),
  },
  {
    q: "How long until I get placed?",
    a: "It varies, but most candidates receive their first match within 4-6 weeks.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 bg-muted/40 dark:bg-secondary/40 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <Tabs defaultValue="employers">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employers">For Employers</TabsTrigger>
              <TabsTrigger value="job-seekers">For Job Seekers</TabsTrigger>
            </TabsList>

            <TabsContent value="employers" className="mt-6 space-y-4">
              {employerFaqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="font-heading font-semibold text-foreground">
                    <strong>{faq.q}</strong>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="job-seekers" className="mt-6 space-y-4">
              {talentFaqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="font-heading font-semibold text-foreground">
                    <strong>{faq.q}</strong>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
