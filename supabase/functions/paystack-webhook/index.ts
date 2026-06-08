import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Verify Paystack HMAC-SHA512 signature
async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const computed = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return computed === signature;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const signature = req.headers.get("x-paystack-signature") ?? "";
  const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";

  const rawBody = await req.text();

  const valid = await verifySignature(rawBody, signature, paystackSecret);
  if (!valid) {
    console.error("paystack-webhook: invalid signature");
    return new Response("Unauthorized", { status: 401 });
  }

  let event: { event: string; data: { customer?: { email?: string } } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Only handle charge.success
  if (event.event !== "charge.success") {
    return new Response("OK", { status: 200 });
  }

  const email = event.data?.customer?.email?.toLowerCase();
  if (!email) {
    console.warn("paystack-webhook: charge.success missing customer.email");
    return new Response("OK", { status: 200 });
  }

  // Use the service-role key — bypasses RLS
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // Idempotent update: only touch rows that aren't already paid
  const { error } = await supabase
    .from("leads")
    .update({ paid: true, status: "customer" })
    .eq("email", email)
    .eq("paid", false);

  if (error) {
    console.error("paystack-webhook: supabase update error:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
});
