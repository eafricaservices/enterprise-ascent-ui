// ─────────────────────────────────────────────────────────────────────────────
//  Supabase Edge Function: parse-and-score-cv
//
//  Triggered by the client immediately after a successful talent_applications
//  insert. Parses the uploaded CV (PDF / DOCX), scores it against the
//  profession-specific rubric via Grok, and writes results back to the row.
//
//  Required environment variables (set via `supabase secrets set`):
//    SUPABASE_URL              — set automatically by Supabase runtime
//    SUPABASE_SERVICE_ROLE_KEY — set automatically by Supabase runtime
//    GROK_API_KEY              — xAI API key (x.ai dashboard)
//
//  Local dev:
//    supabase functions serve parse-and-score-cv --env-file supabase/.env.local
//    curl -X POST http://localhost:54321/functions/v1/parse-and-score-cv \
//         -H "Content-Type: application/json" \
//         -d '{"application_id":"<uuid>"}'
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import mammoth from "mammoth";
import { getRubric, type Rubric } from "./rubrics.ts";

// ── Email helper (Resend) ─────────────────────────────────────────────────────

async function sendScoreEmail(opts: {
  to: string;
  applicantName: string;
  role: string;
  overallScore: number;
  summary: string;
  breakdown: ScoreBreakdown;
  resendApiKey: string;
}): Promise<void> {
  const {
    to,
    applicantName,
    role,
    overallScore,
    summary,
    breakdown,
    resendApiKey,
  } = opts;

  const scoreColour = overallScore >= 90
    ? "#16a34a" // green
    : overallScore >= 70
    ? "#2563eb" // blue
    : overallScore >= 50
    ? "#d97706" // amber
    : "#dc2626"; // red

  const scoreLabel = overallScore >= 90
    ? "Exceptional"
    : overallScore >= 70
    ? "Good fit"
    : overallScore >= 50
    ? "Moderate fit"
    : "Needs development";

  const categoryRow = (
    label: string,
    cat: { score: number; rationale: string },
  ) =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-weight:500">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:center">
        <span style="background:${
      cat.score >= 70 ? "#dcfce7" : cat.score >= 50 ? "#fef9c3" : "#fee2e2"
    };
               color:${
      cat.score >= 70 ? "#166534" : cat.score >= 50 ? "#713f12" : "#991b1b"
    };
               padding:2px 10px;border-radius:9999px;font-weight:700">${cat.score}/100</span>
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:14px">${cat.rationale}</td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:32px 40px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700">E-Africa Services</h1>
            <p style="margin:6px 0 0;color:#94a3b8;font-size:14px">Talent Pool — CV Assessment Report</p>
          </td>
        </tr>
        <!-- Greeting -->
        <tr>
          <td style="padding:32px 40px 0">
            <p style="margin:0;font-size:16px;color:#374151">Hi <strong>${applicantName}</strong>,</p>
            <p style="margin:12px 0 0;font-size:15px;color:#6b7280;line-height:1.6">
              Thank you for applying to join our talent pool as a <strong>${role}</strong>.
              Our AI-powered system has completed its initial review of your application.
            </p>
          </td>
        </tr>
        <!-- Score badge -->
        <tr>
          <td style="padding:28px 40px">
            <table width="100%" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0">
              <tr>
                <td style="padding:24px;text-align:center">
                  <div style="display:inline-block;background:${scoreColour};color:#fff;font-size:48px;font-weight:800;width:96px;height:96px;line-height:96px;border-radius:50%;text-align:center;margin:0 auto">${overallScore}</div>
                  <p style="margin:12px 0 0;font-size:18px;font-weight:700;color:#1e293b">${scoreLabel}</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#64748b">Overall fit score for <em>${role}</em></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Summary -->
        <tr>
          <td style="padding:0 40px 24px">
            <h2 style="margin:0 0 10px;font-size:16px;color:#1e293b">Reviewer Summary</h2>
            <p style="margin:0;font-size:15px;color:#475569;line-height:1.7;background:#f1f5f9;padding:16px;border-left:4px solid #6366f1;border-radius:4px">${summary}</p>
          </td>
        </tr>
        <!-- Breakdown table -->
        <tr>
          <td style="padding:0 40px 32px">
            <h2 style="margin:0 0 12px;font-size:16px;color:#1e293b">Score Breakdown</h2>
            <table width="100%" style="border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
              <thead>
                <tr style="background:#f8fafc">
                  <th style="padding:10px 12px;text-align:left;font-size:13px;color:#94a3b8;font-weight:600;border-bottom:1px solid #e2e8f0">Category</th>
                  <th style="padding:10px 12px;text-align:center;font-size:13px;color:#94a3b8;font-weight:600;border-bottom:1px solid #e2e8f0">Score</th>
                  <th style="padding:10px 12px;text-align:left;font-size:13px;color:#94a3b8;font-weight:600;border-bottom:1px solid #e2e8f0">Feedback</th>
                </tr>
              </thead>
              <tbody>
                ${categoryRow("Skills Match", breakdown.skills_match)}
                ${categoryRow("Experience Fit", breakdown.experience_fit)}
                ${
    categoryRow("Education Relevance", breakdown.education_relevance)
  }
                ${
    categoryRow("Communication Quality", breakdown.communication_quality)
  }
              </tbody>
            </table>
          </td>
        </tr>
        <!-- Next steps -->
        <tr>
          <td style="padding:0 40px 32px">
            <h2 style="margin:0 0 10px;font-size:16px;color:#1e293b">What happens next?</h2>
            <ol style="margin:0;padding-left:20px;color:#475569;font-size:15px;line-height:1.8">
              <li>Our recruiters will review your full profile manually.</li>
              <li>If shortlisted, we'll reach out to schedule an interview.</li>
              <li>Successful candidates are added to our active talent pool and matched with client opportunities.</li>
            </ol>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center">
            <p style="margin:0;font-size:13px;color:#94a3b8">© ${
    new Date().getFullYear()
  } E-Africa Services · This is an automated assessment email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "E-Africa Services <talent@eafricaservices.com>",
      to: [to],
      subject: `Your CV Assessment Results — ${role} (${overallScore}/100)`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.warn(`[email] Resend delivery failed (${res.status}): ${body}`);
    // Don't throw — email failure must not fail the scoring job
  } else {
    console.log(`[email] Score email sent to ${to}`);
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface RequestBody {
  application_id: string;
}

interface CategoryScore {
  score: number;
  rationale: string;
}

interface ScoreBreakdown {
  skills_match: CategoryScore;
  experience_fit: CategoryScore;
  education_relevance: CategoryScore;
  communication_quality: CategoryScore;
}

interface GrokScoreResponse {
  overall_score: number;
  breakdown: ScoreBreakdown;
  summary: string;
}

interface ApplicationRow {
  id: string;
  full_name: string;
  email: string;
  role_applied_for: string;
  years_experience: number | null;
  skills: string[] | null;
  languages: string[] | null;
  cv_storage_path: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Extracts plain text from a PDF ArrayBuffer using a manual cross-reference
 * stream parser that is safe to run inside Deno without Node.js test fixtures.
 * For production-quality extraction we use the pdf-parse npm package via
 * Deno's npm: specifier with the Buffer shim.
 */
async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  try {
    // Dynamically import to avoid top-level CJS issues with pdf-parse in Deno
    const pdfParse = (await import("pdf-parse")).default;
    const uint8 = new Uint8Array(buffer);
    const data = await pdfParse(uint8);
    return data.text?.trim() ?? "";
  } catch {
    // Fallback: attempt a naive text extraction for simple PDFs
    const decoder = new TextDecoder("utf-8", { fatal: false });
    const raw = decoder.decode(buffer);
    // Extract text between BT and ET markers (basic PDF text blocks)
    const chunks: string[] = [];
    const btEtRegex = /BT([\s\S]*?)ET/g;
    let m: RegExpExecArray | null;
    while ((m = btEtRegex.exec(raw)) !== null) {
      const block = m[1];
      // Find all parenthesised strings: (text)
      const parenRegex = /\(([^)]*)\)/g;
      let p: RegExpExecArray | null;
      while ((p = parenRegex.exec(block)) !== null) {
        chunks.push(p[1]);
      }
    }
    return chunks.join(" ").trim();
  }
}

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value?.trim() ?? "";
}

