import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do you handle payments?",
    a: "We manage cross-border payroll through secure global payment systems. Clients pay E-Africa. We pay contractors.",
  },
  {
    q: "Who handles taxes and legal compliance?",
    a: "Contractors manage their own tax obligations. We handle structured contracts and compliance alignment.",
  },
  {
    q: "Can I interview the talent myself?",
    a: "Yes. You may join final interviews and select from shortlisted candidates.",
  },
  {
    q: "How do I know your talent is qualified?",
    a: "We use a multi-stage vetting system including English testing, structured interviews, and senior partner evaluation.",
  },
  {
    q: "What about power and internet reliability?",
    a: "We prioritize professionals with stable internet and backup power systems.",
  },
  {
    q: "What if I need to scale quickly?",
    a: "Our infrastructure supports rapid deployment of structured teams — from 10 to 1,000+ members.",
  },
  {
    q: "What makes you different from LinkedIn hiring?",
    a: "LinkedIn gives you profiles. We give you performance-ready professionals with structure, payroll, and management systems included.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 bg-muted/40 dark:bg-secondary/40 overflow-hidden">
      {/* Logo watermark */}
      <div className="absolute left-0 bottom-10 -translate-x-1/3 pointer-events-none">
        <img
          src="/eafrica.png"
          alt=""
          className="w-[300px] h-auto opacity-[0.05] object-contain"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with E-Africa Services."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
