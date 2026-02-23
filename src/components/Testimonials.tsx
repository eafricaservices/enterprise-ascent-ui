import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const rowOne = [
  {
    quote:
      "After completing the Customer Success training, I landed my dream role at a fintech startup. The practical skills I gained were exactly what employers were looking for.",
    name: "Chidinma Okafor",
    title: "Customer Success Manager",
  },
  {
    quote:
      "E-Africa's AI Automation course gave me the edge I needed. Within two months of completing, I was promoted to lead our automation initiatives.",
    name: "Emmanuel Adeyemi",
    title: "Process Automation Lead",
  },
  {
    quote:
      "The career coaching was transformative. They helped me rebrand my LinkedIn, nail interviews, and negotiate a 40% salary increase in my new role.",
    name: "Aisha Bello",
    title: "Senior Account Executive",
  },
  {
    quote:
      "I was stuck in a dead-end job for years. E-Africa's placement program connected me with opportunities I never knew existed. Now I work remotely for a US company.",
    name: "Kofi Mensah",
    title: "Remote Technical Support",
  },
];

const rowTwo = [
  {
    quote:
      "The CRM training was hands-on and practical. I went from knowing nothing about Salesforce to becoming the go-to person in my office.",
    name: "Blessing Eze",
    title: "CRM Administrator",
  },
  {
    quote:
      "What sets E-Africa apart is the mentorship. Even after training, they followed up and helped me navigate my first 90 days in my new role.",
    name: "Oluwaseun Adebayo",
    title: "Business Analyst",
  },
  {
    quote:
      "The mentorship program gave me clarity on my career path. My mentor's guidance was invaluable — I've since been promoted twice.",
    name: "Thabo Mokoena",
    title: "Project Manager",
  },
  {
    quote:
      "Their consulting team helped us restructure our CRM processes. The ROI was visible within the first quarter — absolutely worth the investment.",
    name: "Grace Muthoni",
    title: "Data Analyst",
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
    <Quote className="h-6 w-6 text-primary/30" />
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
      className="py-24 bg-muted/40 dark:bg-secondary/40 overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Testimonials"
          subtitle="Real stories from professionals who transformed their careers with E-Africa."
        />
      </div>

      {/* Scrolling rows */}
      <div className="relative mt-4">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 - scrolls left */}
        <div className="group mb-6">
          <div className="flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused]">
            {[...rowOne, ...rowOne].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
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
