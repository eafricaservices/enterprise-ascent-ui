import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const rowOne = [
  {
    quote:
      "We tried hiring independently through LinkedIn and Upwork. It was inconsistent. E-Africa delivered structured, reliable professionals who integrated seamlessly.",
    name: "Sarah Mitchell",
    title: "VP of Operations, TechScale Inc.",
  },
  {
    quote:
      "We planned to scale slowly. With E-Africa, we scaled twice as fast with better performance.",
    name: "James Okonkwo",
    title: "CEO, AfriGrowth Partners",
  },
  {
    quote:
      "The difference wasn't just talent — it was infrastructure. Payroll, compliance, management — all handled.",
    name: "Linda Chen",
    title: "HR Director, GlobalReach",
  },
  {
    quote:
      "E-Africa's vetting process is thorough. Every candidate we received was interview-ready and exceeded expectations.",
    name: "David Mensah",
    title: "Founder, NovaStack",
  },
];

const rowTwo = [
  {
    quote:
      "Within two weeks of submitting our hiring request, we had a full customer success team operational. The speed was remarkable.",
    name: "Patricia Adeyemi",
    title: "COO, FinBridge Africa",
  },
  {
    quote:
      "As a startup, we couldn't afford hiring mistakes. E-Africa eliminated the risk entirely. Our remote team feels like an in-house extension.",
    name: "Michael Torres",
    title: "CTO, Launchpad Digital",
  },
  {
    quote:
      "The multilingual capabilities were a game-changer. We needed French and English speakers — E-Africa delivered perfectly.",
    name: "Isabelle Dubois",
    title: "Expansion Lead, EuroConnect",
  },
  {
    quote:
      "I joined E-Africa's talent pool and within a month was placed at a US company. The process was professional from start to finish.",
    name: "Chidinma Okafor",
    title: "Remote Customer Success Manager",
  },
];

const TestimonialCard = ({
  quote,
  name,
  title,
}: {
  quote: string;
  name: string;
  title: string;
}) => (
  <div className="w-[360px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg dark:shadow-black/10">
    <Quote className="h-6 w-6 text-accent/40" />
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
      &ldquo;{quote}&rdquo;
    </p>
    <div className="mt-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <p className="text-sm font-semibold text-card-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Testimonials"
          subtitle="Real stories from companies and professionals who trust E-Africa."
        />
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="group mb-6">
          <div className="flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused]">
            {[...rowOne, ...rowOne].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} {...t} />
            ))}
          </div>
        </div>

        <div className="group">
          <div className="flex gap-6 animate-marquee-right group-hover:[animation-play-state:paused]">
            {[...rowTwo, ...rowTwo].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} {...t} />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Hover to explore all testimonials
        </motion.p>
      </div>
    </section>
  );
};

export default Testimonials;
