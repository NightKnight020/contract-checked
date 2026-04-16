import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileText, ArrowRight, AlertTriangle, CheckCircle,
  Shield, Search, ChevronRight,
} from 'lucide-react';

// ─── Contract Data ────────────────────────────────────────────────────────────

type ContractData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeadline: string;
  heroSubheading: string;
  whatToLookFor: { title: string; description: string }[];
  redFlags: { title: string; description: string }[];
  missingClauses: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
};

const CONTRACT_DATA: Record<string, ContractData> = {
  'rental-agreement': {
    slug: 'rental-agreement',
    title: 'Rental & Lease Agreements',
    metaTitle: 'Free Rental Agreement Analysis — Review Your Lease | Contract Checked',
    metaDescription: 'Analyze your rental or lease agreement free. Instantly spot unfair clauses, missing tenant protections, and security deposit red flags before you sign.',
    keywords: ['rental agreement analysis', 'lease review', 'tenant rights', 'security deposit clause', 'lease agreement check', 'free rental contract review'],
    heroHeadline: 'Review Your Rental Agreement Before You Sign',
    heroSubheading: 'Spot unfair clauses, missing protections, and illegal terms in your residential or commercial lease — instantly, for free.',
    whatToLookFor: [
      {
        title: 'Rent Amount, Due Date & Grace Period',
        description: 'Confirm the exact monthly rent, the date it is due each month, and whether there is a grace period before late fees apply. Some agreements impose late fees after just one day.',
      },
      {
        title: 'Security Deposit Terms',
        description: 'Check the deposit amount (often capped by local law), the conditions under which it can be withheld, and how many days after move-out the landlord must return it.',
      },
      {
        title: 'Lease Term & Auto-Renewal Clauses',
        description: 'Identify whether the lease is fixed-term or month-to-month, and look for automatic renewal provisions that could lock you in for another full year without clear notice.',
      },
      {
        title: 'Pet Policy & Associated Fees',
        description: 'Review any restrictions on pets, required pet deposits, and monthly pet rent. Some agreements include clauses allowing the landlord to charge excessive cleaning fees upon move-out.',
      },
      {
        title: 'Maintenance Responsibilities',
        description: "Understand who is responsible for specific repairs — appliances, HVAC, plumbing. Leases sometimes shift landlord maintenance duties onto the tenant unlawfully.",
      },
      {
        title: 'Early Termination Penalties',
        description: 'Look for break-lease fees, forfeiture of deposit, or liability for all remaining rent. Understand what you owe if your circumstances change and you need to leave early.',
      },
    ],
    redFlags: [
      {
        title: 'Landlord Entry Without Required Notice',
        description: "Most jurisdictions require 24–48 hours notice before a landlord enters. Clauses allowing 'reasonable' or unrestricted access may violate tenant rights laws.",
      },
      {
        title: 'Waiver of Habitability Standards',
        description: 'No lease can legally waive the landlord\'s duty to maintain a habitable property. Any clause attempting this is generally unenforceable but signals a bad-faith landlord.',
      },
      {
        title: 'Blanket Tenant Liability for All Damages',
        description: 'Holding tenants responsible for any and all damage — including normal wear and tear or pre-existing issues — is a common tactic to wrongfully withhold security deposits.',
      },
      {
        title: 'Unilateral Mid-Lease Rent Increases',
        description: 'In a fixed-term lease, the rent is locked in. Any clause allowing the landlord to raise rent during the term without your consent should be a deal-breaker.',
      },
    ],
    missingClauses: [
      {
        title: 'Move-In Condition Inspection Checklist',
        description: 'Without a documented move-in inspection, you have no proof of pre-existing damage. A well-drafted lease should include (or attach) a signed inspection report.',
      },
      {
        title: 'Dispute Resolution Process',
        description: 'No mechanism for resolving maintenance disputes or deposit disagreements leaves you with only small claims court as a remedy. A mediation clause is better for everyone.',
      },
      {
        title: 'Subletting & Short-Term Rental Rules',
        description: 'If the lease is silent on subletting or Airbnb-style rentals, you may unknowingly be in breach by hosting guests. Clear rules protect both parties.',
      },
    ],
    faqs: [
      {
        q: 'Can my landlord keep my security deposit for normal wear and tear?',
        a: 'No. In almost every jurisdiction, landlords can only deduct from a security deposit for damage beyond normal wear and tear — things like large holes in walls, broken fixtures, or excessive cleaning. Faded paint, minor scuffs, and carpet wear from normal use are the landlord\'s responsibility.',
      },
      {
        q: 'What happens if I need to break my lease early?',
        a: 'Your liability depends on the lease terms and local law. Most leases require payment of a fee (often 1–2 months\' rent) or continued rent until a replacement tenant is found. Some jurisdictions require landlords to mitigate damages by actively seeking a new tenant.',
      },
      {
        q: 'Can my landlord increase rent during a fixed-term lease?',
        a: 'Generally no — the whole point of a fixed-term lease is that the rent is locked in for the term. However, some leases contain escalation clauses tied to CPI or other indexes. Read your agreement carefully for any such provisions.',
      },
      {
        q: 'What are my rights if the landlord refuses to make repairs?',
        a: 'In most jurisdictions you have the right to "repair and deduct" (pay for the repair yourself and deduct from rent), "rent withholding" (paying into escrow until repairs are made), or lease termination for breach of habitability. Consult local tenant rights resources for your specific jurisdiction.',
      },
      {
        q: 'Does my lease automatically renew if I stay past the end date?',
        a: 'In many places, if you stay past the lease end date without signing a new lease, you become a month-to-month tenant. However, some leases contain automatic renewal clauses that convert to a new fixed term if you don\'t give notice — check your agreement for these provisions.',
      },
    ],
    relatedSlugs: ['real-estate-aps', 'purchase-agreement', 'repair-agreement'],
  },

  'employment-contract': {
    slug: 'employment-contract',
    title: 'Employment Contracts',
    metaTitle: 'Free Employment Contract Review — Analyze Your Job Offer | Contract Checked',
    metaDescription: 'Review your employment contract or job offer free. Identify problematic non-competes, IP ownership clauses, and termination provisions before you sign.',
    keywords: ['employment contract review', 'job offer analysis', 'non-compete clause', 'at-will employment', 'IP ownership employment', 'free employment contract check'],
    heroHeadline: 'Understand Your Employment Contract Before You Start',
    heroSubheading: 'Analyze non-compete clauses, IP ownership provisions, termination terms, and compensation details in your job offer or employment agreement.',
    whatToLookFor: [
      {
        title: 'Compensation, Bonuses & Equity',
        description: 'Verify base salary, bonus structure (is it guaranteed or discretionary?), equity vesting schedule, and any conditions attached to receiving promised compensation.',
      },
      {
        title: 'Non-Compete Restrictions',
        description: 'Review the geographic scope, duration, and industry restrictions of any non-compete clause. Many are overly broad and may be unenforceable, but they can still be used to threaten or harass.',
      },
      {
        title: 'Intellectual Property Ownership',
        description: 'Check who owns work you create during employment — and whether the agreement attempts to claim ownership of projects done on your own time with personal equipment.',
      },
      {
        title: 'Termination Conditions & Notice Periods',
        description: 'Understand whether employment is at-will or requires cause for termination, what notice period is required from either side, and whether severance is promised or just discretionary.',
      },
      {
        title: 'Non-Solicitation Obligations',
        description: 'These clauses restrict you from poaching clients or colleagues after leaving. Check the duration and scope — overly broad non-solicitation can limit your career for years.',
      },
      {
        title: 'Mandatory Arbitration Clauses',
        description: 'Many employment contracts require you to resolve disputes through arbitration instead of court, waiving your right to a jury trial. Understand what you\'re giving up.',
      },
    ],
    redFlags: [
      {
        title: 'Nationwide or Overbroad Non-Compete',
        description: 'A non-compete covering all of North America in your entire industry for 2+ years is almost certainly unenforceable — but it can still prevent you from getting hired elsewhere while the dispute is resolved.',
      },
      {
        title: 'IP Ownership of Personal Projects',
        description: "Clauses claiming ownership of anything you create 'related to the company's business' — even on weekends on your personal computer — are overreaching and can jeopardize your side projects.",
      },
      {
        title: 'Unilateral Changes to Benefits or Compensation',
        description: 'Language allowing the employer to "modify benefits at any time" or "adjust compensation at its sole discretion" means your package is not actually guaranteed.',
      },
      {
        title: 'Vague or Undefined Cause for Termination',
        description: 'If the contract promises only termination "for cause" but defines cause so broadly (e.g., "any conduct the company deems inappropriate") that it includes nearly anything, the protection is illusory.',
      },
    ],
    missingClauses: [
      {
        title: 'Defined Performance Review Process',
        description: 'Without a defined review cycle and criteria for salary increases, there is no contractual basis for receiving a raise even if performance is excellent.',
      },
      {
        title: 'Severance Terms',
        description: 'Many employment contracts are silent on severance. Including defined severance (e.g., 2 weeks per year of service) provides important financial protection.',
      },
      {
        title: 'Remote Work & Expense Reimbursement Policy',
        description: 'As remote work becomes standard, contracts should clearly state WFH rights, home office expense reimbursement, and whether remote status can be changed unilaterally.',
      },
    ],
    faqs: [
      {
        q: 'What does "at-will employment" mean?',
        a: 'At-will employment means either party can terminate the relationship at any time, for any legal reason, with or without notice. Most US employment is at-will by default. If your contract says "at-will," your employer can terminate you for any non-discriminatory reason without owing you severance.',
      },
      {
        q: 'Is a non-compete clause enforceable?',
        a: 'It depends heavily on the jurisdiction. California famously bans most non-competes. Many other states enforce them only if they are "reasonable" in scope, duration, and geography. Courts routinely strike down or modify overbroad non-competes. However, you may still incur legal costs defending against one.',
      },
      {
        q: 'Who owns software or inventions I create on my own time?',
        a: 'This depends on your employment agreement and state law. Some states (like California) limit employer IP claims to work done using company resources or directly related to the company\'s business. Read your IP assignment clause carefully — many are broader than legally permissible.',
      },
      {
        q: 'Can my employer change my job duties or title after I sign?',
        a: 'If your contract specifies a role description, significant changes could constitute a breach. However, most employment contracts give employers broad authority to "assign duties as needed." Whether a change constitutes a breach or constructive dismissal depends on its scope.',
      },
      {
        q: 'What should I negotiate before signing an employment contract?',
        a: 'Focus on: (1) salary and bonus specificity — ensure bonuses are tied to measurable goals, not just discretionary; (2) non-compete scope — request geographic and duration limitations; (3) severance — even one month is better than nothing; (4) IP carve-outs for personal projects.',
      },
    ],
    relatedSlugs: ['independent-contractor', 'nda', 'service-agreement'],
  },

  'nda': {
    slug: 'nda',
    title: 'Non-Disclosure Agreements (NDA)',
    metaTitle: 'Free NDA Analysis — Review Your Non-Disclosure Agreement | Contract Checked',
    metaDescription: 'Analyze your NDA free. Identify overbroad confidentiality definitions, perpetual obligations, missing carve-outs, and one-sided terms before you sign.',
    keywords: ['NDA review', 'non-disclosure agreement analysis', 'confidentiality agreement check', 'mutual NDA', 'NDA red flags', 'free NDA review'],
    heroHeadline: 'Review Your NDA Before Sharing Anything Confidential',
    heroSubheading: 'Identify overbroad definitions, missing carve-outs, and one-sided obligations in non-disclosure and confidentiality agreements.',
    whatToLookFor: [
      {
        title: 'Definition of Confidential Information',
        description: 'The most important clause in any NDA. Check whether "confidential information" is specifically defined or so broad it covers everything discussed. A good NDA includes specific categories.',
      },
      {
        title: 'Mutual vs. One-Way Obligation',
        description: 'A mutual NDA protects both parties equally. A one-way NDA only protects the disclosing party. Make sure the agreement matches the actual nature of your relationship.',
      },
      {
        title: 'Duration of Confidentiality Obligations',
        description: 'Most NDAs run 2–5 years. Perpetual NDAs (no end date) should be scrutinized carefully — especially for trade secret protections, which have their own legal duration rules.',
      },
      {
        title: 'Permitted Disclosures & Exceptions',
        description: "The NDA should carve out disclosures required by law (e.g., court orders, regulatory requirements) and allow you to seek legal advice. The absence of these carve-outs is a red flag.",
      },
      {
        title: 'Return or Destruction of Materials',
        description: 'Upon termination, what happens to confidential documents, data, or materials? The NDA should specify whether they must be returned or destroyed and within what timeframe.',
      },
      {
        title: 'Standard Exceptions to Confidentiality',
        description: 'Well-drafted NDAs always carve out: (1) information already publicly known; (2) information you independently developed; (3) information you received from a third party without restriction.',
      },
    ],
    redFlags: [
      {
        title: 'Perpetual or Indefinite Confidentiality',
        description: 'An NDA with no expiration date means you could be bound forever. While trade secrets can warrant long protection, most business information becomes stale and public over time.',
      },
      {
        title: 'Overbroad "Any Information" Definition',
        description: 'Defining confidential information as "anything communicated during our relationship" without specificity is unreasonably broad and practically unenforceable — but it creates legal risk and uncertainty.',
      },
      {
        title: 'No Carve-Out for Legal or Regulatory Disclosure',
        description: "An NDA that prevents you from disclosing information in response to a court order or regulatory subpoena can put you in an impossible position. Always require this exception.",
      },
      {
        title: 'Personal Liability Extending Beyond Your Business Role',
        description: 'If you\'re signing on behalf of a company but the NDA imposes personal liability on you individually, that personal exposure survives even if your business relationship ends.',
      },
    ],
    missingClauses: [
      {
        title: 'Permitted Use Clause',
        description: "An NDA should state why you're receiving confidential information and restrict its use to that purpose. Without this, there's ambiguity about whether you can use disclosed information for other business purposes.",
      },
      {
        title: 'Injunctive Relief Provision',
        description: 'This clause allows a party to seek an emergency court order (injunction) to stop a breach before it causes irreparable harm. Without it, your remedy may be limited to damages after the fact.',
      },
      {
        title: 'Dispute Resolution Mechanism',
        description: 'NDAs often skip dispute resolution. Should a breach dispute go to arbitration or court? Which jurisdiction\'s law applies? These details matter when enforceability is tested.',
      },
    ],
    faqs: [
      {
        q: "What's the difference between a mutual and one-way NDA?",
        a: "A one-way (unilateral) NDA protects only one party's confidential information — typically used when you're sharing information with a potential vendor or employee. A mutual NDA protects both parties equally and is appropriate when both sides are sharing sensitive information, such as in a joint venture or merger discussion.",
      },
      {
        q: 'How long does an NDA typically last?',
        a: 'Most NDAs for business purposes run 2–5 years. Employment-related NDAs may run longer for trade secrets, which have indefinite protection under law. Consumer-facing NDAs (e.g., with contractors) are commonly 1–3 years. Perpetual NDAs should be carefully considered.',
      },
      {
        q: 'Can I refuse to sign an NDA?',
        a: "Yes, but there may be consequences — an employer may withdraw a job offer, or a potential partner may not share information. You can also try to negotiate terms: request mutual obligations, reduce the duration, narrow the definition of confidential information, or add carve-outs.",
      },
      {
        q: 'What happens if I accidentally breach an NDA?',
        a: 'Accidental breaches are common (e.g., mentioning a detail at a dinner party). The consequences depend on the harm caused and whether it was truly accidental. Courts look at intent and damages. Prompt disclosure and damage control are important. Some NDAs include a notice-and-cure period before formal breach.',
      },
      {
        q: 'Can an NDA prevent me from working in my industry?',
        a: "An NDA restricts use of confidential information — it shouldn't restrict where you work. However, NDAs are often paired with non-compete clauses that do restrict employment. If your NDA is causing career restrictions, it may be overreaching or intertwined with an impermissible non-compete.",
      },
    ],
    relatedSlugs: ['employment-contract', 'independent-contractor', 'service-agreement'],
  },

  'purchase-agreement': {
    slug: 'purchase-agreement',
    title: 'Purchase & Sale Agreements',
    metaTitle: 'Free Purchase Agreement Review — Analyze Any Sales Contract | Contract Checked',
    metaDescription: 'Review your purchase or sale agreement free. Spot warranty gaps, unfair deposit conditions, and missing buyer protections before you commit.',
    keywords: ['purchase agreement review', 'sales contract analysis', 'buy sell agreement', 'purchase contract check', 'sales agreement red flags', 'free purchase agreement review'],
    heroHeadline: 'Review Your Purchase Agreement Before You Commit',
    heroSubheading: "Identify warranty gaps, risky deposit conditions, and missing buyer protections in any purchase or sale contract.",
    whatToLookFor: [
      {
        title: 'Item Description & Condition Representations',
        description: 'The agreement should precisely describe what is being purchased — model, serial number, specifications, and current condition. Vague descriptions create room for disputes after closing.',
      },
      {
        title: 'Price, Deposit & Payment Schedule',
        description: 'Verify the total purchase price, required deposit amount, how and when the deposit is held (escrow vs. direct), and the payment schedule including final payment timing.',
      },
      {
        title: 'Warranties & Seller Representations',
        description: "What is the seller guaranteeing? Express warranties (written promises about condition) vs. 'as is' (no warranty) dramatically affect your recourse if problems emerge after purchase.",
      },
      {
        title: 'Delivery Terms & Transfer of Risk',
        description: 'At what point does ownership — and risk of loss — transfer from seller to buyer? Delivery terms (e.g., "FOB seller\'s location") define who bears the risk if something is damaged in transit.',
      },
      {
        title: 'Inspection Rights',
        description: 'You should have the right to inspect the item or property before the purchase becomes final (or "firm"). Agreements that limit or eliminate inspection rights are a serious red flag.',
      },
      {
        title: 'Default Remedies',
        description: 'What happens if the seller fails to deliver or the buyer fails to pay? Default provisions should define both parties\' remedies: refund, specific performance, liquidated damages, or termination rights.',
      },
    ],
    redFlags: [
      {
        title: '"As Is" Sale Without Required Disclosures',
        description: '"As is" means the seller provides no warranties — but it does not eliminate legal disclosure obligations. If a seller knows about defects and fails to disclose them, "as is" may not protect them.',
      },
      {
        title: 'Non-Refundable Deposit for Any Cancellation',
        description: "A deposit that is forfeited regardless of why the deal falls through — including the seller's breach — is fundamentally unfair. Deposits should only be forfeited for buyer default.",
      },
      {
        title: 'Seller\'s Right to Unilaterally Change Price',
        description: 'Any clause allowing the seller to increase the price before closing, citing cost increases or other factors, undermines the entire purpose of a purchase agreement.',
      },
      {
        title: 'Vague or Missing Force Majeure Provisions',
        description: 'Broad force majeure clauses can allow a seller to walk away from a deal for almost any disruption. Look for specific triggers and ensure refund rights are preserved.',
      },
    ],
    missingClauses: [
      {
        title: 'Financing or Inspection Condition',
        description: "If you need financing to complete the purchase, the agreement must include a financing condition — otherwise you're obligated to close even if your loan falls through.",
      },
      {
        title: 'Specific Performance Remedy',
        description: 'This clause allows you to legally force the seller to complete the transaction if they back out, rather than being limited to damages. Critical for unique items or properties.',
      },
      {
        title: 'Indemnification for Third-Party Claims',
        description: 'Without an indemnification clause, you could be liable for claims arising from the item before you owned it — liens, warranty claims, or ownership disputes.',
      },
    ],
    faqs: [
      {
        q: 'What does "as is" mean in a purchase agreement?',
        a: '"As is" means the buyer accepts the item in its current condition with no warranty from the seller. However, "as is" does not waive the seller\'s duty to disclose known material defects in many jurisdictions. If a seller knows about a problem and actively conceals it, "as is" may not protect them from fraud claims.',
      },
      {
        q: 'Can I get my deposit back if the deal falls through?',
        a: "It depends on why the deal failed and what the agreement says. If you included a condition (financing, inspection) and the condition wasn't met, you generally get your deposit back. If you simply change your mind without a contractual out, you may forfeit the deposit. If the seller defaults, you typically get the deposit back plus potential damages.",
      },
      {
        q: 'What warranties should a seller provide?',
        a: 'At minimum: (1) the seller actually owns what they\'re selling and has the right to sell it (title warranty); (2) the item is materially as described (description warranty); (3) for commercial goods, implied warranties of merchantability unless explicitly disclaimed.',
      },
      {
        q: 'When does ownership legally transfer to the buyer?',
        a: 'This depends on the contract terms. It could be at signing, at delivery, at payment, or at closing. The transfer of ownership matters because it also transfers the risk of loss — if the item is destroyed after transfer, it\'s the buyer\'s loss.',
      },
      {
        q: 'What happens if the seller backs out after signing?',
        a: "The buyer has several potential remedies: (1) suing for return of the deposit plus consequential damages; (2) seeking specific performance (court order forcing the sale); (3) in some cases, claiming additional damages for breach. The available remedies depend on what's specified in the agreement.",
      },
    ],
    relatedSlugs: ['real-estate-aps', 'service-agreement', 'rental-agreement'],
  },

  'service-agreement': {
    slug: 'service-agreement',
    title: 'Service & Consulting Agreements',
    metaTitle: 'Free Service Agreement Review — Analyze Any Consulting Contract | Contract Checked',
    metaDescription: 'Review your service or consulting agreement free. Identify scope creep risks, unlimited liability clauses, and missing deliverable definitions.',
    keywords: ['service agreement review', 'consulting contract analysis', 'service contract check', 'scope of work clause', 'liability clause review', 'free service agreement analysis'],
    heroHeadline: 'Review Your Service Agreement Before Work Begins',
    heroSubheading: 'Analyze scope of work definitions, payment terms, IP ownership, and liability clauses in service and consulting contracts.',
    whatToLookFor: [
      {
        title: 'Scope of Work Definition',
        description: 'The most important section of any service agreement. Work not explicitly listed in the scope is work you may not be paid for (or obligated to deliver). Vague scope creates endless disputes.',
      },
      {
        title: 'Payment Terms & Late Payment Consequences',
        description: 'Verify the rate (hourly vs. fixed), invoicing schedule, payment timeline (Net 15, Net 30), and whether late payment interest or suspension of work is specified.',
      },
      {
        title: 'Intellectual Property Ownership of Deliverables',
        description: 'Who owns what you create? Work-for-hire provisions transfer ownership to the client. Without this clause, a service provider may retain copyright in custom deliverables.',
      },
      {
        title: 'Termination Rights & Notice Periods',
        description: 'Both parties should have the right to terminate for convenience with reasonable notice (typically 30 days) and for cause with a cure period. Understand your rights if either side needs to exit.',
      },
      {
        title: 'Confidentiality & Non-Disclosure',
        description: 'Service agreements should include confidentiality provisions protecting the client\'s business information. Check whether these are mutual or one-sided, and how long they last.',
      },
      {
        title: 'Limitation of Liability',
        description: 'Most professional service agreements cap total liability at the fees paid under the contract. Without a cap, a small project could expose either party to unlimited damages.',
      },
    ],
    redFlags: [
      {
        title: 'Unlimited or Uncapped Liability',
        description: 'A service agreement with no liability cap exposes the service provider to potentially catastrophic damages for errors — and should prompt re-negotiation or insurance requirements.',
      },
      {
        title: 'Automatic Renewal Without Notice',
        description: 'Auto-renewal clauses that lock you into another term without active confirmation are a common surprise. Look for the renewal date and required notice period to opt out.',
      },
      {
        title: 'Client\'s Unilateral Right to Expand Scope',
        description: 'Language allowing the client to "reasonably request additional services" without a defined change order process is an open door to scope creep and unpaid work.',
      },
      {
        title: 'Vague Deliverable Definitions',
        description: '"Completed to client satisfaction" without objective criteria creates a situation where the client can refuse to accept work indefinitely. Deliverables should have specific, measurable definitions.',
      },
    ],
    missingClauses: [
      {
        title: 'Change Order Process',
        description: 'Without a formal change order process, scope changes are agreed to verbally and may never be compensated. A good agreement requires written change orders for any scope expansion.',
      },
      {
        title: 'Dispute Resolution & Governing Law',
        description: 'Specifying which jurisdiction\'s law governs the agreement and how disputes are resolved (mediation, arbitration, litigation) prevents expensive procedural fights if things go wrong.',
      },
      {
        title: 'Professional Liability Insurance Requirement',
        description: 'For significant engagements, the service provider should be required to carry professional liability (errors & omissions) insurance. Without it, a claim may go unsatisfied.',
      },
    ],
    faqs: [
      {
        q: "What's the difference between a service agreement and a consulting agreement?",
        a: 'The terms are largely interchangeable. A "service agreement" is a broad term for any contract for services. A "consulting agreement" typically implies advisory or strategic services rather than physical or ongoing operational work. Both should define scope, payment, IP, and termination.',
      },
      {
        q: 'Who owns the work product created under a service agreement?',
        a: "Without a work-for-hire clause, the service provider generally owns the copyright in creative or software deliverables they create. For a client to own the work, there must be an explicit assignment or work-for-hire provision. Don't assume ownership transfers automatically.",
      },
      {
        q: 'Can the client make changes to the project scope mid-engagement?',
        a: 'Clients can always ask for changes. Whether you must accommodate them — and at what cost — depends on the agreement. A proper change order process means any scope change is documented, approved, and priced before work begins.',
      },
      {
        q: 'What recourse do I have if a service provider misses deadlines?',
        a: 'Your options depend on the contract. If milestones have specified dates, missing them may be a breach entitling you to damages or termination. If the agreement only sets "target" dates, remedies are more limited. Always try to get firm deadlines for critical milestones.',
      },
      {
        q: 'How should payment disputes be handled under a service agreement?',
        a: 'A good service agreement includes a dispute resolution clause — typically requiring written notice of the dispute, a good-faith negotiation period, followed by mediation or arbitration. Retaining a lien right (for construction or physical work) or suspending services is often a practical first step.',
      },
    ],
    relatedSlugs: ['independent-contractor', 'nda', 'partnership-agreement'],
  },

  'independent-contractor': {
    slug: 'independent-contractor',
    title: 'Independent Contractor Agreements',
    metaTitle: 'Free Independent Contractor Agreement Review | Contract Checked',
    metaDescription: 'Analyze your independent contractor agreement free. Spot misclassification risks, IP ownership issues, and unfair non-compete clauses instantly.',
    keywords: ['independent contractor agreement review', 'contractor contract analysis', '1099 contract check', 'worker classification', 'contractor IP rights', 'free contractor agreement review'],
    heroHeadline: 'Review Your Independent Contractor Agreement',
    heroSubheading: 'Identify misclassification risks, IP ownership ambiguities, and restrictive non-compete clauses before you start work.',
    whatToLookFor: [
      {
        title: 'Contractor vs. Employee Classification Indicators',
        description: 'The agreement should confirm contractor status — independent control over work methods, ability to work for others, and provision of own tools. Employee-like control clauses trigger misclassification risk.',
      },
      {
        title: 'Payment Structure & Invoice Terms',
        description: 'Whether payment is hourly, per-project, or milestone-based should be clearly specified, along with invoicing procedures, payment timelines, and what documentation is required.',
      },
      {
        title: 'Intellectual Property Assignment',
        description: 'Work-for-hire provisions may transfer ownership of all deliverables to the client. Understand precisely what IP you\'re assigning and whether you\'re retaining any license to your methods or tools.',
      },
      {
        title: 'Non-Compete & Non-Solicitation Restrictions',
        description: 'Some contractor agreements prohibit working for competitors or soliciting clients. Unlike employees, contractors are often held to stricter non-compete enforcement — review scope and duration carefully.',
      },
      {
        title: 'Tax Responsibility Confirmation',
        description: 'The agreement should confirm you are responsible for your own taxes (self-employment tax, quarterly estimated payments) and that no withholding will occur. Ambiguity here creates IRS risk.',
      },
      {
        title: 'Termination & Kill Fee Provisions',
        description: 'How much notice is required to terminate? Is there a kill fee if the client cancels mid-project? A kill fee protects contractors who have turned down other work to take an engagement.',
      },
    ],
    redFlags: [
      {
        title: 'Employee-Like Control Provisions',
        description: 'Clauses requiring you to work specific hours, use only company-provided tools, or follow detailed company policies can trigger legal reclassification as an employee — with significant tax and benefit consequences for both parties.',
      },
      {
        title: 'Unclear or Absent IP Boundaries',
        description: 'Agreements that broadly assign all IP created "in connection with services" may inadvertently capture your background IP, tools, or methods that predated the engagement.',
      },
      {
        title: 'Forced Exclusivity Clauses',
        description: "Provisions preventing you from working for any other clients — without significant compensation — undermine contractor status and may actually establish an employment relationship.",
      },
      {
        title: 'No Indemnification for Third-Party Claims',
        description: 'If the client is sued over your deliverables, will they defend you? Without indemnification provisions, you may be exposed to third-party claims with no contractual right to defense or contribution.',
      },
    ],
    missingClauses: [
      {
        title: 'Background IP Carve-Out',
        description: 'Your pre-existing tools, frameworks, and intellectual property should be explicitly excluded from any IP assignment. Without this carve-out, the client may claim rights to software you built before the engagement.',
      },
      {
        title: 'Dispute Resolution & Payment Enforcement',
        description: 'Contractors are especially vulnerable to non-payment. An agreement should specify what happens if invoices go unpaid — suspension of work, interest on overdue amounts, or prompt arbitration.',
      },
      {
        title: 'Professional Liability & Insurance Clarity',
        description: 'Who is responsible if your work causes harm? The agreement should specify whether you must carry professional liability insurance and what coverage limits are required.',
      },
    ],
    faqs: [
      {
        q: "What's the legal difference between an independent contractor and an employee?",
        a: 'The key distinction is control and independence. Courts (and the IRS) look at who controls how the work is done (not just the outcome), whether the worker provides their own tools, whether they can work for multiple clients, and whether the relationship is permanent. Misclassification carries serious legal and tax consequences.',
      },
      {
        q: 'Can a company require a contractor to work set hours?',
        a: "Requiring specific work hours is a strong indicator of employment, not contractor status. A company can set deadlines and deliverable schedules, but dictating when and how many hours you work each day undermines contractor classification and may expose both parties to legal liability.",
      },
      {
        q: 'Who owns work created under an independent contractor agreement?',
        a: "Under US copyright law, work created by an independent contractor is generally owned by the contractor — unless there's a written work-for-hire agreement or IP assignment. Always read this section carefully: if you're retaining ownership, negotiate for it; if you're assigning it, make sure pre-existing IP is carved out.",
      },
      {
        q: 'Can a company enforce a non-compete against a contractor?',
        a: "Non-competes are harder to enforce against independent contractors in many jurisdictions — partly because courts recognize that contractors depend on working for multiple clients. However, they can still be used to threaten or delay. Narrow scope, short duration, and legitimate business interest are key enforceability factors.",
      },
      {
        q: 'What happens if I am misclassified as a contractor instead of an employee?',
        a: "If a worker is misclassified, they may be entitled to back benefits (health insurance, paid leave, retirement contributions), unpaid overtime, and the employer's share of FICA taxes. The employer faces penalties from the IRS and Department of Labor. Workers can file a misclassification complaint if they believe they've been improperly classified.",
      },
    ],
    relatedSlugs: ['employment-contract', 'service-agreement', 'nda'],
  },

  'partnership-agreement': {
    slug: 'partnership-agreement',
    title: 'Partnership Agreements',
    metaTitle: 'Free Partnership Agreement Review — Analyze Your Business Partnership | Contract Checked',
    metaDescription: 'Review your partnership agreement free. Identify missing buyout provisions, undefined decision-making authority, and dissolution risks before you partner up.',
    keywords: ['partnership agreement review', 'business partnership contract', 'partnership buyout clause', 'equity split agreement', 'general partnership analysis', 'free partnership agreement check'],
    heroHeadline: 'Review Your Partnership Agreement Before You Commit',
    heroSubheading: 'Analyze equity splits, decision-making authority, partner exit provisions, and dissolution terms before entering a business partnership.',
    whatToLookFor: [
      {
        title: 'Ownership Percentages & Voting Rights',
        description: 'The agreement should specify each partner\'s equity percentage and whether voting rights are proportional to ownership or allocated differently (e.g., equal votes regardless of equity).',
      },
      {
        title: 'Capital Contributions & Future Funding',
        description: 'What is each partner contributing to start — cash, IP, equipment, or labor? And what happens when the business needs more capital? Are partners obligated to contribute, or can they dilute?',
      },
      {
        title: 'Profit & Loss Distribution',
        description: 'Distributions should be tied to a specific schedule and percentage. Ambiguous profit-sharing language ("as agreed among partners") creates room for disputes when profits arrive.',
      },
      {
        title: 'Decision-Making Authority',
        description: 'Which decisions require unanimous consent vs. a simple majority? Major decisions (taking on debt, adding partners, selling assets) should require unanimous or supermajority approval.',
      },
      {
        title: 'Partner Exit & Buyout Provisions',
        description: 'How is a departing partner bought out? What valuation method is used? Right of first refusal, shotgun clauses, and buy-sell formulas are common mechanisms — the agreement should specify one.',
      },
      {
        title: 'Dissolution Process',
        description: "What triggers dissolution, and how are assets distributed? A clear dissolution roadmap prevents costly litigation over winding down a business that isn't working.",
      },
    ],
    redFlags: [
      {
        title: 'No Buyout Mechanism for Departing Partners',
        description: "Without a defined buyout process, a partner who wants to leave has no clear path — and can potentially hold the business hostage or force dissolution. This is the single most common cause of partnership litigation.",
      },
      {
        title: 'Partners Can Individually Bind the Partnership',
        description: "In a general partnership, each partner can legally bind the others unless the agreement restricts this. Without spending and contract authority limits, one partner's decisions create obligations for everyone.",
      },
      {
        title: 'Missing Dispute Resolution Provisions',
        description: 'Partner disputes are extremely common. Without a pre-agreed resolution mechanism (mediation first, then arbitration), even minor disagreements can escalate into expensive litigation.',
      },
      {
        title: 'No Clarity on Personal vs. Partnership Liability',
        description: 'General partnerships expose all partners to personal liability for partnership debts. The agreement should address whether the partnership intends to operate as a limited partnership or LLC and what personal guarantees exist.',
      },
    ],
    missingClauses: [
      {
        title: 'Non-Compete During Partnership',
        description: "Without a non-compete or loyalty clause, partners can work for competitors or start competing ventures while still in the partnership. This needs to be addressed explicitly.",
      },
      {
        title: 'Succession & Incapacity Planning',
        description: "What happens if a partner dies, becomes incapacitated, or goes through bankruptcy? Without succession provisions, these events can trigger automatic dissolution under default partnership law.",
      },
      {
        title: 'Anti-Dilution & New Partner Admission Process',
        description: 'How are new partners admitted, and at what equity cost? Without clear admission rules, existing partners can be diluted against their will or blocked from bringing in needed capital.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a written partnership agreement if I trust my partner?',
        a: "Yes. Relying on trust alone is the most common reason partnerships end in expensive litigation. Without a written agreement, default partnership law governs — which may not reflect what you actually agreed to. A written agreement protects the relationship by resolving ambiguities before they become disputes.",
      },
      {
        q: 'What happens if a partner wants to leave the business?',
        a: "Without a buyout provision, a departing partner may demand their equity be bought out at a price the remaining partners can't afford — or refuse to leave entirely. A well-drafted agreement includes a pre-agreed valuation method and a timeline for completing the buyout.",
      },
      {
        q: 'Can a partnership survive the death of a partner?',
        a: "Under default general partnership law in most jurisdictions, the death of a partner triggers dissolution. A well-drafted partnership agreement modifies this rule — allowing the surviving partners to continue by buying out the deceased partner's estate.",
      },
      {
        q: 'How are partnership profits and losses taxed?',
        a: 'Partnerships are "pass-through" entities — the business itself pays no income tax. Instead, each partner reports their share of profits and losses on their personal tax return, regardless of whether distributions were actually made. This is called "phantom income" when profits are retained in the business.',
      },
      {
        q: "What's the difference between a general partnership and a limited partnership?",
        a: "In a general partnership, all partners share management authority and personal liability equally. In a limited partnership, there is at least one general partner (with full liability and management control) and one or more limited partners (who contribute capital but have limited liability and limited management rights). Most new businesses opt for LLCs over either type of partnership.",
      },
    ],
    relatedSlugs: ['service-agreement', 'purchase-agreement', 'independent-contractor'],
  },

  'repair-agreement': {
    slug: 'repair-agreement',
    title: 'Repair & Maintenance Agreements',
    metaTitle: 'Free Repair Agreement Review — Analyze Any Repair or Maintenance Contract | Contract Checked',
    metaDescription: 'Review your repair or maintenance agreement free. Spot hidden cost escalation clauses, missing warranty provisions, and authorization gaps.',
    keywords: ['repair agreement review', 'maintenance contract analysis', 'repair contract check', 'repair warranty clause', 'contractor repair agreement', 'free repair contract review'],
    heroHeadline: 'Review Your Repair Agreement Before Authorizing Work',
    heroSubheading: 'Identify hidden cost escalation clauses, missing warranties, and authorization gaps in repair and maintenance contracts.',
    whatToLookFor: [
      {
        title: 'Exact Scope of Repair Work',
        description: 'The agreement should specify precisely what work will be done, which parts will be replaced, and what is explicitly excluded. Vague scope creates surprise charges for work you thought was included.',
      },
      {
        title: 'Labor Rate & Parts Pricing',
        description: 'Understand the hourly labor rate, how parts are priced (at cost, with markup, or at retail), and whether diagnostic time is billed separately. Hidden markups on parts are extremely common.',
      },
      {
        title: 'Warranty on Parts & Labor',
        description: 'A reputable repair provider should warranty both their labor and the parts they install. Check the warranty duration (30 days to 1 year is typical) and what voids it.',
      },
      {
        title: 'Completion Timeline',
        description: 'When will the work be done? Agreements should specify an estimated completion date and what happens (if anything) if the repair takes longer than promised.',
      },
      {
        title: 'Authorization Process for Additional Work',
        description: 'If the technician discovers additional problems during repair, how are you notified and asked to approve additional work? This process should require explicit authorization before any work beyond the original scope begins.',
      },
      {
        title: 'Payment Terms & Deposit Requirements',
        description: 'Review deposit amounts (typically 10–30% for larger jobs), progress payment milestones, and final payment timing. Be cautious of contractors requiring full payment upfront.',
      },
    ],
    redFlags: [
      {
        title: 'No Cap on "Additional Work" Charges',
        description: "Allowing a repair technician to authorize and perform additional work without a spending limit or your approval can lead to bills dramatically higher than the original estimate.",
      },
      {
        title: 'No Written Estimate Before Work Begins',
        description: "Verbal estimates are unenforceable in most jurisdictions. If a contractor begins work without a written estimate signed by both parties, you have very limited protection against inflated final bills.",
      },
      {
        title: 'Labor Warranty Only — Parts Not Covered',
        description: "Some agreements warranty the technician's labor but not the parts installed. If an installed part fails within weeks, you could pay full price to have the same job done again.",
      },
      {
        title: 'Vague Completion Date',
        description: '"When the work is done" with no estimated timeline allows the contractor to hold your property indefinitely. Agreements should include a reasonable completion estimate.',
      },
    ],
    missingClauses: [
      {
        title: 'Return or Disposal of Replaced Parts',
        description: "Replaced parts can have resale value (especially auto parts). Without specifying that old parts are returned to you, the contractor may sell them. Your agreement should state what happens to parts removed during repair.",
      },
      {
        title: 'Liability for Damage During Repair',
        description: "If the repair process damages something else — a cracked screen during a phone repair, a scratched panel during auto bodywork — who is responsible? This should be explicitly addressed.",
      },
      {
        title: 'Storage Fee Provisions',
        description: 'If you don\'t pick up your item promptly after completion, many repair shops charge daily storage fees. These should be disclosed in advance, not presented as a surprise when you arrive to collect your property.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a written repair agreement for small jobs?',
        a: "For anything over a few hundred dollars, yes. A written agreement (even a simple one-page work order) gives you legal protection if the final bill exceeds the estimate or the work is substandard. Many jurisdictions actually require written estimates for auto repairs and home repairs above certain dollar thresholds.",
      },
      {
        q: 'What should I do if the final bill is significantly higher than the estimate?',
        a: "First, ask for an itemized breakdown of all charges. In most jurisdictions, a contractor cannot charge more than a certain percentage above a written estimate without your authorization. If charges seem inflated or unauthorized, dispute them in writing before paying. You may have statutory remedies under consumer protection laws.",
      },
      {
        q: 'How long should a warranty on repairs last?',
        a: "This varies by industry. Auto repair warranties are typically 12 months/12,000 miles. Electronics repair commonly warrants 30–90 days on parts and labor. Home repair warranties range from 1 to 10 years depending on the type of work. Any warranty shorter than 30 days on parts and labor should be questioned.",
      },
      {
        q: 'Can a repair shop charge storage fees if I don\'t pick up my item immediately?',
        a: "Yes — but only if these fees were disclosed in advance. If storage fees weren't mentioned in the original agreement or disclosed at drop-off, charging them after the fact may be unlawful. Always clarify storage policies before leaving an item for repair.",
      },
      {
        q: "What are my rights if a repair was done incorrectly and made the problem worse?",
        a: "You generally have the right to demand the contractor remedy the defective work at no additional charge. If they refuse, you may have claims for breach of contract (failing to perform work in a workmanlike manner) and potentially consumer protection violations. Document everything in writing before pursuing legal remedies.",
      },
    ],
    relatedSlugs: ['service-agreement', 'rental-agreement', 'purchase-agreement'],
  },

  'franchise-agreement': {
    slug: 'franchise-agreement',
    title: 'Franchise Agreements',
    metaTitle: 'Free Franchise Agreement Review — Analyze Your Franchise Contract | Contract Checked',
    metaDescription: 'Review your franchise agreement free. Spot territorial exclusivity gaps, unfair royalty structures, and termination risks before investing in a franchise.',
    keywords: ['franchise agreement review', 'franchise contract analysis', 'franchise territory clause', 'royalty fee review', 'franchise disclosure document', 'free franchise agreement check'],
    heroHeadline: 'Review Your Franchise Agreement Before You Invest',
    heroSubheading: 'Analyze territorial rights, royalty structures, operational requirements, and termination clauses before committing to a franchise.',
    whatToLookFor: [
      {
        title: 'Territorial Exclusivity Rights',
        description: 'Does your agreement guarantee that the franchisor cannot open a competing location within a defined radius? Without explicit territorial exclusivity, you could compete with your own franchisor.',
      },
      {
        title: 'Fee Structure — Initial & Ongoing',
        description: 'Understand the initial franchise fee, ongoing royalties (typically 4–12% of gross sales), required marketing fund contributions, and any technology fees. Map out the total fee burden before projecting profitability.',
      },
      {
        title: 'Operational Requirements & Standards',
        description: 'What specific practices, hours, suppliers, and standards must you follow? Non-compliance with operational requirements is a leading cause of franchise termination.',
      },
      {
        title: 'Initial & Ongoing Training and Support',
        description: 'What training does the franchisor commit to provide? What ongoing support is included vs. charged separately? Vague support commitments are worth pushing back on.',
      },
      {
        title: 'Renewal & Transfer Rights',
        description: 'On what terms can you renew the franchise at the end of the term? What conditions must be met? Can you sell or transfer the franchise — and at what cost to you?',
      },
      {
        title: 'Default, Cure Periods & Termination Rights',
        description: 'What constitutes a default? How much time do you have to cure a breach before the franchisor can terminate? Some agreements allow immediate termination for minor violations.',
      },
    ],
    redFlags: [
      {
        title: 'No Territorial Exclusivity Guarantee',
        description: "Many franchise agreements grant territory 'rights' but allow the franchisor to open company-owned stores, sell through alternative channels, or place additional franchisees nearby. Read the exclusivity section precisely.",
      },
      {
        title: 'Unilateral Royalty or Fee Increases',
        description: 'If the franchisor can increase royalty rates or mandatory marketing fund contributions at will, your projected economics can deteriorate rapidly. Look for any caps on fee increases.',
      },
      {
        title: 'Immediate Termination Without Cure Period',
        description: "Clauses allowing the franchisor to terminate the agreement immediately for minor violations — a missed report, a brief standards deviation — with no opportunity to fix the issue are fundamentally unfair.",
      },
      {
        title: 'Concealed Litigation History',
        description: "The Franchise Disclosure Document (FDD) required in the US must disclose pending and prior litigation. Be wary of franchisors with extensive dispute histories — especially suits from former franchisees.",
      },
    ],
    missingClauses: [
      {
        title: 'Financial Performance Representations',
        description: "The FDD Item 19 should include earnings representations. If the franchisor refuses to provide any financial performance data, you're buying blind. Push for historical performance data from existing franchisees.",
      },
      {
        title: 'Exit Strategy & Resale Process',
        description: "What happens if you want to sell the franchise? A clear resale process, including franchisor approval requirements, transfer fees, and right of first refusal, is essential for protecting your investment's exit value.",
      },
      {
        title: 'Supply Chain Flexibility',
        description: "Being locked into a single approved supplier at any price can devastate your margins. Look for provisions allowing alternative suppliers when the mandated supplier's pricing is unreasonable.",
      },
    ],
    faqs: [
      {
        q: 'What is a Franchise Disclosure Document (FDD) and do I need to read it?',
        a: "Yes — the FDD is the most important document in any franchise transaction. In the US, franchisors must provide an FDD at least 14 days before you sign or pay anything. It includes 23 items covering the franchisor's history, litigation history, fees, financial performance, and contacts of current and former franchisees. Reading it — and calling current and former franchisees — is essential due diligence.",
      },
      {
        q: 'Can I negotiate a franchise agreement?',
        a: "Most franchisors present agreements as non-negotiable, but key terms — territory size, renewal conditions, transfer fees, cure periods — are often open to discussion for desirable markets or well-capitalized franchisees. Even if direct negotiation is refused, you can negotiate when and how the agreement is signed, request specific addenda, or walk away.",
      },
      {
        q: 'What royalty rate is typical in a franchise agreement?',
        a: "Ongoing royalties typically range from 4% to 12% of gross sales, with 5–8% being most common. Marketing fund contributions add another 1–4%. Total franchise fee burden often runs 8–12% of gross sales before you add any other operating costs. Always calculate these against realistic revenue projections.",
      },
      {
        q: 'Can a franchisor terminate my franchise agreement if I miss a payment?',
        a: "A franchisor may have the right to terminate for non-payment, but the process and notice requirements matter. Well-drafted agreements require written notice, a specific cure period (typically 5–30 days), and potentially an opportunity to dispute the amount. Immediate termination clauses for first payment failures are unusual and worth negotiating out.",
      },
      {
        q: 'What happens to my franchise if the franchisor goes bankrupt?',
        a: "This is a real risk in franchise investing. If the franchisor goes bankrupt, you may lose brand support, training, and marketing — but you still own your physical business. The franchise agreement may be rejected in bankruptcy, potentially freeing you from royalty obligations but also eliminating your right to use the brand. Assess the financial health of the franchisor before investing.",
      },
    ],
    relatedSlugs: ['partnership-agreement', 'service-agreement', 'purchase-agreement'],
  },

  'real-estate-aps': {
    slug: 'real-estate-aps',
    title: 'Real Estate APS (Agreement of Purchase and Sale)',
    metaTitle: 'Free Real Estate APS Review — Analyze Your Purchase Agreement | Contract Checked',
    metaDescription: 'Analyze your real estate Agreement of Purchase and Sale free. Spot missing conditions, closing risks, and chattels disputes before you firm up.',
    keywords: ['real estate APS review', 'agreement of purchase and sale analysis', 'conditional offer review', 'real estate contract check', 'home buying contract', 'free APS analysis'],
    heroHeadline: 'Review Your Real Estate APS Before Going Firm',
    heroSubheading: 'Analyze purchase conditions, closing dates, chattels, financing contingencies, and disclosure provisions in your Agreement of Purchase and Sale.',
    whatToLookFor: [
      {
        title: 'Purchase Price & Deposit Structure',
        description: 'Verify the agreed purchase price, initial deposit amount and due date, balance of deposit timing, and how the deposit is held (typically in trust by the listing brokerage).',
      },
      {
        title: 'Conditions, Condition Dates & Waiver Process',
        description: 'Financing and home inspection conditions are the most important buyer protections. Check the condition date (deadline to satisfy or waive), what each condition specifically requires, and the process for waiving or failing conditions.',
      },
      {
        title: 'Closing Date & Possession',
        description: 'The closing (completion) date is when ownership transfers. Confirm the date is realistic for your financing timeline, and understand whether possession is immediate upon closing or delayed.',
      },
      {
        title: 'Chattels Included & Fixtures Excluded',
        description: 'The APS should explicitly list what is included (appliances, window coverings, light fixtures) and excluded (heirloom light fixture, custom window treatments). Disputes over inclusions are extremely common.',
      },
      {
        title: 'Seller Representations & Disclosure',
        description: 'Sellers must disclose known material latent defects. Review the representations in the APS and any Seller Property Information Statement (SPIS) for completeness. Concealment of known defects is fraudulent.',
      },
      {
        title: 'Adjustment Date & Closing Adjustments',
        description: "Property taxes, rent (if tenanted), and utilities are adjusted as of the closing date. Understand how adjustments are calculated to avoid closing-day surprises on your final settlement amount.",
      },
    ],
    redFlags: [
      {
        title: 'No Financing Condition',
        description: 'Waiving a financing condition (making a "firm" offer without financing in place) means you must close even if your mortgage falls through — or lose your deposit and face legal action. Never waive financing unless you have mortgage approval in hand.',
      },
      {
        title: 'Insufficient Time for Inspection or Financing',
        description: 'A 24–48 hour condition period is not enough time for a proper home inspection or financing approval. Typical condition periods are 5–10 business days. Rushing conditions is how buyers get hurt.',
      },
      {
        title: 'Ambiguous Inclusions & Exclusions List',
        description: '"All existing appliances" is not specific enough. Without model numbers or serial numbers for major appliances, sellers can substitute different items. Always specify exactly what stays.',
      },
      {
        title: 'Missing Status Certificate Condition for Condos',
        description: "When buying a condo, you need time to review the status certificate (financial health and rules of the condo corporation). A missing status certificate condition leaves you no out if the condo's finances are a disaster.",
      },
    ],
    missingClauses: [
      {
        title: 'Home Inspection Condition',
        description: "Without a home inspection condition, you're buying a property without the right to inspect it — and you can't back out if major structural, mechanical, or environmental issues are discovered.",
      },
      {
        title: 'Property Insurance Condition',
        description: "What happens if the property is substantially damaged by fire or flood before closing? An insurance/damage clause should allow the buyer to walk away (or negotiate a reduced price) if the property is materially altered before closing.",
      },
      {
        title: 'Title Search Period & Title Insurance',
        description: "An adequate title search period (typically 15–30 days before closing) allows your lawyer to confirm clear title, identify encumbrances, and arrange title insurance. Without it, you may discover title issues too late to address them.",
      },
    ],
    faqs: [
      {
        q: 'What is an Agreement of Purchase and Sale (APS)?',
        a: "An APS is the legally binding contract between a buyer and seller for the purchase of real estate. Once both parties sign and all conditions are met or waived, it becomes a 'firm' agreement — meaning both parties are legally committed to completing the transaction on the specified closing date. Breaking a firm APS can result in forfeiture of the deposit and a lawsuit for damages.",
      },
      {
        q: "What's the difference between a conditional and a firm offer?",
        a: "A conditional offer includes one or more conditions (financing, home inspection, status certificate) that must be satisfied within a specified period. If a condition isn't met, either party can walk away. A firm offer has no conditions — both parties are immediately bound to close. Waiving conditions in a hot market is common but carries significant financial risk.",
      },
      {
        q: 'Can I back out of an APS after signing?',
        a: "If you have conditions in place and properly fail to satisfy or waive them within the condition period, you can typically exit the agreement and recover your deposit. Once all conditions are waived and the offer goes firm, you are legally bound to close. Backing out of a firm APS means forfeiting your deposit and potentially being sued for the difference between your purchase price and any lower resale price.",
      },
      {
        q: 'What happens if the home inspection reveals major issues?',
        a: "If you have a home inspection condition and the inspection reveals major issues, you have several options: (1) walk away and get your deposit back; (2) negotiate a price reduction to account for required repairs; (3) require the seller to complete specified repairs before closing; or (4) waive the condition and accept the property as-is. Never waive a home inspection condition on a property with known issues unless you're prepared to pay for all repairs.",
      },
      {
        q: 'What is a reasonable deposit for a real estate purchase?',
        a: "Deposits typically range from 1% to 5% of the purchase price, paid in stages (initial deposit at offer acceptance, balance within 24 hours or by a specified date). In competitive markets, larger deposits signal buyer seriousness. The deposit is credited toward your down payment at closing. Ensure your deposit is held in trust — never paid directly to the seller.",
      },
    ],
    relatedSlugs: ['rental-agreement', 'purchase-agreement', 'repair-agreement'],
  },
};

