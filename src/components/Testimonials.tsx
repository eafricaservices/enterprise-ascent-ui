import { motion } from "framer-motion";

const employerTestimonials = [
  {
    quote:
      "We tried hiring independently through LinkedIn and Upwork. It was inconsistent. E-Africa delivered structured, reliable professionals who integrated seamlessly.",
    author: "Sarah Mitchell, VP of Operations, TechScale Inc.",
  },
  {
    quote:
      "As a startup, we couldn't afford hiring mistakes. E-Africa eliminated the risk entirely. Our remote team feels like an in-house extension.",
    author: "Michael Torres, CTO, Launchpad Digital",
  },
  {
    quote:
      "The multilingual capabilities were a game-changer. We needed French and English speakers - E-Africa delivered perfectly.",
    author: "Isabelle Dubois, Expansion Lead, EuroConnect",
  },
];

const talentTestimonial =
  "I joined E-Africa's talent pool and within a month was placed at a US company. The process was professional from start to finish.";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Making African Excellence the Global First Choice
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent mx-auto" />
        </div>

        <div className="mt-10 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="font-heading text-lg font-bold text-foreground">
              500+ professionals placed - including remote customer support roles
            </h4>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="font-heading text-lg font-bold text-foreground">
              100+ companies supported
            </h4>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="font-heading text-lg font-bold text-foreground">
              25+ African talent markets
            </h4>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="font-heading text-lg font-bold text-foreground">
              6 business languages covered
            </h4>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-foreground">
            Customer Service Operations
          </h3>
          <h4 className="mt-4 font-heading text-lg font-semibold text-foreground">
            What Employers Say
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Hear from companies that trust E-Africa for their remote hiring needs.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {employerTestimonials.map((item) => (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-sm text-muted-foreground">"{item.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-foreground">{item.author}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-foreground">
            Remote Customer Service Roles
          </h3>
          <h4 className="mt-4 font-heading text-lg font-semibold text-foreground">
            What Talent Says
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Professionals who found their roles through our talent pool share their experience.
          </p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">"{talentTestimonial}"</p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              Chidinma Okafor, Remote Customer Success Manager
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
