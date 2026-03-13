// ─────────────────────────────────────────────────────────────────────────────
//  CV Scoring Rubrics
//  One entry per profession in the PROFESSIONS constant.
//  The rubric is injected into the Grok system prompt as scoring context.
// ─────────────────────────────────────────────────────────────────────────────

export interface Rubric {
  title: string;
  description: string;
  coreSkills: string[];
  niceToHave: string[];
  redFlags: string[];
  greenFlags: string[];
  seniorityLadder: { label: string; yearsMin: number; yearsMax: number }[];
}

export const RUBRICS: Record<string, Rubric> = {
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
    seniorityLadder: [
      { label: "Junior CSM", yearsMin: 0, yearsMax: 2 },
      { label: "CSM", yearsMin: 2, yearsMax: 5 },
      { label: "Senior CSM", yearsMin: 5, yearsMax: 50 },
    ],
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
    seniorityLadder: [
      { label: "Entry-level VA", yearsMin: 0, yearsMax: 1 },
      { label: "VA", yearsMin: 1, yearsMax: 4 },
      { label: "Senior VA / EA", yearsMin: 4, yearsMax: 50 },
    ],
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
    seniorityLadder: [
      { label: "Junior Developer", yearsMin: 0, yearsMax: 2 },
      { label: "Mid-level Developer", yearsMin: 2, yearsMax: 5 },
      { label: "Senior Developer", yearsMin: 5, yearsMax: 50 },
    ],
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
    seniorityLadder: [
      { label: "Junior Designer", yearsMin: 0, yearsMax: 2 },
      { label: "Graphic Designer", yearsMin: 2, yearsMax: 5 },
      { label: "Senior / Lead Designer", yearsMin: 5, yearsMax: 50 },
    ],
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
    seniorityLadder: [
      { label: "Junior Writer", yearsMin: 0, yearsMax: 2 },
      { label: "Content Writer", yearsMin: 2, yearsMax: 5 },
      { label: "Senior Writer / Content Strategist", yearsMin: 5, yearsMax: 50 },
    ],
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
    seniorityLadder: [
      { label: "Junior Marketer", yearsMin: 0, yearsMax: 2 },
      { label: "Digital Marketing Specialist", yearsMin: 2, yearsMax: 5 },
      { label: "Senior / Head of Digital", yearsMin: 5, yearsMax: 50 },
    ],
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

  // Fallback for "Others" or any unrecognised profession
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
    seniorityLadder: [
      { label: "Junior", yearsMin: 0, yearsMax: 2 },
      { label: "Mid-level", yearsMin: 2, yearsMax: 6 },
      { label: "Senior", yearsMin: 6, yearsMax: 50 },
    ],
  },
};

/**
 * Returns the rubric for the given profession key.
 * Falls back to the "Others" rubric if the key is not found.
 */
export function getRubric(profession: string): Rubric {
  return RUBRICS[profession] ?? RUBRICS["Others"];
}
