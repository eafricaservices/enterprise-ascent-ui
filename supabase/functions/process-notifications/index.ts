import { createClient } from "@supabase/supabase-js";

// Simple Supabase Edge Function to process admin_notifications and send emails
// Uses SendGrid HTTP API. Set SENDGRID_API_KEY and SUPABASE_SERVICE_ROLE_KEY via
// `supabase secrets set` in your project. Optionally set ADMIN_EMAIL to the
// fallback recipient (defaults to eafrica.ng@gmail.com).

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "eafrica.ng@gmail.com";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function sendEmail(to: string, subject: string, html: string) {
  if (!SENDGRID_API_KEY) throw new Error("SENDGRID_API_KEY not set");

  const payload = {
    personalizations: [
      {
        to: [
          {
            email: to,
          },
        ],
      },
    ],
    from: {
      email: "no-reply@eafricaservices.com",
      name: "E-Africa Services",
    },
    subject,
    content: [
      {
        type: "text/html",
        value: html,
      },
    ],
  };

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SendGrid API error ${res.status}: ${body}`);
  }

  return true;
}

function buildHtml(row: any) {
  const metadata = JSON.stringify(row.metadata ?? {}, null, 2);
  return `
    <p>${escapeHtml(String(row.message ?? ""))}</p>
    <pre style="background:#f6f8fa;padding:12px;border-radius:6px">${escapeHtml(metadata)}</pre>
    <p><small>ID: ${row.id}</small></p>
  `;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Pull a small batch of pending notifications
    const { data: rows, error } = await supabase
      .from("admin_notifications")
      .select("id, type, title, message, metadata, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(20);

    if (error) throw error;
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    let processed = 0;

    for (const row of rows) {
      const id: string = row.id;
      const to = (row.metadata && row.metadata.email) || ADMIN_EMAIL;
      const subject = row.title || "Notification";
      const html = buildHtml(row);

      try {
        await sendEmail(to, subject, html);
        await supabase
          .from("admin_notifications")
          .update({ status: "sent", processed_at: new Date().toISOString() })
          .eq("id", id);
        processed++;
      } catch (sendErr) {
        console.error("send failed for id", id, sendErr);
        await supabase
          .from("admin_notifications")
          .update({ status: "failed", processed_at: new Date().toISOString(), metadata: { ...(row.metadata ?? {}), send_error: String(sendErr) } })
          .eq("id", id);
      }
    }

    return new Response(JSON.stringify({ processed }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("process-notifications failed:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
