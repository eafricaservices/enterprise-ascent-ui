import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "./SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const contactInfo = [
  {
    icon: MapPin,
    label: "Operations Footprint",
    value: "Pan-African talent network — Remote-first delivery",
  },
  { icon: Phone, label: "Phone", value: "+2349076628205" },
  { icon: Mail, label: "Email", value: "info@eafricaservices.com" },
  {
    icon: Clock,
    label: "Engagement Hours",
    value: "Mon–Fri with global timezone coordination",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_name: "",
    rc_number: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          company_name: formData.company_name || null,
          rc_number: formData.rc_number || null,
          subject: formData.subject,
          message: formData.message,
        })
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        toast({
          title: "Something went wrong",
          description: "Your message could not be sent. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", company_name: "", rc_number: "", subject: "", message: "" });
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      toast({
        title: isTimeout ? "Request timed out" : "Something went wrong",
        description: isTimeout
          ? "The server took too long to respond. Please try again."
          : "Your message could not be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/40 dark:bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Talk to Our Hiring Team"
          subtitle="Share your hiring goals and we will design a talent solution for your remote team."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:col-span-2"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="rounded-xl border border-primary/30 bg-card p-8 sm:p-10 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Request Received!
                </h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Thank you. Our team will be in touch shortly. In the meantime, you can book a call directly on our calendar.
                </p>
                <a
                  href="https://calender.app.google/dTydD4sWQtB5xs9Y6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white shadow hover:brightness-110 transition-all"
                >
                  <CalendarDays className="h-4 w-4" />
                  Schedule a Call
                </a>
                <p className="mt-6 text-xs text-muted-foreground">
                  Prefer email?{" "}
                  <a href="mailto:info@eafricaservices.com" className="text-primary hover:underline">
                    info@eafricaservices.com
                  </a>
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submit another message
                </button>
              </div>
            ) : (
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-8 shadow-sm"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    aria-required="true"
                    className="mt-1.5 text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    aria-required="true"
                    className="mt-1.5 text-base sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="company_name" className="text-sm font-medium text-foreground">
                    Company Name
                  </label>
                  <Input
                    id="company_name"
                    placeholder="Acme Corporation"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <label htmlFor="rc_number" className="text-sm font-medium text-foreground">
                    Registration Number
                  </label>
                  <Input
                    id="rc_number"
                    placeholder="Company registration ID"
                    value={formData.rc_number}
                    onChange={(e) => setFormData({ ...formData, rc_number: e.target.value })}
                    className="mt-1.5"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Optional legal entity identifier (if applicable)
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input
                  id="subject"
                  placeholder="Hiring request for remote roles"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  aria-required="true"
                  className="mt-1.5 text-base sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us which roles you need, expected timeline, and preferred language or timezone coverage."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="mt-1.5 resize-none text-base sm:text-sm"
                />
              </div>
              <Button type="submit" variant="brand" size="lg" className="w-full sm:w-auto group" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Book Hiring Consultation"}
                {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </Button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
