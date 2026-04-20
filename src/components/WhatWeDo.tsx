import { Button } from "@/components/ui/button";

const WhatWeDo = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="employers-core-services" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Global Talent Solutions - Built for Remote Teams
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent mx-auto" />
          <p className="mt-4 max-w-3xl mx-auto text-base leading-relaxed text-muted-foreground sm:text-lg">
            We provide remote-ready professionals across key business functions. Whether you need to{" "}
            <strong className="font-semibold text-foreground">
              outsource customer support
            </strong>
            ,{" "}
            <strong className="font-semibold text-foreground">
              hire remote virtual assistant
            </strong>{" "}
            roles, or scale your sales team, we deliver.
          </p>
        </div>

        <h3 className="mt-12 font-heading text-xl font-bold text-foreground">Service Categories</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="font-heading text-lg font-bold text-foreground">Customer Experience</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Support specialists, success managers, call center agents, technical support - ideal for{" "}
              <strong className="font-semibold text-foreground">
                customer service and outsourcing
              </strong>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="font-heading text-lg font-bold text-foreground">Operations &amp; Admin</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Virtual assistants, executive assistants, operations coordinators, project managers -{" "}
              <strong className="font-semibold text-foreground">
                hire remote virtual assistant
              </strong>{" "}
              talent here
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="font-heading text-lg font-bold text-foreground">Sales &amp; Revenue</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              SDRs, lead gen specialists, account executives, cold calling specialists
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="font-heading text-lg font-bold text-foreground">Technology &amp; Creative</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Software developers, data analysts, digital marketers, video editors
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          Multilingual professionals - English (C1), French, Portuguese, Spanish, German, Swahili. Perfect for{" "}
          <strong className="font-semibold text-foreground">
            bilingual remote customer service jobs
          </strong>
          .
        </div>

        <div className="mt-8">
          <Button variant="brand" size="lg" onClick={() => scrollTo("contact")}>
            Talk to Hiring Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
