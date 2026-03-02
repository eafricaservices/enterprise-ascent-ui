import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import LogoCloud from "@/components/LogoCloud";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import TalentPool from "@/components/TalentPool";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <LogoCloud />
        <WhoWeAre />
        <WhatWeDo />
        <HowItWorks />
        <Pricing />
        <TalentPool />
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
