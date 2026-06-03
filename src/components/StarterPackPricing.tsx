import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── LAUNCH CONFIG ─────────────────────────────────────────────────────────────
// Structure 2: Single Urgency  +  Tactic C: Hybrid (Quantity First, Time Finish)
//
//  PHASE 1 (Days 1–10) — Quantity scarcity on Professional only
//    → Update SLOTS_REMAINING each day as Paystack payments come in.
//    → Never sell more than TOTAL_SLOTS at the ₦20,000 launch price.
//
//  PHASE 2 (Days 11–12) — Switch LAUNCH_PHASE to 2 and set PHASE_2_DEADLINE.
//    → Hard 48-hour countdown. No extensions. No exceptions.
//    → After deadline, price resets to ₦35,000. Unsold slots are voided.
// ─────────────────────────────────────────────────────────────────────────────
const LAUNCH_PHASE: 1 | 2 = 1;
const TOTAL_SLOTS = 20;
const SLOTS_REMAINING = 14; // ← update this daily
const PHASE_2_DEADLINE = new Date("2026-06-18T23:59:00+01:00"); // WAT (UTC+1)
// ─────────────────────────────────────────────────────────────────────────────

const PAYSTACK_FOUNDATION_URL = import.meta.env.VITE_PAYSTACK_FOUNDATION_URL as string;
const PAYSTACK_PROFESSIONAL_URL = import.meta.env.VITE_PAYSTACK_PROFESSIONAL_URL as string;
const PAYSTACK_EXECUTIVE_URL = import.meta.env.VITE_PAYSTACK_EXECUTIVE_URL as string;

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
  const countdown = useCountdown(PHASE_2_DEADLINE);
  const slotsFilled = TOTAL_SLOTS - SLOTS_REMAINING;
  const slotsPercent = Math.round((slotsFilled / TOTAL_SLOTS) * 100);

  return (
    <section id="starter-pack" className="py-24 bg-muted/30 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          {LAUNCH_PHASE === 1 ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mb-4">
              <Users className="h-3.5 w-3.5" />
              Only {SLOTS_REMAINING} of {TOTAL_SLOTS} founding slots remaining at ₦20,000
            </span>
          ) : (
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

            <Button variant="outline" size="lg" className="w-full group" asChild>
              <a href={PAYSTACK_FOUNDATION_URL} target="_blank" rel="noopener noreferrer">
                Get Foundation Pack
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
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
            {LAUNCH_PHASE === 1 ? (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1 text-xs font-bold text-accent-foreground whitespace-nowrap">
                🔥 {SLOTS_REMAINING} Founding Slots Left
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
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground line-through">₦35,000</span>
                <span className="text-xs text-muted-foreground">regular price</span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-4xl font-bold text-primary">₦20,000</span>
                <span className="text-sm font-medium text-accent">Founding price</span>
              </div>
            </div>

            {/* Phase 1 — slot counter */}
            {LAUNCH_PHASE === 1 && (
              <div className="mb-4 rounded-xl border border-accent/20 bg-background/50 p-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-foreground flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-accent" />
                    {SLOTS_REMAINING} of {TOTAL_SLOTS} slots remaining
                  </span>
                  <span className="text-xs text-muted-foreground">{slotsFilled} claimed</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                    style={{ width: `${slotsPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Manual resume review included — real capacity, real limit.
                </p>
              </div>
            )}

            {/* Phase 2 — countdown timer */}
            {LAUNCH_PHASE === 2 && (
              <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2 text-center">
                  Founding slots close in
                </p>
                {countdown.expired ? (
                  <p className="text-center text-sm font-bold text-destructive">Offer closed — price is now ₦35,000</p>
                ) : (
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
                )}
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

            {LAUNCH_PHASE === 2 && countdown.expired ? (
              <Button variant="brand" size="lg" className="w-full" disabled>
                Offer Closed
              </Button>
            ) : (
              <Button variant="brand" size="lg" className="w-full group" asChild>
                <a href={PAYSTACK_PROFESSIONAL_URL} target="_blank" rel="noopener noreferrer">
                  Claim Founding Slot — ₦20,000
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
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

            <Button variant="outline" size="lg" className="w-full group" asChild>
              <a href={PAYSTACK_EXECUTIVE_URL} target="_blank" rel="noopener noreferrer">
                Get Executive Pack
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StarterPackPricing;
