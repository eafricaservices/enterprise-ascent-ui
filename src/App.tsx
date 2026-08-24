import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToHash from "@/components/ScrollToHash";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// ── Lazy-loaded page chunks ────────────────────────────────────────────────
// Each page becomes its own async JS chunk, downloaded only when navigated to.
const Index = lazy(() => import("./pages/Index"));
const BlogPage = lazy(() => import("./pages/Blog"));
const ContactPage = lazy(() => import("./pages/Contact"));
const JobsPage = lazy(() => import("./pages/Jobs"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const ThankYouPage = lazy(() => import("./pages/ThankYou"));
const PaymentFailedPage = lazy(() => import("./pages/PaymentFailed"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ── Suspense fallback ──────────────────────────────────────────────────────
// Shown for the brief moment while a route chunk is being downloaded.
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/payment-failed" element={<PaymentFailedPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ScrollToTopButton />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
