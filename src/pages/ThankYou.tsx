import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── DOWNLOAD LINKS PER TIER ────────────────────────────────────────────────
// &confirm=t bypasses Google Drive's virus-scan warning page for larger files.
// Update each link when tier-specific files are ready.
const DEFAULT_DOWNLOAD =
  "https://drive.google.com/uc?export=download&confirm=t&id=1DsVmX7cTB2XfEL47tvhyooFBXqGB-a7p";

interface ThankYouState {
  plan: string;
  amount: number;
  reference: string;
  firstName?: string;
}

const ThankYou = () => {
  const location = useLocation();
  const state = location.state as ThankYouState | null;

  const downloadUrl = DEFAULT_DOWNLOAD;

  useEffect(() => {
    // Fire Meta Pixel Purchase event
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq("track", "Purchase", {
        value: state?.amount ?? 20000,
        currency: "NGN",
        content_name: state?.plan ?? "E-Africa Remote Job Starter Pack",
      });
    }

    // 4-second delay so the thank-you page is fully visible before the
    // download prompt appears. Hidden iframe bypasses mobile popup blockers.
    let iframe: HTMLIFrameElement | null = null;

    const trigger = setTimeout(() => {
      iframe = document.createElement("iframe");
      iframe.style.cssText = "display:none;width:0;height:0;border:none;position:absolute;";
      iframe.src = downloadUrl;
      document.body.appendChild(iframe);

      setTimeout(() => {
        if (iframe && document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 10_000);
    }, 4_000);

    return () => {
      clearTimeout(trigger);
      if (iframe && document.body.contains(iframe)) document.body.removeChild(iframe);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg text-center">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">

            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Payment Confirmed!
            </h1>
            <p className="text-muted-foreground">
              {state?.firstName ? `Thank you, ${state.firstName}!` : "Thank you for your purchase."}
            </p>

            {/* Plan */}
            {state?.plan && (
              <div className="my-6 rounded-xl bg-muted/50 px-6 py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  You purchased
                </p>
                <p className="font-heading text-lg font-bold text-primary">
                  {state.plan}
                </p>
              </div>
            )}

            {/* Email notice */}
            <div className="mb-4 rounded-xl bg-green-500/10 border border-green-500/30 px-5 py-3">
              <p className="text-sm font-bold text-green-700 dark:text-green-400">
                A copy will be sent to your email shortly.
              </p>
            </div>

            {/* Download CTA */}
            <div className="mb-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-foreground mb-1">
                Your download is ready
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Your file will start downloading automatically in a few seconds. If it doesn't, click the button below.
              </p>
              <a
                href={downloadUrl}
                download="E-Africa-Remote-Job-Starter-Pack.pdf"
                className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110 transition-all"
              >
                <Download className="h-4 w-4" />
                Download Now
              </a>
            </div>

            {/* Reference */}
            {state?.reference && (
              <p className="text-xs text-muted-foreground/50 mb-4">
                Payment reference: {state.reference}
              </p>
            )}

            <p className="text-xs text-muted-foreground mb-6">
              Questions? Email{" "}
              <a href="mailto:eafrica.ng@gmail.com" className="text-primary hover:underline">
                eafrica.ng@gmail.com
              </a>
            </p>

            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
