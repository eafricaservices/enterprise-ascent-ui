# GitHub Copilot Prompt: Implement Homepage Changes per SOP WEB001.pdf

**Context:** We are building the E‑Africa Services homepage. The SEO manager provided a detailed specification (SOP WEB001.pdf). Implement the following changes exactly as described.

**Priority:** All keyword placements must be **bolded** and appear the specified number of times (see keyword summary at the end). Use exact‑match text.

---

## 1. Global Structure & Navigation
- **Sticky menu** with dropdowns (hover on desktop, touch‑friendly on mobile).  
- Menu items and their targets:
  - Home → `#home` (smooth scroll)
  - For Employers (dropdown): Talent Solutions → `#employers-core-services`; How It Works (Hiring) → `#employers-how-it-works`; Pricing → `/pricing` (separate page)
  - For Job Seekers (dropdown): Talent Pool → `#job-seekers-talent-pool`; How It Works (Applying) → same as “How to join” section; Job Listings → `/jobs` (future, separate page)
  - About → `#about` if exists, else `/about`
  - Resources (dropdown): Blog → `/blog`; Testimonials → `#testimonials`; FAQ → `#faq`
  - Contact → `/contact`
- Add `scroll-behavior: smooth` in CSS.

---

## 2. Hero Section (`id="home"`)
- H1: `Africa's Global Talent Infrastructure for Customer Service and Outsourcing`
- Subheadline P:  
  `We connect global companies with vetted, multilingual African professionals for stay at home jobs in africa and work from home english speaking jobs - while helping Africans build international careers.`  
  *(Bold the two keywords: **stay at home jobs in africa**, **work from home english speaking jobs**)*
- Two buttons:
  - `Hire Talent` → links to `#employers-core-services`
  - `Find a Job` → links to `#job-seekers-talent-pool`
- Trust bar P:  
  `Trusted by 100+ companies · 500+ professionals placed · 25+ African countries · A trusted staffing agency for startups`  
  *(Bold **staffing agency for startups**)*

---

## 3. Social Proof Strip
- H4: `Trusted by Global Partners`
- Horizontal row of logos (inline images) for: BYU‑Pathway, E‑Amplify, AWS, Balance of Nature, Cadana, HireBloom, GT Bank, eAssist Dental, Moniepoint, Kuda Bank, MaxMigold, Baobab Bank, Deel, Zendesk, Hubspot.

---

## 4. Two Pathways (side‑by‑side cards; stack vertically on mobile)

### Left Card – For Employers
- H2: `Hire Top African Talent - Risk-Free`
- Bullet points (P):
  - `- Pre-vetted professionals ready for global teams - outsource customer support and more`
  - `- Hire a remote assistant or full teams with multilingual, accent-neutral communication`
  - `- Payroll, compliance, and onboarding handled by us`
- CTA button: `View Hiring Plans` → `#employers-core-services`

### Right Card – For Job Seekers
- H2: `Find Global Remote Jobs That Pay in USD - Including stay at home jobs in africa`  
  *(Bold the keyword – 2nd occurrence)*
- Bullet points (P):
  - `- Work from home english speaking jobs - entry-level to expert roles` *(bold keyword – 2nd occurrence)*
  - `- Customer support, VA, sales, tech, creative, finance`
  - `- No upfront fees - get matched with vetted international companies`
- CTA button: `Join Talent Pool` → `#job-seekers-talent-pool`

---

## 5. For Employers – Core Services (`id="employers-core-services"`)
- H2: `Global Talent Solutions - Built for Remote Teams`
- Subheadline P:  
  `We provide remote-ready professionals across key business functions. Whether you need to outsource customer support, hire remote virtual assistant roles, or scale your sales team, we deliver.`  
  *(Bold **outsource customer support** – 2nd occurrence, **hire remote virtual assistant** – 1st occurrence)*