/**
 * Derives a seniority label from years of experience using the rubric ladder.
 */
function getSeniorityLabel(
  years: number | null,
  rubric: Rubric,
): string {
  if (years === null) return "Unknown seniority";
  for (const tier of [...rubric.seniorityLadder].reverse()) {
    if (years >= tier.yearsMin) return tier.label;
  }
  return rubric.seniorityLadder[0].label;
}

/**
 * Clamps a number to [0, 100] and rounds to nearest integer.
 */
function clampScore(n: unknown): number {
  const num = typeof n === "number" ? n : Number(n);
  if (!isFinite(num)) return 0;
  return Math.round(Math.max(0, Math.min(100, num)));
}

/**
 * Validates and normalises the raw JSON returned by Grok into our schema.
 */
function normaliseScoreResponse(raw: unknown): GrokScoreResponse {
  if (!raw || typeof raw !== "object") {
    throw new Error("Empty response from AI");
  }
  const r = raw as Record<string, unknown>;

  const bd = (r.breakdown ?? {}) as Record<string, unknown>;
  const cat = (key: string): CategoryScore => {
    const c = (bd[key] ?? {}) as Record<string, unknown>;
    return {
      score: clampScore(c.score),
      rationale: String(c.rationale ?? "").slice(0, 500),
    };
  };

  return {
    overall_score: clampScore(r.overall_score),
    breakdown: {
      skills_match: cat("skills_match"),
      experience_fit: cat("experience_fit"),
      education_relevance: cat("education_relevance"),
      communication_quality: cat("communication_quality"),
    },
    summary: String(r.summary ?? "").slice(0, 1000),
  };
}

