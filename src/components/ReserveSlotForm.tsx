import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Please enter a valid email address.";
  return errors;
};

type Status = "idle" | "loading" | "success" | "error";

const ReserveSlotForm = () => {
  const [form, setForm] = useState<FormData>({ firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("loading");
    setErrorMsg("");

    try {
      // 1. Upsert lead via SECURITY DEFINER RPC (handles conflict on email)
      const { data: rows, error: rpcError } = await supabase.rpc("upsert_lead", {
        p_first_name: form.firstName.trim(),
        p_last_name: form.lastName.trim(),
        p_email: form.email.trim().toLowerCase(),
      });

      if (rpcError) throw new Error(rpcError.message);

      const lead = rows?.[0];
      if (!lead) throw new Error("No lead returned from upsert.");

      // 2. Paid leads should not receive follow-up automation — skip Zapier
      if (!lead.paid) {
        const zapierUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
        if (zapierUrl) {
          // Fire-and-forget — don't block the UI on Zapier
          fetch(zapierUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              first_name: lead.first_name,
              last_name: lead.last_name,
              email: lead.email,
              status: lead.status,
            }),
          }).catch(() => {
            // Zapier failures are non-fatal — Supabase is source of truth
          });
        }
      }

      setStatus("success");
    } catch (err) {
      console.error("ReserveSlotForm error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Your slot is reserved!
        </h3>
        <p className="text-sm text-muted-foreground">
          Check your inbox — we'll be in touch with everything you need to get started.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Input
            id="rsf-firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={set("firstName")}
            className={`text-base sm:text-sm ${errors.firstName ? "border-destructive" : ""}`}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Input
            id="rsf-lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            className={`text-base sm:text-sm ${errors.lastName ? "border-destructive" : ""}`}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          id="rsf-email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={set("email")}
          className={`text-base sm:text-sm ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Reserving…" : "Reserve My Slot"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        No payment required. We'll reach out with next steps.
      </p>
    </form>
  );
};

export default ReserveSlotForm;
