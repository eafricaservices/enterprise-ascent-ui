import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle className="font-heading text-xl leading-snug">
            Privacy Policy, Terms of Service &amp; Talent Pool Participation Agreement
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            E-Africa Services · A Brand of E-Amplify Services Limited · Effective Date: August 2026
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="px-6 py-5 text-sm leading-relaxed text-foreground space-y-6">

            {/* Section 1 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">1. Introduction and Acceptance</h2>
              <p className="text-muted-foreground">
                This Privacy Policy, Terms of Service, and Talent Pool Participation Agreement (collectively, "Agreement") is entered into by and between E-Africa Services, a brand operated by E-Amplify Services Limited, a company registered in Lagos, Nigeria ("E-Africa," "we," "us," or "our"), and any individual who applies to join our talent pool, uses our website, or engages with our services ("You," "your," or "Talent").
              </p>
              <p className="text-muted-foreground mt-2">
                Just as Claude is powered by Anthropic, E-Africa is powered by E-Amplify Services Limited. E-Africa is our service brand for global talent placement and workforce infrastructure. This distinction ensures compliance with international regulations and provides corporate structure for our operations across multiple jurisdictions.
              </p>
              <p className="text-muted-foreground mt-2">
                By submitting your personal information, completing an application to join our talent pool, accessing our website, or engaging with our services in any capacity, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you do not agree with any provision of this Agreement, you must cease using our services immediately.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">2. Scope of Services and Business Operations</h2>
              <p className="text-muted-foreground">E-Africa Services operates as a Talent-as-a-Service ("TaaS") workforce infrastructure company. Our core business functions include:</p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>Sourcing vetted professional talent from West Africa and throughout the continent</li>
                <li>Conducting comprehensive vetting, skills assessment, and background verification</li>
                <li>Matching vetted professionals with client companies in the US, UK, Canada, Australia, EU, and African markets</li>
                <li>Managing talent placement, onboarding support, and ongoing workforce coordination</li>
                <li>Providing customer success, operations, administrative, technology, sales, and project management staffing services</li>
                <li>Offering B2B corporate training and workforce development programs</li>
              </ul>
              <p className="text-muted-foreground mt-2 font-medium">We are not your employer. You are an independent contractor. We do not provide employment, benefits, or employee protections. We are a workforce intermediary that connects you with client companies seeking your professional services.</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">3. Independent Contractor Status and Classification</h2>
              <h3 className="font-semibold text-sm mb-1">3.1 Contractor Classification</h3>
              <p className="text-muted-foreground">By joining E-Africa's talent pool and accepting a placement, you explicitly acknowledge and agree that:</p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>You are an independent contractor, not an employee of E-Africa Services, E-Amplify Services Limited, or the client company.</li>
                <li>You retain control over the method, manner, and means by which you perform your work, subject to client-defined deliverables and quality standards.</li>
                <li>You are free to work with other clients, competitors, or engage in outside business activities, provided you comply with non-compete and confidentiality obligations.</li>
                <li>You may decline work assignments or client placements without penalty or loss of standing in the talent pool.</li>
                <li>Your engagement is project-based, time-limited, or indefinite at-will. Either party may terminate the arrangement at any time without cause.</li>
                <li>You are responsible for providing your own equipment, software, and tools (unless otherwise specified by a client).</li>
                <li>You bear the financial risk and opportunity for profit or loss from each engagement.</li>
              </ul>
              <h3 className="font-semibold text-sm mt-4 mb-1">3.2 Tax and Statutory Obligations</h3>
              <p className="text-muted-foreground">You understand and agree that:</p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>You are solely responsible for calculating, filing, and paying all income taxes, self-employment taxes, VAT, and any other statutory tax obligations in your jurisdiction.</li>
                <li>E-Africa will not withhold taxes, social security contributions, or other statutory amounts from your compensation.</li>
                <li>E-Africa will provide you with documentation of compensation for tax reporting purposes (e.g., 1099 for US contractors, invoice records for other jurisdictions).</li>
                <li>You are responsible for registering with relevant tax authorities and obtaining any required business licenses or permits in your jurisdiction.</li>
                <li>You waive any claim against E-Africa or E-Amplify Services Limited for unpaid taxes, penalties, or interest arising from your failure to meet tax obligations.</li>
              </ul>
              <p className="text-muted-foreground mt-2 italic">E-Africa makes no representations regarding the tax treatment of your engagement in any jurisdiction. We strongly recommend consulting with a qualified tax professional in your country of residence.</p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">4. Privacy Policy: Data Collection, Use, and Protection</h2>
              <h3 className="font-semibold text-sm mb-1">4.1 Data We Collect</h3>
              <p className="text-muted-foreground">When you apply to join E-Africa's talent pool or engage with our services, we collect the following categories of personal information:</p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li><strong>Identity Information:</strong> Full name, date of birth, nationality, government-issued identification numbers</li>
                <li><strong>Contact Information:</strong> Email address, phone number, residential and mailing addresses</li>
                <li><strong>Professional Information:</strong> Resume/CV, work history, educational qualifications, certifications, skills, language proficiency, professional references</li>
                <li><strong>Financial Information:</strong> Bank account details, payment method, tax identification numbers</li>
                <li><strong>Background Information:</strong> Criminal background check results, credit history (if applicable), employment verification, education verification</li>
                <li><strong>Performance Data:</strong> Work assessments, skill test results, client feedback, performance metrics, time tracking records</li>
                <li><strong>Communication Records:</strong> Emails, messages, call logs, and other correspondence with E-Africa and clients</li>
                <li><strong>Technical Data:</strong> IP address, device information, usage analytics, cookies (if applicable)</li>
              </ul>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.2 Lawful Basis for Data Collection</h3>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li><strong>Contract:</strong> Processing is necessary to execute our services agreement with you and to facilitate your placement with clients.</li>
                <li><strong>Legitimate Interest:</strong> We have a legitimate business interest in vetting, assessing, and matching talent to client needs; improving our services; preventing fraud; and protecting our business reputation.</li>
                <li><strong>Legal Obligation:</strong> Processing is necessary to comply with labor laws, tax regulations, employment verification requirements, and other applicable legal obligations across multiple jurisdictions.</li>
                <li><strong>Consent:</strong> Where required by local law, we obtain your explicit consent before processing sensitive categories of data (e.g., background checks, health information).</li>
              </ul>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.3 How We Use Your Data</h3>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>Talent Matching: Assessing your qualifications, skills, and experience to identify roles and clients that align with your profile.</li>
                <li>Vetting and Verification: Conducting background checks, skill assessments, reference checks, and employment/education verification.</li>
                <li>Client Placement: Sharing your professional profile with prospective clients who are seeking candidates with your skills and experience.</li>
                <li>Performance Management: Tracking work performance, managing assignments, gathering feedback from clients, and improving service quality.</li>
                <li>Payment Processing: Processing compensation, issuing invoices, and coordinating with payment providers and financial institutions.</li>
                <li>Compliance and Legal: Meeting tax obligations, employment law compliance, regulatory reporting, dispute resolution, and fraud prevention.</li>
                <li>Communication: Sending service updates, notifications about new opportunities, policy changes, and administrative information.</li>
                <li>Analytics and Improvement: Analyzing talent pool demographics, placement success rates, and market trends to improve our services.</li>
                <li>Marketing (with consent): Featuring your success story or professional profile in case studies, testimonials, or marketing materials.</li>
              </ul>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.4 Data Sharing and Disclosure</h3>
              <p className="text-muted-foreground">Your personal information may be shared with: Client Companies, Service Providers, Legal and Regulatory Bodies, E-Amplify Services Limited and Affiliates, Business Transfers, and Fraud Prevention services. When we share your information with clients, those clients become separate data controllers under applicable data protection laws (e.g., GDPR, NDPA, POPIA). We are not responsible for how clients use, store, or protect your data after it is disclosed to them. However, we ensure clients are contractually obligated to maintain confidentiality and comply with data protection laws.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.5 Data Retention</h3>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li><strong>Active Talent Pool:</strong> While you remain an active member, we retain all information necessary to manage placements and opportunities.</li>
                <li><strong>Post-Engagement:</strong> Following the conclusion of a placement, we retain work-related records and financial information for a minimum of 7 years.</li>
                <li><strong>Talent Pool Exit:</strong> If you request removal, we retain core information for legal and compliance purposes, but delete or anonymize marketing data.</li>
                <li><strong>Background Checks:</strong> Background check reports are retained for 5–7 years depending on jurisdiction.</li>
              </ul>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.6 International Data Transfers</h3>
              <p className="text-muted-foreground">E-Africa operates internationally and may transfer your personal information across borders to process placements with clients in the United States, United Kingdom, European Union, Canada, Australia, and other jurisdictions. By joining our talent pool, you consent to cross-border transfers of your data. We implement appropriate safeguards, including Standard Contractual Clauses, to protect international transfers in compliance with GDPR, NDPA, and POPIA requirements.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.7 Data Subject Rights</h3>
              <p className="text-muted-foreground">Depending on your jurisdiction of residence, you may have the following rights: Right of Access, Right of Rectification, Right to Erasure, Right to Restrict Processing, Right to Data Portability, Right to Object, and Right to Withdraw Consent. To exercise any of these rights, contact us at <strong>info@eafricaservices.com</strong>. We will respond to your request within 30 days or as required by applicable law.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.8 Data Security</h3>
              <p className="text-muted-foreground">E-Africa implements reasonable technical and organizational security measures to protect your personal information against unauthorized access, modification, disclosure, or loss. These measures include encryption of data in transit and at rest, secure authentication protocols and access controls, regular security audits, restricted access on a need-to-know basis, and incident response procedures to address data breaches. However, no data transmission over the Internet is completely secure. While we take reasonable precautions, we cannot guarantee absolute security.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">4.9 Data Breach Notification</h3>
              <p className="text-muted-foreground">In the event of a data breach involving your personal information, E-Africa will notify you within 72 hours (or as required by applicable law) if the breach poses a risk to your privacy.</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">5. Terms of Service</h2>

              <h3 className="font-semibold text-sm mb-1">5.1 Eligibility</h3>
              <p className="text-muted-foreground">To join E-Africa's talent pool, you must be at least 18 years of age, be legally authorized to work in your country of residence and in any jurisdiction where you accept a client engagement, have the necessary qualifications as represented in your application, pass background checks and vetting procedures, and provide accurate, truthful, and complete information in all applications and communications.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.2 Application Process and Acceptance</h3>
              <p className="text-muted-foreground">E-Africa reserves the right to reject applications at its sole discretion. Acceptance to the talent pool does not guarantee placement with clients. We will use commercially reasonable efforts to match your skills with client needs, but make no guarantees of employment, income, or specific opportunities.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.3 Professional Conduct</h3>
              <p className="text-muted-foreground">As a member of E-Africa's talent pool, you agree to maintain professional conduct at all times, deliver work that meets quality standards and client expectations, communicate promptly and professionally, comply with all client policies, not engage in discrimination or harassment, not misrepresent your qualifications or experience, and not engage in illegal activities, fraud, or unethical conduct.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.4 Compensation and Payment</h3>
              <p className="text-muted-foreground">Compensation for your work is determined by the client engagement and specified in individual engagement agreements or statements of work. E-Africa may facilitate payment processing or serve as a payment intermediary through third-party processors. You are responsible for ensuring accurate banking information and tax documentation for payment processing.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.5 Intellectual Property Assignment</h3>
              <p className="text-muted-foreground">All work product created by you during your engagement with a client, including but not limited to code, documents, designs, analysis, content, and intellectual property, is the exclusive property of the client. You assign all intellectual property rights, title, and interest to the client. You waive any moral rights, attribution rights, or residual rights to work created during your engagement.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.6 Confidentiality and Non-Disclosure</h3>
              <p className="text-muted-foreground">During and after your engagement with E-Africa and clients, you agree to keep all client information strictly confidential, not disclose confidential information to unauthorized third parties, not use confidential information for personal gain, not remove confidential materials from client premises or systems, return all confidential materials and client property upon request, and maintain confidentiality for a minimum of 2 years following the end of your engagement.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.7 Non-Solicitation</h3>
              <p className="text-muted-foreground">During a client engagement and for 12 months following the conclusion of the engagement, you may not directly or indirectly solicit, negotiate with, or accept employment or contracting arrangements from the client without E-Africa's written consent. If you are hired directly by a client within this 12-month period without E-Africa's authorization, you agree to pay E-Africa a placement fee equivalent to 25% of your annual compensation or a mutually agreed-upon amount.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.8 Limitation of Liability</h3>
              <p className="text-muted-foreground">To the fullest extent permitted by applicable law: E-Africa and E-Amplify Services Limited are not liable for indirect, incidental, consequential, special, or punitive damages arising from your use of our services or participation in our talent pool. E-Africa's total liability for any claim shall not exceed the total compensation you have received from E-Africa in the 12 months preceding the claim.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.9 Indemnification</h3>
              <p className="text-muted-foreground">You agree to indemnify, defend, and hold harmless E-Africa, E-Amplify Services Limited, their officers, employees, and agents from any claims, damages, losses, liabilities, or expenses (including legal fees) arising from your breach of this Agreement, violation of applicable laws, misrepresentation of qualifications, violation of client policies or confidentiality obligations, infringement of third-party intellectual property rights, or disputes between you and clients resulting from your conduct or work.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.10 Termination</h3>
              <p className="text-muted-foreground">Either party may terminate your participation in E-Africa's talent pool at any time, with or without cause, upon written notice. Termination does not affect your obligation to complete any active client engagements, maintain confidentiality, return all client property, or comply with non-solicitation obligations.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">5.11 Dispute Resolution</h3>
              <p className="text-muted-foreground">Any disputes arising from this Agreement shall be resolved first through good-faith negotiation, and if that fails, through binding arbitration. E-Africa may pursue injunctive relief or other equitable remedies for breach of confidentiality, intellectual property infringement, or non-solicitation violations.</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">6. HR Policies, Workplace Conduct, and Compliance</h2>
              <h3 className="font-semibold text-sm mb-1">6.1 Anti-Discrimination and Equal Opportunity</h3>
              <p className="text-muted-foreground">E-Africa is committed to fair, equitable treatment of all talent in our pool. We do not discriminate on the basis of race, ethnicity, color, national origin, gender, gender identity, sexual orientation, age, disability, religion, marital status, veteran status, or any other characteristic protected by law.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">6.2 Harassment and Bullying</h3>
              <p className="text-muted-foreground">E-Africa has zero tolerance for harassment, bullying, intimidation, or any form of abusive conduct. Prohibited behavior includes sexual harassment, unwanted sexual advances, hostile communication, threatening language, deliberate exclusion, verbal abuse, insults, derogatory comments, and repeated unreasonable demands designed to intimidate. Violations will result in disciplinary action up to removal from the talent pool.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">6.3 Health, Safety, and Wellbeing</h3>
              <p className="text-muted-foreground">As an independent contractor, you are responsible for your own health and safety in your work environment. If you are unable to work due to illness or other circumstances, notify the client and E-Africa promptly.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">6.4 Substance Abuse and Prohibited Conduct</h3>
              <p className="text-muted-foreground">You agree that you will not work while under the influence of illegal drugs, alcohol, or controlled substances; engage in illegal activities; violate any applicable laws or regulations; or engage in fraud, dishonesty, or misrepresentation. Violation may result in immediate termination of engagement and removal from the talent pool.</p>

              <h3 className="font-semibold text-sm mt-4 mb-1">6.5–6.7 Technology Use, Time Tracking, and Compliance</h3>
              <p className="text-muted-foreground">You are responsible for maintaining your own equipment with up-to-date security software, using secure connections when accessing client systems, not using client systems for unauthorized purposes, accurately recording all time when required, and complying with all applicable laws, regulations, and industry standards in all jurisdictions where you perform client work.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">7. Regulatory Compliance and Jurisdiction-Specific Provisions</h2>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li><strong>Nigeria (NDPR):</strong> E-Africa complies with the Nigeria Data Protection Regulation (NDPR).</li>
                <li><strong>European Union (GDPR):</strong> E-Africa complies with the General Data Protection Regulation (GDPR).</li>
                <li><strong>South Africa (POPIA):</strong> E-Africa complies with the Protection of Personal Information Act (POPIA).</li>
                <li><strong>United States:</strong> E-Africa complies with applicable US privacy laws, including CCPA and CPRA.</li>
                <li><strong>United Kingdom (UK GDPR):</strong> E-Africa complies with UK GDPR.</li>
              </ul>
              <p className="text-muted-foreground mt-2">You acknowledge that E-Africa Services is powered by E-Amplify Services Limited. Your consent to this Agreement extends to data processing by both E-Africa and E-Amplify Services Limited, as necessary to provide our services.</p>
            </section>

            {/* Sections 8–10 */}
            <section>
              <h2 className="font-heading font-bold text-base mb-2">8. Amendments, Modifications, and Acceptance</h2>
              <p className="text-muted-foreground">E-Africa reserves the right to modify this Agreement at any time. Material changes will be communicated to you via email or notification through our platform. Your continued participation in the talent pool following notice of modifications constitutes acceptance of the revised terms.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-base mb-2">9. Contact Information and Grievance Procedures</h2>
              <p className="text-muted-foreground">
                For inquiries, to exercise your data subject rights, or to report violations of this Agreement, contact E-Africa Services at:<br />
                <strong>Email:</strong> info@eafricaservices.com<br />
                <strong>Phone:</strong> +2349076628205<br />
                We will respond to all inquiries within 30 days or as required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-base mb-2">10. Miscellaneous Provisions</h2>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li><strong>Entire Agreement:</strong> This Agreement constitutes the entire agreement between you and E-Africa regarding your participation in the talent pool.</li>
                <li><strong>Severability:</strong> If any provision is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</li>
                <li><strong>Waiver:</strong> E-Africa's failure to enforce any provision does not constitute a waiver of that provision.</li>
                <li><strong>Force Majeure:</strong> Neither party shall be liable for failure to perform any obligations due to causes beyond reasonable control, including natural disasters, pandemics, government actions, or war.</li>
                <li><strong>Assignment:</strong> You may not assign or transfer your rights or obligations under this Agreement without E-Africa's written consent.</li>
                <li><strong>Electronic Signatures:</strong> Electronic signatures (including digital consent through the platform) shall have the same legal effect as original signatures.</li>
              </ul>
            </section>

            {/* Acknowledgment */}
            <section className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h2 className="font-heading font-bold text-base mb-3">Acknowledgment and Consent</h2>
              <p className="text-muted-foreground mb-2">By accepting this agreement, you certify that:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>You have read and fully understand this Agreement</li>
                <li>You acknowledge and accept that you are an independent contractor, not an employee of E-Africa or E-Amplify Services Limited</li>
                <li>You understand that E-Africa will collect, use, and share your personal information as described in this Privacy Policy</li>
                <li>You consent to the processing and cross-border transfer of your personal data</li>
                <li>You agree to comply with all terms, conditions, and policies outlined herein</li>
                <li>You are legally authorized to enter into this Agreement and to engage in the services you offer</li>
                <li>All information you have provided is accurate, truthful, and complete</li>
                <li>You waive any future claims that you were not bound by these terms</li>
              </ul>
            </section>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border shrink-0 flex justify-end">
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