const CONTRACT_TITLES: Record<string, string> = {
  'rental-agreement': 'Rental & Lease Agreements',
  'employment-contract': 'Employment Contracts',
  'nda': 'Non-Disclosure Agreements',
  'purchase-agreement': 'Purchase & Sale Agreements',
  'service-agreement': 'Service & Consulting Agreements',
  'independent-contractor': 'Independent Contractor Agreements',
  'partnership-agreement': 'Partnership Agreements',
  'repair-agreement': 'Repair & Maintenance Agreements',
  'franchise-agreement': 'Franchise Agreements',
  'real-estate-aps': 'Real Estate APS',
};

// ─── Static Params & Metadata ─────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(CONTRACT_DATA).map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = CONTRACT_DATA[slug];
  if (!data) return { title: 'Contract Analysis | Contract Checked' };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords.join(', '),
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AnalyzePage({ params }: PageProps) {
  const { slug } = await params;
  const data = CONTRACT_DATA[slug];
  if (!data) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-[#0F172A]">Contract Checked</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Templates</Link>
              <Link href="/contract-types" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Contract Types</Link>
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Blog</Link>
            </nav>
            <Link
              href="/#upload-section"
              className="bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Analyze Free
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-[#1C2333] text-white pt-16 pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
              <Link href="/contract-types" className="hover:text-emerald-400 transition-colors">Contract Types</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-300">{data.title}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              {data.heroHeadline}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              {data.heroSubheading}
            </p>
            <Link
              href="/#upload-section"
              className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-900/40"
            >
              Analyze Your {data.title} — Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-14">

          {/* What to Look For */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Search className="w-6 h-6 text-[#2D6A4F]" />
              What to Look for in a {data.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.whatToLookFor.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-[#2D6A4F]">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Red Flags */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Common Red Flags in {data.title}
            </h2>
            <div className="space-y-4">
              {data.redFlags.map((flag, i) => (
                <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-semibold text-amber-900 mb-1.5">{flag.title}</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">{flag.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Missing Clauses */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-500" />
              Missing Clauses to Watch For
            </h2>
            <div className="space-y-4">
              {data.missingClauses.map((clause, i) => (
                <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="font-semibold text-blue-900 mb-1.5">{clause.title}</h3>
                  <p className="text-sm text-blue-800 leading-relaxed">{clause.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#2D6A4F] rounded-2xl p-8 text-white text-center">
            <CheckCircle className="w-10 h-10 text-emerald-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Analyze Your {data.title} — Free</h2>
            <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
              Upload your document and get an instant analysis: risks, red flags, missing clauses, and a plain English summary. No login required.
            </p>
            <Link
              href="/#upload-section"
              className="inline-flex items-center gap-2 bg-white text-[#2D6A4F] font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Upload & Analyze Now <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Frequently Asked Questions — {data.title}
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Contract Types */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Related Contract Types</h2>
            <div className="flex flex-wrap gap-3">
              {data.relatedSlugs.map((relSlug) => (
                <Link
                  key={relSlug}
                  href={`/analyze/${relSlug}`}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-emerald-300 hover:text-[#2D6A4F] text-slate-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {CONTRACT_TITLES[relSlug]} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
              <Link
                href="/contract-types"
                className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-[#2D6A4F] font-medium px-4 py-2 rounded-lg text-sm hover:bg-emerald-100 transition-colors"
              >
                View All Contract Types <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="bg-[#0F172A] text-slate-400 py-12 mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-white">Contract Checked</span>
                </div>
                <p className="text-sm leading-relaxed">Contract analysis for everyone. Free, private, no login needed.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-3 text-sm">Tools</p>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#upload-section" className="hover:text-white transition-colors">Analyze Contract</Link></li>
                  <li><Link href="/contract-types" className="hover:text-white transition-colors">Contract Types</Link></li>
                  <li><Link href="/resources" className="hover:text-white transition-colors">Free Templates</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3 text-sm">Learn</p>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3 text-sm">Legal</p>
                <ul className="space-y-2 text-sm">
                  <li><span>Not Legal Advice</span></li>
                  <li><span>Privacy Policy</span></li>
                  <li><span>Terms of Service</span></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-xs">
              &copy; {new Date().getFullYear()} Contract Checked. Contract analysis tool. Not legal advice.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
