// @ts-nocheck
// ─────────────────────────────────────────────────────────────────────────────
//  SINGLE-FILE VERSION — paste this into Supabase Dashboard Edge Function editor
//  Dashboard: https://supabase.com/dashboard/project/aoemhptqreyrbkpwmtan/functions
//  All rubrics and helpers are inlined; no relative imports needed.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Rubric types & data ───────────────────────────────────────────────────────

interface Rubric {
  title: string;
  description: string;
  coreSkills: string[];
  niceToHave: string[];
  redFlags: string[];
  greenFlags: string[];
  seniorityLadder: { label: string; yearsMin: number; yearsMax: number }[];
}

const RUBRICS: Record<string, Rubric> = {
  "Customer Success Manager": {
    title: "Customer Success Manager",
    description:
      "Responsible for retaining clients, driving product adoption, and acting as the primary relationship owner post-sale.",
    coreSkills: [
      "Client relationship management",
      "Churn prevention / retention strategies",
      "Onboarding and training customers",
      "CRM software (Salesforce, HubSpot, Gainsight)",
      "Data-driven account health monitoring",
      "Cross-functional collaboration (Sales, Product, Support)",
      "Clear business communication",
    ],
    niceToHave: [
      "SaaS or B2B experience",
      "NPS / CSAT analysis",
      "Renewal and upsell experience",
      "Project management background",
    ],
    redFlags: [
      "No mention of client-facing experience",
      "Only inbound support experience (no proactive success work)",
      "No measurable outcomes (retention rates, NPS scores)",
    ],
    greenFlags: [
      "Quantified retention or upsell achievements",
      "Named CRM tools",
      "Evidence of consultative communication style",
    ],
    seniorityLadder: [{ label: "Junior CSM", yearsMin: 0, yearsMax: 2 }, {
      label: "CSM",
      yearsMin: 2,
      yearsMax: 5,
    }, { label: "Senior CSM", yearsMin: 5, yearsMax: 50 }],
  },
  "Virtual Assistant": {
    title: "Virtual Assistant",
    description:
      "Provides remote administrative, organisational, and operational support to individuals or businesses.",
    coreSkills: [
      "Email and calendar management",
      "Data entry and document preparation",
      "Remote communication etiquette",
      "Microsoft Office / Google Workspace",
      "Task and project coordination",
      "Scheduling and travel arrangement",
    ],
    niceToHave: [
      "Social media management",
      "Basic bookkeeping",
      "CRM data entry (HubSpot, Zoho)",
      "Transcription or research skills",
      "Canva / light design work",
    ],
    redFlags: [
      "No evidence of organisational tools usage",
      "Gaps in employment with no explanation",
      "Poor written communication in CV itself",
    ],
    greenFlags: [
      "Handles multiple concurrent executives or clients",
      "Proactive tone and initiative in descriptions",
      "Mentions confidentiality / discretion",
    ],
    seniorityLadder: [{ label: "Entry-level VA", yearsMin: 0, yearsMax: 1 }, {
      label: "VA",
      yearsMin: 1,
      yearsMax: 4,
    }, { label: "Senior VA / EA", yearsMin: 4, yearsMax: 50 }],
  },
  "Data Entry Specialist": {
    title: "Data Entry Specialist",
    description:
      "Accurately inputs, updates, and maintains data across systems, spreadsheets, and databases.",
    coreSkills: [
      "Typing speed and accuracy (min 40 WPM)",
      "Microsoft Excel / Google Sheets (formulas, VLOOKUP, pivot tables)",
      "Attention to detail and data validation",
      "Database software (MS Access, SQL basics)",
      "Document management",
    ],
    niceToHave: [
      "OCR software",
      "Basic SQL queries",
      "ERP system experience (SAP, Oracle)",
      "CRM data entry",
    ],
    redFlags: [
      "Spelling errors throughout the CV",
      "No mention of data accuracy or quality control",
      "Only general admin experience with no data focus",
    ],
    greenFlags: [
      "Stated accuracy rates or error-free records",
      "Named specific tools with proficiency levels",
      "High-volume data processing mentioned",
    ],
    seniorityLadder: [
      { label: "Junior Specialist", yearsMin: 0, yearsMax: 2 },
      { label: "Data Entry Specialist", yearsMin: 2, yearsMax: 5 },
      { label: "Senior Specialist", yearsMin: 5, yearsMax: 50 },
    ],
  },
  "Bookkeeper / Accountant": {
    title: "Bookkeeper / Accountant",
    description:
      "Manages financial records, reconciliations, payroll, and reporting for organisations.",
    coreSkills: [
      "Double-entry bookkeeping",
      "Accounts payable / receivable",
      "Bank and ledger reconciliation",
      "Payroll processing",
      "Financial reporting (P&L, balance sheet)",
      "Accounting software (QuickBooks, Xero, Sage, Wave)",
      "Tax compliance basics",
    ],
    niceToHave: [
      "ACCA / ICAN / CPA certification or in progress",
      "Audit support experience",
      "Multi-currency transactions",
      "ERP systems (SAP, Oracle Financials)",
    ],
    redFlags: [
      "No accounting software mentioned",
      "No reconciliation or reporting experience",
      "Unverifiable certifications",
    ],
    greenFlags: [
      "Professional accounting certification",
      "Named accounting software with version/proficiency",
      "Experience managing books for multiple clients simultaneously",
    ],
    seniorityLadder: [
      { label: "Junior Bookkeeper", yearsMin: 0, yearsMax: 2 },
      { label: "Bookkeeper / Junior Accountant", yearsMin: 2, yearsMax: 5 },
      { label: "Senior Accountant", yearsMin: 5, yearsMax: 50 },
    ],
  },
  "Software Developer": {
    title: "Software Developer",
    description:
      "Designs, builds, and maintains software applications across web, mobile, or backend platforms.",
    coreSkills: [
      "Proficiency in at least one programming language (JavaScript/TypeScript, Python, Java, Go, etc.)",
      "Version control (Git/GitHub/GitLab)",
      "REST API design or consumption",
      "Debugging and problem-solving",
      "Understanding of software development lifecycle (SDLC)",
      "Code review and collaboration",
    ],
    niceToHave: [
      "Cloud services (AWS, GCP, Azure)",
      "CI/CD pipelines",
      "Testing frameworks (Jest, PyTest, etc.)",
      "Agile / Scrum experience",
      "Open-source contributions",
      "System design knowledge",
    ],
    redFlags: [
      "Only non-technical roles listed with dev title",
      "No mention of any specific language or framework",
      "Claims senior experience but no shipped projects or portfolio",
    ],
    greenFlags: [
      "GitHub profile or live project links",
      "Specific frameworks and versions mentioned",
      "Measurable impact (performance improvements, reduced bug rates)",
    ],
    seniorityLadder: [{ label: "Junior Developer", yearsMin: 0, yearsMax: 2 }, {
      label: "Mid-level Developer",
      yearsMin: 2,
      yearsMax: 5,
    }, { label: "Senior Developer", yearsMin: 5, yearsMax: 50 }],
  },
  "Graphic Designer": {
    title: "Graphic Designer",
    description:
      "Creates visual content for digital and print media — branding, marketing materials, social assets, and UI.",
    coreSkills: [
      "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Figma or Sketch (UI/digital design)",
      "Typography and layout principles",
      "Brand identity design",
      "File format and colour mode knowledge (RGB/CMYK/SVG)",
    ],
    niceToHave: [
      "Motion graphics (After Effects, Lottie)",
      "Video editing (Premiere Pro)",
      "Social media graphic templates (Canva Pro)",
      "UX/UI design exposure",
      "Photography or photo retouching",
    ],
    redFlags: [
      "No portfolio link or samples mentioned",
      "Only Canva listed with no professional tools",
      "No evidence of client or production work",
    ],
    greenFlags: [
      "Portfolio URL included",
      "Named brand clients or campaigns",
      "Proficiency in both print and digital",
    ],
    seniorityLadder: [{ label: "Junior Designer", yearsMin: 0, yearsMax: 2 }, {
      label: "Graphic Designer",
      yearsMin: 2,
      yearsMax: 5,
    }, { label: "Senior / Lead Designer", yearsMin: 5, yearsMax: 50 }],
  },
  "Content Writer": {
    title: "Content Writer",
    description:
      "Produces written content — blogs, web copy, social media, whitepapers, email campaigns — aligned with brand voice and SEO strategy.",
    coreSkills: [
      "Strong written English grammar and style",
      "SEO fundamentals (keyword integration, meta descriptions)",
      "Long-form and short-form content production",
      "Research and fact-checking",
      "Content management systems (WordPress, Webflow, Ghost)",
    ],
    niceToHave: [
      "SurferSEO / Clearscope / Semrush experience",
      "Email marketing copy (Mailchimp, Klaviyo)",
      "Scriptwriting or video content",
      "Social media copywriting",
      "Editing and proofreading other writers' work",
    ],
    redFlags: [
      "CV contains grammar/spelling errors",
      "Only social media captions listed as writing experience",
      "No portfolio or published links",
    ],
    greenFlags: [
      "Links to published articles or portfolio",
      "Named content niches (tech, finance, health, etc.)",
      "Measurable outcomes (traffic growth, conversion rates)",
    ],
    seniorityLadder: [{ label: "Junior Writer", yearsMin: 0, yearsMax: 2 }, {
      label: "Content Writer",
      yearsMin: 2,
      yearsMax: 5,
    }, {
      label: "Senior Writer / Content Strategist",
      yearsMin: 5,
      yearsMax: 50,
    }],
  },
  "Digital Marketing Specialist": {
    title: "Digital Marketing Specialist",
    description:
      "Plans and executes digital marketing campaigns across SEO, paid media, email, and social channels to drive awareness and conversions.",
    coreSkills: [
      "SEO / SEM strategy",
      "Google Ads and Meta Ads management",
      "Email marketing automation",
      "Analytics and reporting (Google Analytics, GA4, Looker Studio)",
      "Social media management",
      "A/B testing and CRO",
    ],
    niceToHave: [
      "Marketing automation platforms (HubSpot, Marketo, ActiveCampaign)",
      "Affiliate or influencer marketing",
      "Content strategy",
      "LinkedIn ads",
      "Data studio / BI dashboards",
    ],
    redFlags: [
      "Only organic social media posting listed",
      "No mention of paid channels or analytics tools",
      "No quantified campaign results",
    ],
    greenFlags: [
      "ROI / ROAS figures cited",
      "Google Ads or Meta Ads certifications",
      "Multi-channel campaign management experience",
    ],
    seniorityLadder: [{ label: "Junior Marketer", yearsMin: 0, yearsMax: 2 }, {
      label: "Digital Marketing Specialist",
      yearsMin: 2,
      yearsMax: 5,
    }, { label: "Senior / Head of Digital", yearsMin: 5, yearsMax: 50 }],
  },
  "Project Manager": {
    title: "Project Manager",
    description:
      "Leads cross-functional teams to deliver projects on time, within scope and budget, using structured methodologies.",
    coreSkills: [
      "Project lifecycle management (initiation → closure)",
      "Scope, schedule, budget control",
      "Stakeholder communication and reporting",
      "Risk identification and mitigation",
      "Project management tools (Asana, Jira, Monday.com, MS Project)",
      "Agile and/or Waterfall methodology",
    ],
    niceToHave: [
      "PMP, PRINCE2, or Scrum Master certification",
      "Change management",
      "Resource planning",
      "Programme-level management",
      "Budget ownership over significant sums",
    ],
    redFlags: [
      "Only team lead roles with no formal delivery responsibility",
      "No tools mentioned",
      "No measurable delivery outcomes",
    ],
    greenFlags: [
      "PM certification (PMP, PRINCE2, Agile)",
      "Delivered multi-team projects on time/under budget",
      "Budget ownership figures cited",
    ],
    seniorityLadder: [
      { label: "Junior PM / Coordinator", yearsMin: 0, yearsMax: 2 },
      { label: "Project Manager", yearsMin: 2, yearsMax: 6 },
      { label: "Senior PM / Programme Manager", yearsMin: 6, yearsMax: 50 },
    ],
  },
  "HR / Recruiter": {
    title: "HR / Recruiter",
    description:
      "Manages talent acquisition, employee lifecycle, HR operations, and/or people strategy.",
    coreSkills: [
      "Full-cycle recruitment (sourcing, screening, interviewing, offer)",
      "Applicant Tracking Systems (Greenhouse, Lever, Workday)",
      "Onboarding and offboarding",
      "Employment law basics",
      "HR information systems (HRIS)",
      "Employee relations and grievance handling",
    ],
    niceToHave: [
      "CIPD / SHRM / PHRI certification",
      "Compensation and benefits administration",
      "Learning & Development",
      "HR analytics",
      "Employer branding",
    ],
    redFlags: [
      "No ATS or HRIS tool mentioned",
      "Only admin role framed as HR",
      "No metrics on time-to-hire or retention",
    ],
    greenFlags: [
      "HR certification",
      "Volume hiring metrics (e.g. 50+ hires per quarter)",
      "Cross-border or remote hiring experience",
    ],
    seniorityLadder: [
      { label: "HR Assistant / Junior Recruiter", yearsMin: 0, yearsMax: 2 },
      { label: "HR Generalist / Recruiter", yearsMin: 2, yearsMax: 6 },
      { label: "Senior HR / Head of People", yearsMin: 6, yearsMax: 50 },
    ],
  },
  "Sales Representative": {
    title: "Sales Representative",
    description:
      "Generates revenue by identifying prospects, managing the sales pipeline, and closing deals in B2B or B2C environments.",
    coreSkills: [
      "Prospecting and lead generation",
      "Sales pipeline management",
      "Discovery calls and demos",
      "Objection handling and negotiation",
      "CRM usage (Salesforce, HubSpot, Pipedrive)",
      "Closing techniques",
    ],
    niceToHave: [
      "Outbound cold-calling / email sequences",
      "SaaS or technology sales",
      "Account management / upselling",
      "Sales forecasting",
      "Channel or partner sales",
    ],
    redFlags: [
      "No quantified revenue or quota figures",
      "Only retail or cashier experience",
      "No CRM mentioned",
    ],
    greenFlags: [
      "Consistent quota attainment (e.g. 120% of target)",
      "Named deal sizes or ARR contribution",
      "Experience across full sales cycle in B2B",
    ],
    seniorityLadder: [
      { label: "SDR / Entry-level Sales", yearsMin: 0, yearsMax: 2 },
      { label: "Account Executive / Sales Rep", yearsMin: 2, yearsMax: 5 },
      { label: "Senior AE / Sales Lead", yearsMin: 5, yearsMax: 50 },
    ],
  },
  Others: {
    title: "General Professional",
    description:
      "Evaluated as a general professional candidate. Scoring focuses on transferable skills, work quality, and overall suitability for remote contract work.",
    coreSkills: [
      "Clear articulation of role and responsibilities",
      "Professional communication style",
      "Problem-solving and initiative",
      "Remote / independent work capability",
      "Relevant domain expertise for stated role",
    ],
    niceToHave: [
      "Industry-recognised certifications",
      "Quantified achievements",
      "Experience with async collaboration tools",
    ],
    redFlags: [
      "Unclear or inconsistent role history",
      "No concrete outcomes or responsibilities described",
      "Multiple unexplained employment gaps",
    ],
    greenFlags: [
      "Clear career narrative",
      "Evidence of self-direction and accountability",
      "Strong communication demonstrated by CV quality",
    ],
    seniorityLadder: [{ label: "Junior", yearsMin: 0, yearsMax: 2 }, {
      label: "Mid-level",
      yearsMin: 2,
      yearsMax: 6,
    }, { label: "Senior", yearsMin: 6, yearsMax: 50 }],
  },
};

