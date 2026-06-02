import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import TwoPathways from "@/components/TwoPathways";
import WhatWeDo from "@/components/WhatWeDo";
import HowItWorks from "@/components/HowItWorks";
import TalentPool from "@/components/TalentPool";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StarterPackPricing from "@/components/StarterPackPricing";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <LogoCloud />
        <TwoPathways />
        <WhatWeDo />
        <HowItWorks />
        <TalentPool />
        <StarterPackPricing />
        <Testimonials />
        <FAQ />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
