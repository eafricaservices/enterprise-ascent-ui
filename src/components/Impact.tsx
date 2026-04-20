import { Button } from "@/components/ui/button";

const Impact = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-4xl">
          Ready to build your global team - or start your remote career?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <a href="/contact">Talk to Hiring Team</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            asChild
          >
            <a href="#job-seekers-talent-pool">Join Talent Pool</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Impact;
