import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    quote:
      "After completing the Customer Success training, I landed my dream role at a fintech startup. The practical approach made all the difference.",
    name: "Chidinma Okafor",
    title: "Customer Success Manager",
  },
  {
    quote:
      "E-Africa's AI Automation course gave me the skills to streamline our entire workflow. Our team's productivity increased by 40% within weeks.",
    name: "Kwame Asante",
    title: "Operations Lead",
  },
  {
    quote:
      "The LinkedIn Optimization training completely transformed my profile. I started receiving recruiter messages within days of applying the strategies.",
    name: "Fatima Ndiaye",
    title: "Marketing Specialist",
  },
  {
    quote:
      "Their consulting team helped us restructure our CRM processes. The ROI was visible within the first quarter — absolutely worth the investment.",
    name: "Oluwaseun Adeyemi",
    title: "Head of Sales, FinTech Co.",
  },
  {
    quote:
      "I was matched with my current role through their talent pool in under two weeks. The AI-driven matching is incredibly accurate.",
    name: "Grace Muthoni",
    title: "Data Analyst",
  },
  {
    quote:
      "The mentorship program gave me clarity on my career path. My mentor's guidance was invaluable — I've since been promoted twice.",
    name: "Thabo Mokoena",
    title: "Project Manager",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Testimonials"
          subtitle="Real stories from professionals who transformed their careers with E-Africa."
        />

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 dark:shadow-black/10"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm dark:shadow-black/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  "{testimonials[current].quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold">
                    {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prev} className="h-9 w-9 rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="h-9 w-9 rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
