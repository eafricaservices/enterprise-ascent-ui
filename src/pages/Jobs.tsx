import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JobsPage = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
            >
              Job Listings
            </motion.h1>
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { delay: 0.1 }}
              className="mt-4 text-base text-muted-foreground"
            >
              This page is coming soon. In the meantime, join our talent pool to be considered
              for upcoming roles.
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
