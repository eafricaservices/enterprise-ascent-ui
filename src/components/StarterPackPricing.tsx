import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

// ── LAUNCH CONFIG ──────────────────────────────────────────────────────────────
// Set LAUNCH_DATE to the day you officially started the campaign.
// Everything else is automatic:
//   Days 1–10  → Phase 1: live slot counter (counts down from DB)
//   Days 11–12 → Phase 2: 48-hour countdown timer (auto-activates)
//   After day 12 or 0 slots → Offer closed
// ──────────────────────────────────────────────────────────────────────────────
const TOTAL_SLOTS = 20;
const LAUNCH_DATE = new Date("2026-06-08T00:00:00+01:00"); // WAT — update when you go live
const PHASE_2_DEADLINE = new Date(LAUNCH_DATE.getTime() + 12 * 24 * 60 * 60 * 1000);
// ──────────────────────────────────────────────────────────────────────────────

function useCountdown(deadline: Date) {
  const calc = () => {
    const diff = deadline.getTime() - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      hours: Math.floor(diff / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
      expired: false,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const perks = [
  "ATS-Optimized Resume Templates",
  "Recruiter-Backed Resume Frameworks",
  "Cover Letter Templates",
  "LinkedIn Optimization Guide",
  "Job Search Strategy Guide",
  "Career Support Options",
];

const StarterPackPricing = () => {
  const navigate = useNavigate();
  const countdown = useCountdown(PHASE_2_DEADLINE);

  const [slotsRemaining, setSlotsRemaining] = useState(TOTAL_SLOTS);
  const [slotsLoading, setSlotsLoading] = useState(true);

  // Fetch live count of completed Professional purchases
  useEffect(() => {
    supabase
      .from("starter_pack_orders")
      .select("*", { count: "exact", head: true })
      .ilike("plan_name", "%Professional%")
      .eq("payment_status", "completed")
      .then(({ count }) => {
        setSlotsRemaining(Math.max(0, TOTAL_SLOTS - (count ?? 0)));
        setSlotsLoading(false);
      });
  }, []);

  const daysSinceLaunch =
    (Date.now() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24);

  const isPhase2 = daysSinceLaunch >= 10;
  const offerClosed =
    slotsRemaining === 0 || (isPhase2 && countdown.expired);

  const slotsFilled = TOTAL_SLOTS - slotsRemaining;
  const slotsPercent = Math.round((slotsFilled / TOTAL_SLOTS) * 100);

  const handleBuyNow = (plan: string, amount: number) => {
    sessionStorage.setItem("checkout_plan", JSON.stringify({ plan, amount }));
    navigate("/checkout", { state: { plan, amount } });
  };

  return (
    <section id="pricing" className="py-24 bg-muted/30 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          {/* Urgency banner */}
          {!offerClosed && !isPhase2 && (
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mb-4">
              <Users className="h-3.5 w-3.5" />
              {slotsLoading
                ? "Founding slots available at ₦20,000"
                : `Only ${slotsRemaining} of ${TOTAL_SLOTS} founding slots remaining at ₦20,000`}
            </span>
          )}
          {!offerClosed && isPhase2 && (
            <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-semibold text-destructive mb-4 animate-pulse">
              <Clock className="h-3.5 w-3.5" />
              Final 48 hours — founding slots close forever. Price returns to ₦35,000.
            </span>
          )}

          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Get More Interviews. Stand Out Globally.
          </h2>
          <p className="mt-3 text-xl font-semibold text-primary">
            The E-Africa Remote Job Starter Pack
          </p>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Built for professionals looking to secure remote jobs with international companies.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6"
        >
          {perks.map((perk) => (
            <span key={perk} className="flex items-center gap-1.5 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary shrink-0" />
              {perk}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center text-muted-foreground text-sm mb-12"
        >
          Choose the package that fits your career stage.
        </motion.p>

        {/* Pricing cards */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">

          {/* ── Foundation ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-xl"
          >
            <div className="mb-6">
              <span className="text-3xl">🥉</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-card-foreground">Foundation Pack</h3>
              <p className="mt-1 text-sm text-muted-foreground">For job seekers who want to do it themselves.</p>
            </div>

            <div className="mb-6">
              <span className="font-heading text-4xl font-bold text-primary">₦15,000</span>
              <p className="mt-1 text-xs text-muted-foreground">Permanent price — no deadline</p>
            </div>

            <ul className="space-y-2.5 mb-6 flex-1">
              {[
                "ATS-Optimized Resume Template",
                "Cover Letter Template",
                "Resume Writing Guide",
                "ATS Formatting Guide",
                "PDF Export Guide",
                "Job Application Checklist",
                "LinkedIn Profile Optimization Checklist",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Perfect for</p>
              <div className="flex flex-wrap gap-1.5">
                {["Students", "Graduates", "First-time remote job seekers"].map((r) => (
                  <span key={r} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{r}</span>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full group"
              onClick={() => handleBuyNow("Foundation Pack", 15000)}
            >
              Buy Now — ₦15,000
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* ── Professional (urgency) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative flex flex-col rounded-2xl border border-accent bg-accent/5 dark:bg-accent/10 shadow-lg p-8 transition-all hover:shadow-xl scale-[1.02]"
          >
            {/* Card badge */}
            {offerClosed ? (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-muted px-5 py-1 text-xs font-bold text-muted-foreground whitespace-nowrap">
                Now ₦35,000
              </span>
            ) : !isPhase2 ? (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1 text-xs font-bold text-accent-foreground whitespace-nowrap">
                {slotsLoading ? "🔥 Founding Slots Available" : `🔥 ${slotsRemaining} Slots Left`}
              </span>
            ) : (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-destructive px-5 py-1 text-xs font-bold text-white whitespace-nowrap">
                ⏱ Final 48 Hours
              </span>
            )}

            <div className="mb-6">
              <span className="text-3xl">🥈</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-card-foreground">Professional Pack</h3>
              <p className="mt-1 text-sm text-muted-foreground">Everything in Foundation, plus hands-on support.</p>
            </div>

            {/* Pricing */}
            <div className="mb-4">
              {offerClosed ? (
                <span className="font-heading text-4xl font-bold text-primary">₦35,000</span>
              ) : (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground line-through">₦35,000</span>
                    <span className="text-xs text-muted-foreground">regular price</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-heading text-4xl font-bold text-primary">₦20,000</span>
                    <span className="text-sm font-medium text-accent">Founding price</span>
                  </div>
                </>
              )}
            </div>

            {/* Phase 1 — live slot counter */}
            {!offerClosed && !isPhase2 && (
              <div className="mb-4 rounded-xl border border-accent/20 bg-background/50 p-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-foreground flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-accent" />
                    {slotsLoading ? "Loading slots…" : `${slotsRemaining} of ${TOTAL_SLOTS} slots remaining`}
                  </span>
                  {!slotsLoading && (
                    <span className="text-xs text-muted-foreground">{slotsFilled} claimed</span>
                  )}
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-700"
                    style={{ width: slotsLoading ? "0%" : `${slotsPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Manual resume review included — real capacity, real limit.
                </p>
              </div>
            )}

            {/* Phase 2 — countdown timer */}
            {!offerClosed && isPhase2 && (
              <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2 text-center">
                  Founding slots close in
                </p>
                <div className="flex justify-center gap-3">
                  {[
                    { value: countdown.hours, label: "hrs" },
                    { value: countdown.minutes, label: "min" },
                    { value: countdown.seconds, label: "sec" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="font-heading text-2xl font-bold text-destructive tabular-nums w-10 text-center">
                        {String(value).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  After deadline, price returns to ₦35,000. No extensions.
                </p>
              </div>
            )}

            <ul className="space-y-2.5 mb-6 flex-1">
              {[
                "Everything in Foundation Pack",
                "Resume Review",
                "Personalized Feedback",
                "LinkedIn Headline Optimization",
                "Career Direction Guide",
                "Email Support",
                "Access to Private Job-Seeker Community",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Perfect for</p>
              <div className="flex flex-wrap gap-1.5">
                {["Mid-level professionals", "Career switchers", "Serious remote job seekers"].map((r) => (
                  <span key={r} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{r}</span>
                ))}
              </div>
            </div>

            {offerClosed ? (
              <Button
                variant="brand"
                size="lg"
                className="w-full"
                onClick={() => handleBuyNow("Professional Pack", 35000)}
              >
                Buy Now — ₦35,000
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                variant="brand"
                size="lg"
                className="w-full group"
                onClick={() => handleBuyNow("Professional Pack — Founding Member", 20000)}
              >
                Buy Now — ₦20,000
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </motion.div>

          {/* ── Executive ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-xl"
          >
            <div className="mb-6">
              <span className="text-3xl">🥇</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-card-foreground">Executive Pack</h3>
              <p className="mt-1 text-sm text-muted-foreground">Everything in Professional, plus done-for-you services.</p>
            </div>

            <div className="mb-6">
              <span className="font-heading text-4xl font-bold text-primary">₦50,000</span>
              <p className="mt-1 text-xs text-muted-foreground">Premium — always available</p>
            </div>

            <ul className="space-y-2.5 mb-6 flex-1">
              {[
                "Everything in Professional Pack",
                "Custom Resume Rewrite",
                "Custom Cover Letter",
                "1-on-1 Career Strategy Call",
                "LinkedIn Profile Rewrite",
                "Job Search Strategy Session",
                "Interview Preparation Session",
                "Direct Talent Pool Consideration",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Perfect for</p>
              <div className="flex flex-wrap gap-1.5">
                {["Managers", "Senior Professionals", "Tech Professionals", "Executives"].map((r) => (
                  <span key={r} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{r}</span>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full group"
              onClick={() => handleBuyNow("Executive Pack", 50000)}
            >
              Buy Now — ₦50,000
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-xs text-muted-foreground/70 max-w-xl mx-auto"
        >
          This product does not guarantee employment. Results depend on your experience, effort, and the job market.
        </motion.p>
      </div>
    </section>
  );
};

export default StarterPackPricing;