function getRubric(profession: string): Rubric {
  return RUBRICS[profession] ?? RUBRICS["Others"];
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

// ── Email helper ──────────────────────────────────────────────────────────────

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
    ? "#16a34a"
    : overallScore >= 70
    ? "#2563eb"
    : overallScore >= 50
    ? "#d97706"
    : "#dc2626";
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
    };color:${
      cat.score >= 70 ? "#166534" : cat.score >= 50 ? "#713f12" : "#991b1b"
    };padding:2px 10px;border-radius:9999px;font-weight:700">${cat.score}/100</span>
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:14px">${cat.rationale}</td>
    </tr>`;
  const html =
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 0"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
      <tr><td style="background:#0f172a;padding:32px 40px;text-align:center">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">E-Africa Services</h1>
        <p style="margin:6px 0 0;color:#94a3b8;font-size:14px">Talent Pool — CV Assessment Report</p>
      </td></tr>
      <tr><td style="padding:32px 40px 0">
        <p style="margin:0;font-size:16px;color:#374151">Hi <strong>${applicantName}</strong>,</p>
        <p style="margin:12px 0 0;font-size:15px;color:#6b7280;line-height:1.6">Thank you for applying to join our talent pool as a <strong>${role}</strong>. Our AI-powered system has completed its initial review of your application.</p>
      </td></tr>
      <tr><td style="padding:28px 40px">
        <table width="100%" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0"><tr><td style="padding:24px;text-align:center">
          <div style="display:inline-block;background:${scoreColour};color:#fff;font-size:48px;font-weight:800;width:96px;height:96px;line-height:96px;border-radius:50%;text-align:center">${overallScore}</div>
          <p style="margin:12px 0 0;font-size:18px;font-weight:700;color:#1e293b">${scoreLabel}</p>
          <p style="margin:4px 0 0;font-size:14px;color:#64748b">Overall fit score for <em>${role}</em></p>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:0 40px 24px">
        <h2 style="margin:0 0 10px;font-size:16px;color:#1e293b">Reviewer Summary</h2>
        <p style="margin:0;font-size:15px;color:#475569;line-height:1.7;background:#f1f5f9;padding:16px;border-left:4px solid #6366f1;border-radius:4px">${summary}</p>
      </td></tr>
      <tr><td style="padding:0 40px 32px">
        <h2 style="margin:0 0 12px;font-size:16px;color:#1e293b">Score Breakdown</h2>
        <table width="100%" style="border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
          <thead><tr style="background:#f8fafc">
            <th style="padding:10px 12px;text-align:left;font-size:13px;color:#94a3b8;border-bottom:1px solid #e2e8f0">Category</th>
            <th style="padding:10px 12px;text-align:center;font-size:13px;color:#94a3b8;border-bottom:1px solid #e2e8f0">Score</th>
            <th style="padding:10px 12px;text-align:left;font-size:13px;color:#94a3b8;border-bottom:1px solid #e2e8f0">Feedback</th>
          </tr></thead>
          <tbody>
            ${categoryRow("Skills Match", breakdown.skills_match)}
            ${categoryRow("Experience Fit", breakdown.experience_fit)}
            ${categoryRow("Education Relevance", breakdown.education_relevance)}
            ${
      categoryRow("Communication Quality", breakdown.communication_quality)
    }
          </tbody>
        </table>
      </td></tr>
      <tr><td style="padding:0 40px 32px">
        <h2 style="margin:0 0 10px;font-size:16px;color:#1e293b">What happens next?</h2>
        <ol style="margin:0;padding-left:20px;color:#475569;font-size:15px;line-height:1.8">
          <li>Our recruiters will review your full profile manually.</li>
          <li>If shortlisted, we'll reach out to schedule an interview.</li>
          <li>Successful candidates are added to our active talent pool and matched with client opportunities.</li>
        </ol>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center">
        <p style="margin:0;font-size:13px;color:#94a3b8">© ${
      new Date().getFullYear()
    } E-Africa Services · Automated assessment email.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

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
    console.warn(`[email] Resend failed (${res.status}): ${await res.text()}`);
  } else {
    console.log(`[email] Score email sent to ${to}`);
  }
}

// ── PDF text extraction ───────────────────────────────────────────────────────

async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  try {
    const pdfParse = (await import("npm:pdf-parse/lib/pdf-parse.js")).default;
    const data = await pdfParse(new Uint8Array(buffer));
    return data.text?.trim() ?? "";
  } catch {
    const raw = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
    const chunks: string[] = [];
    const btEt = /BT([\s\S]*?)ET/g;
    let m: RegExpExecArray | null;
    while ((m = btEt.exec(raw)) !== null) {
      const paren = /\(([^)]*)\)/g;
      let p: RegExpExecArray | null;
      while ((p = paren.exec(m[1])) !== null) chunks.push(p[1]);
    }
    return chunks.join(" ").trim();
  }
}

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  const mammoth = (await import("npm:mammoth")).default;
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value?.trim() ?? "";
}

// ── Scoring helpers ───────────────────────────────────────────────────────────

function getSeniorityLabel(years: number | null, rubric: Rubric): string {
  if (years === null) return "Unknown seniority";
  for (const tier of [...rubric.seniorityLadder].reverse()) {
    if (years >= tier.yearsMin) return tier.label;
  }
  return rubric.seniorityLadder[0].label;
}

function clampScore(n: unknown): number {
  const num = typeof n === "number" ? n : Number(n);
  if (!isFinite(num)) return 0;
  return Math.round(Math.max(0, Math.min(100, num)));
}

function normaliseScoreResponse(raw: unknown): GrokScoreResponse {
  if (!raw || typeof raw !== "object") throw new Error("Empty AI response");
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
- 90-100: Exceptional — strong immediate placement potential
- 70-89:  Good fit — minor gaps
- 50-69:  Moderate fit — notable gaps but trainable
- 30-49:  Weak fit — significant gaps
- 0-29:   Poor fit for this specific role
- If no CV text is provided, score based on form fields only and note this in the summary
- If any criterion cannot be assessed, score it at 50 with appropriate rationale
- Be fair, constructive, and consistent`;
}

