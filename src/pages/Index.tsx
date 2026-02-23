import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import LogoCloud from "@/components/LogoCloud";
import Expertise from "@/components/Expertise";
import Services from "@/components/Services";
import TalentPool from "@/components/TalentPool";
import Testimonials from "@/components/Testimonials";
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
        <Expertise />
        <Services />
        <TalentPool />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