// ── System prompt builder ─────────────────────────────────────────────────────

function buildSystemPrompt(rubric: Rubric): string {
  return `You are an expert talent recruiter and CV analyser. You score CVs for the role of "${rubric.title}".

Role description:
${rubric.description}

Core skills required:
${rubric.coreSkills.map((s) => `- ${s}`).join("\n")}

Nice-to-have skills:
${rubric.niceToHave.map((s) => `- ${s}`).join("\n")}

Green flags (positive indicators):
${rubric.greenFlags.map((s) => `+ ${s}`).join("\n")}

Red flags (negative indicators):
${rubric.redFlags.map((s) => `! ${s}`).join("\n")}

Scoring instructions:
You must respond with ONLY a valid JSON object — no markdown, no prose outside the JSON.
The JSON must match this exact schema:
{
  "overall_score": <integer 0-100>,
  "breakdown": {
    "skills_match":          { "score": <integer 0-100>, "rationale": "<1-2 sentences>" },
    "experience_fit":        { "score": <integer 0-100>, "rationale": "<1-2 sentences>" },
    "education_relevance":   { "score": <integer 0-100>, "rationale": "<1-2 sentences>" },
    "communication_quality": { "score": <integer 0-100>, "rationale": "<1-2 sentences>" }
  },
  "summary": "<2-3 sentence human-readable candidate summary for an internal recruiter>"
}

Scoring guidelines:
- overall_score is your holistic 0-100 assessment of fit for this role
- 90-100: Exceptional candidate, strong immediate placement potential
- 70-89:  Good candidate, minor gaps
- 50-69:  Moderate fit, notable gaps but trainable
- 30-49:  Weak fit, significant gaps
- 0-29:   Poor fit for this specific role
- If no CV text is provided, score based on the form fields only and note this in the summary
- If any scoring criterion cannot be assessed due to missing information, score it at 50 with appropriate rationale
- Be fair, constructive, and consistent`;
}