function buildUserMessage(
  app: ApplicationRow,
  cvText: string,
  rubric: Rubric,
): string {
  const seniority = getSeniorityLabel(app.years_experience, rubric);
  const formSnapshot = [
    `Applicant name: ${app.full_name}`,
    `Role applied for: ${app.role_applied_for}`,
    `Years of experience: ${app.years_experience ?? "Not specified"}`,
    `Seniority implied by years: ${seniority}`,
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

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const grokApiKey = Deno.env.get("GROK_API_KEY")?.trim();
  const resendApiKey = Deno.env.get("RESEND_API_KEY")?.trim();

  if (!grokApiKey) {
    return new Response(
      JSON.stringify({ error: "AI service is not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  await supabase.from("talent_applications").update({
    cv_score_status: "processing",
  }).eq("id", application_id);

  try {
    const { data: app, error: fetchError } = await supabase
      .from("talent_applications")
      .select(
        "id, full_name, email, role_applied_for, years_experience, skills, languages, cv_storage_path",
      )
      .eq("id", application_id)
      .single<ApplicationRow>();

    if (fetchError || !app) {
      throw new Error(
        `Application not found: ${fetchError?.message ?? "unknown"}`,
      );
    }

    let cvText = "";
    let hasNoCv = false;

    if (app.cv_storage_path) {
      const { data: fileBlob, error: downloadError } = await supabase.storage
        .from("talent-cvs").download(app.cv_storage_path);
      if (downloadError || !fileBlob) {
        console.warn(`CV download failed: ${downloadError?.message}`);
      } else {
        const buffer = await fileBlob.arrayBuffer();
        const lowerPath = app.cv_storage_path.toLowerCase();
        try {
          if (lowerPath.endsWith(".pdf")) cvText = await extractPdfText(buffer);
          else if (lowerPath.endsWith(".docx") || lowerPath.endsWith(".doc")) {
            cvText = await extractDocxText(buffer);
          }
        } catch (e) {
          console.warn(`Text extraction failed: ${e}`);
        }
      }
    } else {
      hasNoCv = true;
    }

    const rubric = getRubric(app.role_applied_for);
    const systemPrompt = buildSystemPrompt(rubric);
    const userMessage = buildUserMessage(app, cvText, rubric);

    const grokResponse = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${grokApiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3",
        messages: [{ role: "system", content: systemPrompt }, {
          role: "user",
          content: userMessage,
        }],
        temperature: 0.2,
        max_tokens: 1024,
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!grokResponse.ok) {
      throw new Error(
        `Grok API error ${grokResponse.status}: ${await grokResponse.text()}`,
      );
    }

    const grokJson = await grokResponse.json();
    const rawContent = grokJson?.choices?.[0]?.message?.content;
    if (!rawContent) throw new Error("Empty response from Grok API");

    // Strip markdown code fences if Grok wraps the JSON in ```json ... ```
    const cleanContent = rawContent
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsedScore = normaliseScoreResponse(JSON.parse(cleanContent));

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
    await supabase.from("talent_applications").update({
      cv_score_status: "failed",
    }).eq("id", application_id);
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
