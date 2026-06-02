import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarterPackPricing from "@/components/StarterPackPricing";

const PricingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <StarterPackPricing />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