function buildUserMessage(
  app: ApplicationRow,
  cvText: string,
  rubric: Rubric,
): string {
  const seniorityLabel = getSeniorityLabel(app.years_experience, rubric);
  const formSnapshot = [
    `Applicant name: ${app.full_name}`,
    `Role applied for: ${app.role_applied_for}`,
    `Years of experience: ${app.years_experience ?? "Not specified"}`,
    `Seniority implied by years: ${seniorityLabel}`,
    `Skills listed in form: ${app.skills?.join(", ") || "None listed"}`,
    `Languages: ${app.languages?.join(", ") || "Not specified"}`,
  ].join("\n");

  const cvSection = cvText
    ? `\n\n--- CV / RESUME TEXT (extracted) ---\n${cvText.slice(0, 12000)}`
    : "\n\n--- CV / RESUME TEXT ---\n[No CV was uploaded. Score based on form fields only.]";

  return `${formSnapshot}${cvSection}`;
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, x-client-info, apikey",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Parse request body ──────────────────────────────────────────────────────
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { application_id } = body;
  if (!application_id || typeof application_id !== "string") {
    return new Response(
      JSON.stringify({ error: "application_id is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // ── Initialise Supabase service-role client ─────────────────────────────────
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const grokApiKey = Deno.env.get("GROK_API_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!grokApiKey) {
    console.error("GROK_API_KEY environment variable is not set");
    return new Response(
      JSON.stringify({ error: "AI service is not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // ── Mark as processing immediately ─────────────────────────────────────────
  await supabase
    .from("talent_applications")
    .update({ cv_score_status: "processing" })
    .eq("id", application_id);

  try {
    // ── Fetch application row ─────────────────────────────────────────────────
    const { data: app, error: fetchError } = await supabase
      .from("talent_applications")
      .select(
        "id, full_name, email, role_applied_for, years_experience, skills, languages, cv_storage_path",
      )
      .eq("id", application_id)
      .single<ApplicationRow>();

    if (fetchError || !app) {
      throw new Error(
        `Application not found: ${fetchError?.message ?? "unknown error"}`,
      );
    }

    // ── Extract CV text ───────────────────────────────────────────────────────
    let cvText = "";
    let hasNoCv = false;

    if (app.cv_storage_path) {
      const { data: fileBlob, error: downloadError } = await supabase.storage
        .from("talent-cvs")
        .download(app.cv_storage_path);

      if (downloadError || !fileBlob) {
        console.warn(
          `CV download failed for ${application_id}: ${downloadError?.message}`,
        );
        // Don't throw — proceed with form-field-only scoring
      } else {
        const buffer = await fileBlob.arrayBuffer();
        const lowerPath = app.cv_storage_path.toLowerCase();

        try {
          if (lowerPath.endsWith(".pdf")) {
            cvText = await extractPdfText(buffer);
          } else if (
            lowerPath.endsWith(".docx") ||
            lowerPath.endsWith(".doc")
          ) {
            cvText = await extractDocxText(buffer);
          }
        } catch (extractErr) {
          console.warn(
            `Text extraction failed for ${application_id}: ${extractErr}`,
          );
          // Proceed with empty cvText — Grok will score on form fields only
        }
      }
    } else {
      hasNoCv = true;
    }

    // If no CV was provided at all, use a lightweight status
    if (hasNoCv && !cvText) {
      // Still score using form fields — mark accordingly
    }

    // ── Get rubric for profession ─────────────────────────────────────────────
    const rubric = getRubric(app.role_applied_for);

    // ── Build Grok prompt ─────────────────────────────────────────────────────
    const systemPrompt = buildSystemPrompt(rubric);
    const userMessage = buildUserMessage(app, cvText, rubric);

    // ── Call xAI Grok API ─────────────────────────────────────────────────────
    const grokResponse = await fetch(
      "https://api.x.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${grokApiKey}`,
        },
        body: JSON.stringify({
          model: "grok-3",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.2, // low temperature for consistent, structured scoring
          max_tokens: 1024,
          response_format: { type: "json_object" },
        }),
        signal: AbortSignal.timeout(60_000), // 60-second AI timeout
      },
    );

    if (!grokResponse.ok) {
      const errText = await grokResponse.text();
      throw new Error(`Grok API error ${grokResponse.status}: ${errText}`);
    }

    const grokJson = await grokResponse.json();
    const rawContent = grokJson?.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("Empty response from Grok API");
    }

    // Parse the JSON string returned in the message content
    let parsedScore: GrokScoreResponse;
    try {
      parsedScore = normaliseScoreResponse(JSON.parse(rawContent));
    } catch (parseErr) {
      throw new Error(`Failed to parse AI response: ${parseErr}`);
    }

    // ── Write results back to DB ──────────────────────────────────────────────
    const { error: updateError } = await supabase
      .from("talent_applications")
      .update({
        cv_score_status: hasNoCv && !cvText ? "no_cv" : "completed",
        cv_score: parsedScore.overall_score,
        cv_score_breakdown: parsedScore.breakdown,
        cv_ai_summary: parsedScore.summary,
        cv_parsed_at: new Date().toISOString(),
      })
      .eq("id", application_id);

    if (updateError) {
      throw new Error(`DB update failed: ${updateError.message}`);
    }

    console.log(
      `CV scored for ${application_id}: overall=${parsedScore.overall_score}`,
    );

    // ── Send score email to applicant ─────────────────────────────────────────
    if (resendApiKey) {
      await sendScoreEmail({
        to: app.email,
        applicantName: app.full_name,
        role: app.role_applied_for,
        overallScore: parsedScore.overall_score,
        summary: parsedScore.summary,
        breakdown: parsedScore.breakdown,
        resendApiKey,
      });
    } else {
      console.warn("[email] RESEND_API_KEY not set — skipping score email");
    }

    return new Response(
      JSON.stringify({
        success: true,
        application_id,
        overall_score: parsedScore.overall_score,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (err) {
    console.error(`CV scoring failed for ${application_id}:`, err);

    // Mark as failed in DB so the admin knows it needs manual review
    await supabase
      .from("talent_applications")
      .update({ cv_score_status: "failed" })
      .eq("id", application_id);

    return new Response(
      JSON.stringify({
        error: "CV scoring failed",
        detail: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
});