- H3: `Service Categories`
- Table/grid with 4 columns:
  - **Customer Experience** – Support specialists, success managers, call center agents, technical support – ideal for customer service and outsourcing *(bold **customer service and outsourcing** – 2nd/final)*
  - **Operations & Admin** – Virtual assistants, executive assistants, operations coordinators, project managers – hire remote virtual assistant talent here *(bold **hire remote virtual assistant** – 2nd/final)*
  - **Sales & Revenue** – SDRs, lead gen specialists, account executives, cold calling specialists
  - **Technology & Creative** – Software developers, data analysts, digital marketers, video editors
- Highlight box P:  
  `Multilingual professionals - English (C1), French, Portuguese, Spanish, German, Swahili. Perfect for bilingual remote customer service jobs.`  
  *(Bold **bilingual remote customer service jobs** – 1st occurrence)*
- CTA button (no specific link given – use `#contact` or keep as action)

---

## 6. For Employers – How It Works (`id="employers-how-it-works"`)
- H2: (not explicitly given – use `How It Works for Employers` or similar from context)
- Three steps (numbered paragraphs):
  1. `Tell us your roles - We blueprint role outcomes, team structure, language needs, and performance expectations. Many clients come to us to outsource customer support or hire a remote assistant.` *(bold **outsource customer support** – 3rd/final, **hire a remote assistant** – 2nd/final)*
  2. `We match & vet - We handle sourcing, assessments, shortlisting, contracts, and payroll setup.`
  3. `Interview & onboard - You interview finalists. We handle onboarding, training, and ongoing support.`
- CTA button: `Start Hiring` → `#contact`

---

## 7. For Job Seekers – Talent Pool & Benefits (`id="job-seekers-talent-pool"`)
- H2: `Join Africa's Fastest-Growing Remote Talent Pool - Find remote customer service rep jobs and remote virtual assistant work`  
  *(Bold **remote customer service rep jobs** – 1st, **remote virtual assistant work** – 1st)*
- Subheadline P: `Get matched with global companies that pay in USD - and grow your career from home.`
- Benefits (with icons) as P text:
  - `Paid in USD - Earn stable income through remote customer service rep jobs` *(bold keyword – 2nd/final)*
  - `Work from home - Anywhere in Africa with reliable internet`
  - `Variety of roles - Including remote virtual assistant work, sales, tech, and more` *(bold keyword – 2nd/final)*
  - `Free training - Communication, accent softening, remote work skills`
- H3: `How to join (3 steps)`
  - 1. Apply online + upload CV
  - 2. Record a short Loom video introduction
  - 3. Complete interviews and get matched (or join our waitlist)
- Trust note P: `1000+ professionals already in our pool - many have found remote customer service rep jobs through us.` *(bold keyword – already complete, no new count)*
- CTA button: `Apply Now` → external application form (link TBD)

---

## 8. Our Impact & Testimonials (`id="testimonials"`)
- H2: `Making African Excellence the Global First Choice`
- Metrics grid (4 boxes as H4):
  - `500+ professionals placed - including remote customer service rep jobs`
  - `100+ companies supported`
  - `25+ African talent markets`
  - `6 business languages covered`
- H3: `Customer Service and Outsourcing`
- H4: `What Employers Say`
- Intro P: `Hear from companies that trust E-Africa for their remote hiring needs.`
- Three testimonial quotes (each as P with author):
  1. `"We tried hiring independently through LinkedIn and Upwork. It was inconsistent. E-Africa delivered structured, reliable professionals who integrated seamlessly."` – Sarah Mitchell, VP of Operations, TechScale Inc.
  2. `"As a startup, we couldn't afford hiring mistakes. E-Africa eliminated the risk entirely. Our remote team feels like an in-house extension."` – Michael Torres, CTO, Launchpad Digital
  3. `"The multilingual capabilities were a game-changer. We needed French and English speakers - E-Africa delivered perfectly."` – Isabelle Dubois, Expansion Lead, EuroConnect
- H3: `Remote Customer Service Rep Jobs`
- H4: `What Talent Says`
- Intro P: `Professionals who found their roles through our talent pool share their experience.`
- One testimonial P: `"I joined E-Africa's talent pool and within a month was placed at a US company. The process was professional from start to finish."` – Chidinma Okafor, Remote Customer Success Manager

