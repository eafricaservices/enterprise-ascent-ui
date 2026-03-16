import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "./SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const contactInfo = [
  {
    icon: MapPin,
    label: "Operations",
    value: "Pan-African — Remote-first company",
  },
  { icon: Phone, label: "Phone", value: "+254 700 000 000" },
  { icon: Mail, label: "Email", value: "info@eafricaservices.com" },
  {
    icon: Clock,
    label: "Availability",
    value: "US Hours — Mon–Fri",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });
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
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to hire elite remote talent? Let's start a conversation."
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
            <form
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
                    className="mt-1.5"
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
                    className="mt-1.5"
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
                    RC Number
                  </label>
                  <Input
                    id="rc_number"
                    placeholder="RC123456"
                    value={formData.rc_number}
                    onChange={(e) => setFormData({ ...formData, rc_number: e.target.value })}
                    className="mt-1.5"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Company registration number (if applicable)
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input
                  id="subject"
                  placeholder="I want to hire remote talent..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your hiring needs..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="mt-1.5 resize-none"
                />
              </div>
              <Button type="submit" variant="brand" size="lg" className="w-full sm:w-auto group" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send Message"}
                {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
