import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface CheckoutState {
  plan: string;
  amount: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  return errors;
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState | null;

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state?.plan) navigate("/#starter-pack");
  }, [state, navigate]);

  if (!state?.plan) return null;

  const { plan, amount } = state;
  const fmt = (n: number) => `₦${n.toLocaleString("en-NG")}`;

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const handlePayment = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) {
      alert("Payment system is still loading. Please wait a moment and try again.");
      return;
    }

    setLoading(true);

    // Save order to DB before opening Paystack
    const { data: order, error: dbError } = await supabase
      .from("starter_pack_orders")
      .insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        plan_name: plan,
        amount_naira: amount,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (dbError || !order) {
      console.error("DB insert error:", dbError?.message, dbError?.details, dbError?.hint, dbError);
      setLoading(false);
      alert(
        dbError
          ? `Order could not be saved: ${dbError.message}`
          : "Something went wrong. Please try again."
      );
      return;
    }

    const orderId = order.id;
    const ref = String(Math.floor(Math.random() * 1_000_000_000) + 1);

    // Pixel: buyer is entering payment
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq("track", "InitiateCheckout", {
        value: amount,
        currency: "NGN",
        content_name: plan,
      });
    }

    const handler = PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: form.email.trim(),
      amount: amount * 100,
      currency: "NGN",
      ref,
      metadata: {
        custom_fields: [
          { display_name: "Plan", variable_name: "plan", value: plan },
          { display_name: "Name", variable_name: "name", value: `${form.firstName} ${form.lastName}` },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Order ID", variable_name: "order_id", value: orderId },
        ],
      },
      callback: async (response: { reference: string }) => {
        // Update order as completed
        await supabase
          .from("starter_pack_orders")
          .update({
            payment_reference: response.reference,
            payment_status: "completed",
          })
          .eq("id", orderId);

        navigate("/thank-you", {
          state: {
            plan,
            amount,
            reference: response.reference,
            firstName: form.firstName,
          },
        });
      },
      onClose: async () => {
        // Mark order as failed
        await supabase
          .from("starter_pack_orders")
          .update({ payment_status: "failed" })
          .eq("id", orderId);

        setLoading(false);
        navigate("/payment-failed");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-8">
              Checkout
            </h1>

            {/* Order summary — read-only */}
            <div className="rounded-xl border border-border overflow-hidden mb-8">
              <div className="flex justify-between items-center px-5 py-4 bg-muted/30">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="font-semibold text-foreground text-sm text-right max-w-[220px]">
                  {plan}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-heading text-2xl font-bold text-primary">
                  {fmt(amount)}
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5 mb-6">
              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={set("firstName")}
                    className={`text-base sm:text-sm ${errors.firstName ? "border-destructive" : ""}`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={set("lastName")}
                    className={`text-base sm:text-sm ${errors.lastName ? "border-destructive" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@email.com"
                  value={form.email}
                  onChange={set("email")}
                  className={`text-base sm:text-sm ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Your receipt and download link will be sent here.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={set("phone")}
                  className={`text-base sm:text-sm ${errors.phone ? "border-destructive" : ""}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6">
              <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                You will not leave this page. Payment is processed securely via Paystack.
              </p>
            </div>

            {/* CTA */}
            <Button
              variant="brand"
              size="lg"
              className="w-full"
              onClick={handlePayment}
              disabled={loading}
            >
              <ShieldCheck className="h-4 w-4" />
              {loading ? "Processing…" : `Confirm and Pay ${fmt(amount)}`}
            </Button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              ← Go back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
