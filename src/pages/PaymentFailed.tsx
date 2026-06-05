import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fbq = (window as any).fbq;
    if (fbq) fbq("trackCustom", "PaymentFailed");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg text-center">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
              Payment Not Completed
            </h1>
            <p className="text-muted-foreground mb-8">
              Your payment was not completed. No charge has been made to your account.
            </p>

            <div className="space-y-3">
              <Button
                variant="brand"
                size="lg"
                className="w-full"
                onClick={() => navigate("/#starter-pack")}
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>

            <p className="mt-8 text-xs text-muted-foreground">
              Need help? Email{" "}
              <a
                href="mailto:eafrica.ng@gmail.com"
                className="text-primary hover:underline"
              >
                eafrica.ng@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentFailed;