---

## 9. FAQ Section (`id="faq"`)
- H2: `Frequently Asked Questions`
- **Tabbed interface** (two tabs: “For Employers” and “For Job Seekers”) – use JavaScript or CSS radio buttons.

### Tab 1 – For Employers (Q&A pairs; bold the questions)
- Q: `How do payments work?` A: `Clients pay E-Africa. We handle cross-border payroll.`
- Q: `Who handles taxes and legal compliance?` A: `Contractors manage their own taxes. We provide structured contracts and compliance alignment.`
- Q: `Can I interview the talent myself?` A: `Yes. You join final interviews and select from shortlisted candidates.`
- Q: `How do I know your talent is qualified?` A: `Multi-stage vetting includes English testing, role-specific assessments, and communication checks - especially for bilingual remote customer service jobs.` *(bold keyword – 2nd/final)*
- Q: `What if I need to scale quickly?` A: `Our infrastructure supports rapid deployment - from 10 to 1,000+ team members. We are a staffing agency for startups that grows with you.` *(bold keyword – 2nd/final)*

### Tab 2 – For Job Seekers
- Q: `Do I need previous experience?` A: `No. We have work from home english speaking jobs for graduates and entry-level candidates, plus free training.` (keyword already complete)
- Q: `How do I get paid?` A: `Monthly USD payments via secure global transfer options.`
- Q: `Is there a fee to join?` A: `No. Joining our talent pool is completely free.`
- Q: `What equipment do I need?` A: `A laptop, stable internet, and backup power - standard for stay at home jobs in africa.` *(bold keyword – 3rd/final)*
- Q: `How long until I get placed?` A: `It varies, but most candidates receive their first match within 4-6 weeks.`

---

## 10. Final CTA Section
- H2: `Ready to build your global team - or start your remote career?`
- Two buttons:
  - `Talk to Hiring Team` → `/contact`
  - `Join Talent Pool` → `#job-seekers-talent-pool`

---

## 11. Footer
- Logo + tagline P:  
  `Helping global companies outsource customer support, hire remote virtual assistant talent, and find stay at home jobs in africa for professionals.`  
  *(Bold **hire remote virtual assistant** – 2nd/final)*
- Quick links P: `For Employers | For Job Seekers | About Us | Talent Solutions | FAQ | Contact`
- Contact P: `Pan-African Operations • +254 700 000 000 • info@eafricaservices.com`
- Copyright P: `© 2026 E-Africa Services. All rights reserved. Powered by E-Amplify.`

---

## 12. Keyword Frequency Summary (for verification)

| Keyword | Target occurrences |
|---------|--------------------|
| customer service and outsourcing | 2 |
| outsource customer support | 3 |
| hire remote virtual assistant | 2 |
| hire a remote assistant | 2 |
| staffing agency for startups | 2 |
| remote customer service rep jobs | 2 |
| remote virtual assistant work | 2 |
| stay at home jobs in africa | 3 |
| work from home english speaking jobs | 2 |
| bilingual remote customer service jobs | 2 |

**All keywords must be bolded exactly as shown and appear only in headings, paragraphs, or bullet points (not in menus, footers, or buttons unless specified).**

---

## 13. Technical & Design Requirements
- Anchor IDs: `home`, `employers-core-services`, `employers-how-it-works`, `job-seekers-talent-pool`, `testimonials`, `faq`
- Dropdown menu: use `<details>`/`<summary>` or CSS hover; ensure mobile touch support.
- Tabbed FAQ: JavaScript or CSS radio buttons.
- Responsive:
  - Mobile: two‑pathway cards stack vertically (left card first)
  - Metrics grid becomes 2×2 on mobile
  - Testimonials stack vertically
- Typography: as defined in the design system (H1, H2, H3, H4, P).

**Goal:** Convert employers and job seekers, rank for keywords. All changes must match the spec exactly.