export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  featuredImage?: string;
}

const post1Content = `# 12 Rental Agreement Red Flags Landlords Hope You Miss

Signing a lease is one of the most consequential things you'll do this year — and most renters do it in under twenty minutes. Landlords and property management companies have had their agreements drafted by lawyers whose job is to protect the landlord. Your job is to find the clauses that could cost you hundreds or thousands before you hand over your first cheque.

Here are 12 specific red flags to look for, with real examples of problematic language.

## 1. The Automatic Renewal Trap

Many leases convert automatically to a new fixed term — often 12 months — if you don't provide written notice by a specific date. That notice period is often buried deep in the document and can be as long as 90 days before expiry.

> ⚠️ **Red Flag:** *"Unless Tenant provides written notice of non-renewal no later than 90 days prior to the end of the Term, this Agreement shall automatically renew for an additional twelve (12) month term at the then-current market rate."*

If you miss this window by even one day, you can be on the hook for another full year. Before signing, find this clause and calendar the notice deadline.

## 2. Vague Repair Responsibilities

Provincial landlord-tenant legislation generally requires landlords to maintain the unit in a good state of repair. But leases often try to shift maintenance costs — pest control, appliance servicing, minor plumbing — onto the tenant through loose language.

> ⚠️ **Red Flag:** *"Tenant is responsible for all repairs and maintenance below $200 in value."*

The problem isn't just the dollar amount — it's what counts. Does a slow drain clog count? A furnace filter? A broken door handle? Without a specific list, this clause can be used to dodge legitimate repair obligations. Ask for a schedule of what's included, or strike the clause entirely.

## 3. Excessive Penalty Fees

Late fees, NSF fees, key replacement fees, and administrative fees can stack up fast. Many jurisdictions cap late fees or prohibit them entirely for residential tenancies, but landlords include them anyway hoping tenants won't know their rights.

> ⚠️ **Red Flag:** *"A late fee of $10 per day shall accrue from the date rent is due until paid in full, plus a $75 administrative processing fee."*

On a $2,000/month unit, a two-week late payment could trigger $140 in daily fees plus $75 administrative — $215 total. In Ontario, for example, this is illegal; landlords can only charge rent, not late fees. Know your province or state's rules before signing.

## 4. Illegal Clauses You Don't Need to Follow

Leases frequently contain clauses that are unenforceable because they conflict with statutory tenant protections — but tenants don't know this and comply anyway.

Common illegal clauses include: prohibiting guests entirely, waiving the landlord's duty to provide heat, requiring tenants to pay for repairs that are the landlord's obligation by law, or waiving your right to a hearing before eviction.

**The key principle:** If a clause in a lease conflicts with your jurisdiction's residential tenancies legislation, the legislation wins — the clause is void. But you need to know what the law says. Run your lease through Contract Checked to flag clauses that may conflict with standard tenant protections.

## 5. Security Deposit Abuses

Security deposit rules vary significantly by jurisdiction, but landlords regularly abuse them. Watch for: deposits that exceed the legal maximum (typically one or two months' rent), vague language about what constitutes "damage" beyond normal wear and tear, and no requirement to provide an itemized deduction statement.

> ⚠️ **Red Flag:** *"Landlord may deduct from the security deposit any amounts for cleaning, damage, unpaid rent, or any other amounts owed by Tenant, at Landlord's sole discretion."*

"At Landlord's sole discretion" with no itemization requirement is a recipe for losing your deposit. The clause should specify a timeline for returning the deposit (typically 10–30 days after move-out), require an itemized statement, and define "damage" as distinct from normal wear and tear.

## 6. Entry Notice Requirements (or Lack Thereof)

Most jurisdictions require landlords to give 24 hours' written notice before entering a unit except in emergencies. Leases sometimes try to reduce this window or expand what counts as an "emergency."

> ⚠️ **Red Flag:** *"Landlord reserves the right to enter the premises at any time for inspections, repairs, or to show the unit to prospective tenants or buyers."*

This clause essentially eliminates your right to privacy. In most Canadian provinces and U.S. states, this is unenforceable — but you'll have a fight on your hands if you try to enforce your rights against a landlord who thinks they have this power.

## 7. Subletting Restrictions That Trap You

Life happens — job transfers, relationship changes, financial hardship. If your lease prohibits subletting or assignment outright, you may be financially trapped if you need to leave before your term ends.

> ⚠️ **Red Flag:** *"Tenant shall not assign this lease or sublet the premises or any part thereof without the prior written consent of the Landlord, which consent may be withheld in the Landlord's sole and absolute discretion."*

In many jurisdictions, landlords cannot unreasonably withhold consent to sublet or assign. "Sole and absolute discretion" language attempts to eliminate this protection. Check your local legislation — and if subletting matters to you, negotiate this clause before signing.

## 8. Lease-Break Penalties That Exceed Actual Loss

Breaking a lease early is sometimes unavoidable. The question is what it costs. Penalty clauses that require you to pay all remaining rent (rather than just the landlord's actual losses) are often unenforceable — but you'll spend months fighting to recover money you paid under duress.

> ⚠️ **Red Flag:** *"In the event Tenant vacates the premises prior to the end of the Term, Tenant shall be liable for all remaining rent due under this Agreement plus a lease-break fee of two months' rent."*

Most jurisdictions require landlords to *mitigate* — meaning they have to try to re-rent the unit. If they re-rent immediately, you shouldn't owe the full remaining term. The "plus a lease-break fee" on top is almost certainly unenforceable. Negotiate this to a reasonable notice period (30–60 days) instead.

## 9. Utility Responsibility Gaps

Who pays for what utility — and what happens when there's a dispute — is often poorly drafted. Vague language like "Tenant pays utilities" without specifying which ones can lead to surprise bills for water, garbage, or common area electricity.

Before signing, get a complete list: heat, hydro/electricity, water, sewer, garbage, cable infrastructure, and parking. Any utility not listed as the landlord's responsibility should be assumed to be yours — and you should know the typical monthly cost before committing.

## 10. Pet Clauses That Trap You

"No pets" clauses are common, but some jurisdictions (notably Ontario) prohibit landlords from enforcing them. More insidious are pet clauses that permit a pet but charge a non-refundable "pet deposit" — which may be prohibited by local security deposit rules — or reserve the right to revoke pet permission at any time.

> ⚠️ **Red Flag:** *"Permission to keep one (1) domestic cat is granted subject to Landlord's ongoing approval. Landlord may revoke this permission upon 30 days' notice if Tenant's pet causes any complaint from other tenants."*

"Any complaint" is an impossibly low bar. One neighbour with a grudge could trigger this clause. If you have pets, push for written permission that can only be revoked for documented, material harm to the property.

## 11. Landlord Right-to-Sell Clauses

When a landlord sells the property, what happens to your lease? In most jurisdictions, a lease runs with the property — the new owner takes over as landlord. But some leases include clauses that allow the landlord to terminate early if they want to sell.

> ⚠️ **Red Flag:** *"Landlord may terminate this Agreement upon 60 days' written notice in the event Landlord wishes to list the property for sale or if a bona fide purchaser requires vacant possession."*

"Bona fide purchaser requires vacant possession" is an extremely low threshold that can effectively be manufactured. Know your jurisdiction's rules on termination for sale — many require actual occupation by the new owner, not just a desire for vacant possession.

## 12. Joint and Several Liability for Roommates

If you're signing with roommates, pay close attention to this one. Joint and several liability means each of you is individually responsible for the *entire* rent — not just your share. If your roommate stops paying, your landlord can pursue *you* for 100% of the rent.

> ⚠️ **Red Flag:** *"All persons signing this Agreement as Tenant are jointly and severally liable for all obligations under this Agreement, including payment of rent in full."*

This is standard in co-tenancy situations and is generally enforceable. What you can do: have a separate roommate agreement that spells out each person's share, how shared expenses are handled, and what happens if one person needs to leave early.

## Before You Sign

The clauses above are exactly the kind of issues that get missed in a quick read. Upload your lease to **Contract Checked** before you sign — our AI analysis flags problematic clauses in plain English so you know what you're agreeing to before it's too late.

## Related Guides

- [Rental Agreement Analysis: What to Check](/analyze/rental-agreement)
- [Browse All Contract Types](/contract-types)
- [Resources & Templates](/resources)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post2Content = `# Employment Contract Negotiation: What You Can (and Must) Push Back On

You got the offer. Congratulations. Now comes the part most people skip: actually reading the employment contract before they sign it.

Employment agreements are drafted by the company's lawyers to protect the company. That doesn't mean every clause is unfair — but it does mean there are several provisions you should always scrutinize, and a number you should actively negotiate before your start date.

Here's what experienced professionals push back on, and how to do it.

## Non-Compete Scope and Duration

Non-competes are the single most negotiated clause in employment agreements — and for good reason. A poorly drafted non-compete can prevent you from working in your industry for one to two years after leaving.

> ⚠️ **Red Flag:** *"Employee shall not, for a period of two (2) years following termination, directly or indirectly engage in any business that competes with Company in any market in which Company operates or intends to operate."*

Two problems here: "any market in which Company operates or **intends to operate**" is effectively unlimited geographic scope, and "directly or indirectly" can be construed to prohibit working for a competitor even in a completely unrelated role.

**What to push for:** Limit the geographic scope to the specific territory you actually served. Limit the role restriction to roles that are actually competitive (e.g., "the same or substantially similar role" rather than "any role"). Push to reduce duration — six to twelve months is generally considered reasonable; two years is aggressive.

Note: Non-competes are unenforceable in California and increasingly restricted in other U.S. states. In Canada, courts frequently strike down overbroad non-competes. Enforceability depends heavily on scope and consideration.

## IP Assignment Clauses That Steal Your Side Projects

Most employment agreements include an intellectual property assignment provision — and most people don't read it carefully enough. These clauses typically assign to your employer all IP you create "in connection with your employment" or "using company resources."

> ⚠️ **Red Flag:** *"Employee hereby assigns to Company all right, title, and interest in any inventions, works of authorship, or developments created during the term of employment, whether or not created during working hours or using Company resources."*

"Whether or not created during working hours or using Company resources" is the killer phrase. Under this clause, the mobile app you built on weekends using your own laptop could belong to your employer.

**What to push for:** Request a carve-out for side projects: "Notwithstanding the foregoing, the parties agree that the IP assignment does not apply to inventions or works: (a) developed entirely on Employee's own time; (b) without using Company equipment or resources; and (c) that do not relate to Company's current or reasonably anticipated business." Many companies will accept this language — especially for technical roles. Come to the negotiation with a list of any existing side projects you want explicitly excluded.

## At-Will vs. For-Cause Termination

In most U.S. states, employment is at-will by default — meaning either party can end the relationship at any time, for any reason. But a contract can modify this. Know what your contract actually says.

**At-will language:** "Employment is at-will and may be terminated by either party at any time, with or without cause, with or without notice."

**For-cause protection:** "Company may terminate Employee's employment only for Cause. 'Cause' means: (a) material breach of this Agreement; (b) conviction of a felony; or (c) willful misconduct materially harmful to Company."

For-cause protection is significantly better. If you're in a senior role or moving to a risky startup, push for it — or at minimum, push for a defined notice period (typically 30–90 days) that gives you runway to find your next role.

## Severance: What's Guaranteed vs. Discretionary

Many employment agreements include severance language that sounds generous but is actually discretionary — meaning the company can decide not to pay it.

> ⚠️ **Red Flag:** *"In the event of termination without cause, Company may, at its discretion, provide a severance payment equivalent to [X] weeks of base salary."*

"May, at its discretion" means they don't have to. Push to replace "may" with "shall." Also check whether severance is conditioned on signing a release — which is common and generally acceptable, as long as you understand you're trading any legal claims you might have for the severance payment.

## Bonus Clawback Provisions

Signing bonuses and retention bonuses often come with clawback provisions — meaning if you leave before a certain date, you have to repay some or all of the bonus. This is legitimate. What's not legitimate is an overly aggressive clawback schedule or clawbacks triggered by termination without cause.

> ⚠️ **Red Flag:** *"If Employee voluntarily resigns or is terminated for any reason within 24 months of the Start Date, Employee shall repay 100% of the signing bonus within 30 days of separation."*

"Terminated for any reason" would require you to repay the bonus even if *they* fire you without cause. Push to limit clawbacks to voluntary resignation only, and negotiate a pro-rated schedule (e.g., 50% after 12 months, 0% after 24 months).

## Garden Leave Clauses

Garden leave (also called "gardening leave") requires you to keep working — technically — but stay away from the office and clients during your notice period. You continue to be paid but cannot start your next job.

This can be reasonable in sensitive roles. But combined with a long notice period, it can be used to functionally impose a non-compete without calling it one.

**What to push for:** If you have a garden leave clause, push to limit the notice period (and thus the garden leave period) to a reasonable window. Clarify that garden leave does *not* extend any non-compete period — they should run concurrently, not consecutively.

## Mandatory Arbitration Waivers

Many employment agreements require you to arbitrate any disputes rather than sue in court. Class action waivers are particularly concerning — they prevent you from joining with other employees in collective claims.

> ⚠️ **Red Flag:** *"Any dispute arising from or relating to Employee's employment shall be resolved exclusively through binding individual arbitration, and Employee waives any right to participate in a class or collective action."*

Arbitration often favors employers statistically, and class action waivers mean you can't join with colleagues who experienced the same issue (e.g., wage theft, discrimination). Negotiating this out entirely is difficult at large companies, but worth attempting at smaller employers or in senior roles.

## Non-Solicitation Breadth

Non-solicitation clauses prevent you from recruiting your colleagues or soliciting your employer's clients after you leave. The problem is breadth.

> ⚠️ **Red Flag:** *"Employee shall not, for two (2) years after termination, directly or indirectly solicit, hire, or engage any person who is or was an employee of Company during the preceding 24 months."*

"Was an employee...during the preceding 24 months" means this clause covers people who already left the company before you did. Combined with "indirectly," it could prevent you from joining a company where a former colleague already works. Push to narrow this to employees you directly managed or had substantial business contact with.

## Before You Sign Your Offer

Employment contracts are long, and the problematic clauses are rarely in the main body — they're in the schedules, exhibits, and defined terms. Run your offer letter and employment agreement through **Contract Checked** to get a plain-English breakdown of every clause before you sign.

The cost of negotiating these terms before you start is zero. The cost of discovering you can't take your next job because of an overbroad non-compete is enormous.

## Related Guides

- [Employment Contract Analysis: What to Look For](/analyze/employment-contract)
- [NDA Guide: Mistakes That Can Backfire](/blog/nda-mistakes-that-backfire)
- [Browse All Contract Types](/contract-types)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post3Content = `# NDA Mistakes That Backfire: What Both Parties Get Wrong

Non-disclosure agreements are among the most commonly signed — and most poorly drafted — contracts in business. People treat them as formalities. They're not. A badly written NDA can expose you to liability for sharing information you thought was public, prevent you from working in your field, or give the other party a weapon they can use against you for years.

Here's what both sides routinely get wrong.

## Overly Broad Definitions of "Confidential Information"

The most consequential clause in any NDA is the definition of confidential information. Vague or overbroad definitions are the root cause of most NDA disputes.

> ⚠️ **Red Flag:** *"Confidential Information means all information, in any form, disclosed by one party to the other, whether or not marked as confidential, including but not limited to business plans, financial data, technical information, customer lists, and any other information that may be of value to the disclosing party."*

"Any other information that may be of value" essentially covers everything. Under this definition, you could be in breach for mentioning in conversation that you met with the company — because that meeting itself could be considered confidential information "of value."

**What good language looks like:** Confidential information should be defined with specificity, should require marking (or at minimum, oral notice followed by written confirmation within a reasonable time), and should clearly exclude information that: (a) was already known to the recipient; (b) became public through no fault of the recipient; (c) was independently developed by the recipient; or (d) was disclosed to the recipient by a third party without restriction.

## Indefinite Duration NDAs

"This Agreement shall remain in effect in perpetuity" is language that appears in real NDAs — and should be a non-starter. Information doesn't stay confidential forever. Reasonable NDA durations depend on the nature of the information.

For most commercial relationships, two to five years is standard. For genuinely sensitive trade secrets, five years may be appropriate. "Perpetual" NDAs create ongoing legal risk and are increasingly viewed by courts with suspicion — especially when applied to information that has since become publicly available.

> ⚠️ **Red Flag:** *"The obligations of confidentiality under this Agreement shall continue indefinitely and shall survive any termination or expiration of this Agreement."*

Push to define a specific term. If the disclosing party insists on perpetual protection for specific categories (e.g., source code, formulas), agree to those categories explicitly while limiting the duration for general business information.

## No Carve-Outs for Public Domain Information

Related to the above: a well-drafted NDA always includes explicit carve-outs for information that is, or becomes, publicly available. Without these carve-outs, you can technically be in breach of an NDA for repeating something that appeared in a newspaper.

The standard carve-outs are:
- Information that is publicly known at the time of disclosure
- Information that becomes publicly known after disclosure through no fault of the receiving party
- Information independently developed by the receiving party without reference to the confidential information
- Information received from a third party not subject to confidentiality obligations
- Information required to be disclosed by law or court order (with notice to the disclosing party)

If any of these are missing from the NDA you're signing, insist on adding them.

## Missing Residuals Clauses (For Technical NDAs)

A residuals clause allows the receiving party to use information retained in the *unaided memory* of people who had access to the confidential information — without copying or referencing the confidential documents.

This matters enormously in technology and consulting contexts. If your team evaluates a client's technology and then you later build something in the same space, you need protection against claims that you "used" their confidential information simply because your engineers were exposed to it.

> ⚠️ **Red Flag (by omission):** An NDA for a technical evaluation with no residuals clause, combined with a broad confidential information definition, can create a landmine for your company's future development work.

Not all NDAs need residuals clauses — they're most relevant in technical, product, or R&D contexts. If you're in those fields, make sure your legal team evaluates whether one is appropriate.

## Unilateral vs. Mutual NDAs: When It Matters

A mutual NDA creates obligations for *both* parties. A unilateral NDA creates obligations only for the receiving party.

Unilateral NDAs make sense when only one party is disclosing sensitive information — a startup sharing its pitch deck with investors, for example. Mutual NDAs make sense when both parties will share sensitive information in the course of evaluating a potential partnership.

The mistake both parties make: a vendor sends a unilateral NDA when the relationship will require the client to share sensitive operational data; the client signs without noticing they have no protection. Always check which way the obligations run before signing.

## Geographic Scope

Most standard NDAs are silent on geographic scope — which means they apply everywhere. In most cases this is fine. But for NDAs in regulated industries or cross-border transactions, geographic scope can matter for enforceability.

In the EU, for example, an NDA that purports to restrict disclosure in ways that conflict with GDPR's data subject rights provisions may be unenforceable in that jurisdiction. Know where both parties operate before you sign.

## Remedies and Injunctive Relief Clauses

Many NDAs include a provision acknowledging that breach would cause "irreparable harm" and that the disclosing party is entitled to injunctive relief without the need to post a bond.

> ⚠️ **Red Flag:** *"Receiving Party acknowledges that any breach of this Agreement would cause irreparable harm to Disclosing Party for which monetary damages would be an inadequate remedy, and Disclosing Party shall be entitled to seek injunctive relief without the requirement to post a bond or other security."*

Injunctive relief can freeze your business operations while a dispute is pending. Pre-agreeing that harm is "irreparable" removes the court's discretion to assess whether actual harm occurred. Consider whether this language is appropriate for the information being shared, and push back on the "no bond" requirement.

## What Makes an NDA Unenforceable

Courts regularly refuse to enforce NDAs for the following reasons:
- **Overbreadth:** If the definition of confidential information is so broad it's effectively unlimited, courts may refuse to enforce it at all.
- **No legitimate interest:** NDAs must protect a genuine confidential interest, not simply prevent a party from doing business.
- **Unconscionability:** NDAs signed under duress or with significantly unequal bargaining power can be challenged.
- **Missing consideration:** In some jurisdictions, an NDA signed after employment begins (without additional consideration) may not be enforceable.

## When NDAs Are Weaponized

This is the issue that has received significant public attention: NDAs used to prevent employees from disclosing workplace misconduct. Many jurisdictions now have legislation limiting the enforceability of NDAs that prevent disclosure of sexual harassment, discrimination, or other serious misconduct.

If you're asked to sign an NDA that contains language purporting to prevent you from reporting workplace misconduct to regulators or law enforcement, that clause is likely unenforceable — and its presence is itself a red flag.

## The NDA vs. Non-Compete Confusion

NDAs and non-compete agreements are different things that are often confused — or deliberately conflated. An NDA restricts disclosure of information. A non-compete restricts working for competitors.

Some NDAs include non-compete language buried in definitions or use clauses. If you're signing what's presented as an NDA and you see language about "not engaging in competitive activity" or "not working for competitors," you're looking at a non-compete provision — with all the scrutiny that entails.

**Run your NDA through Contract Checked** before signing. Our analysis specifically identifies whether an NDA contains non-compete provisions, whether the duration is reasonable, and whether standard carve-outs are present.

## Related Guides

- [NDA Analysis: What to Watch For](/analyze/nda)
- [Partnership Agreement Guide](/analyze/partnership-agreement)
- [Employment Contract Red Flags](/blog/employment-contract-negotiation-guide)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post4Content = `# The Freelancer Contract Checklist: Every Clause You Need Before Starting Work

You landed the client. You're excited to get started. The client wants to begin immediately — "we'll sort out the paperwork." Stop.

More freelancers lose money to bad contracts than to bad clients. The two are often the same problem: a client who seemed reasonable but had an agreement that gave them every advantage. Here is every clause you need to check — and several you need to add — before you do a single hour of paid work.

## Payment Terms and Late Fees

The most important part of any freelance contract is when and how you get paid.

**What to specify:**
- Payment schedule: on delivery, milestone-based, or net-30/net-15
- Invoice method and requirements
- Accepted payment methods
- Late payment interest (1.5–2% per month is standard)
- What triggers the invoice (delivery, approval, or calendar date)

> ⚠️ **Red Flag:** *"Payment shall be made within a reasonable time after delivery of the work."*

"Reasonable time" is not a payment term. It's an invitation to delay indefinitely. Specify "net-15" or "net-30 from date of invoice," and include a late fee that gives the client a financial incentive to pay on time.

A 50% upfront deposit for new clients is standard practice and reasonable to ask for. For projects over $5,000, consider milestone payments tied to deliverables rather than a single end-of-project payment.

## Kill Fee Clauses (Project Cancellation)

What happens if the client cancels mid-project? Without a kill fee clause, you may have invested significant time and delivered nothing billable.

A kill fee is a percentage of the total project fee that the client owes if they cancel after work has begun. Standard kill fee structures:
- If cancelled before work begins: 25% of project fee
- If cancelled after work is 25–50% complete: 50% of project fee
- If cancelled after work is 50%+ complete: 75–100% of project fee

> ⚠️ **Red Flag (by omission):** A contract with no cancellation provision. If the client pulls the project with no notice after you've spent three weeks on it, you have no contractual basis for payment.

If the client resists kill fee language, frame it as a mutual protection: it also gives them a clear off-ramp if the relationship isn't working.

## Scope Creep Protection

Scope creep — the gradual expansion of project requirements without corresponding adjustment to fees — is the most common way freelancers lose money. Your contract needs to define:

1. What is included in scope (specific deliverables, formats, quantities)
2. What constitutes an out-of-scope request
3. How out-of-scope requests are priced and approved
4. The process for formalizing scope changes (a written change order)

> ⚠️ **Red Flag:** *"Freelancer will complete all work reasonably required to achieve the project objectives."*

"All work reasonably required" gives the client unlimited ability to expand scope. Define deliverables specifically: not "a website" but "a five-page WordPress website with specified features." Every additional page, feature, or revision round is billable.

## IP Ownership: The Work-for-Hire Trap

This is the clause that can define your entire career trajectory if you're not careful.

Under copyright law in most jurisdictions, the person who creates a work owns it — unless it is created under a "work for hire" arrangement or is explicitly assigned to the client. Many freelance contracts include broad IP assignment language that transfers not just the final deliverable but all underlying work, processes, and methods.

> ⚠️ **Red Flag:** *"All work product, including all drafts, source files, concepts, and methodologies developed in connection with this Agreement, shall be the sole and exclusive property of Client, and Freelancer hereby assigns all right, title, and interest therein to Client."*

**What good IP language looks like for freelancers:** The client gets ownership of the final, approved deliverable. You retain ownership of your tools, pre-existing work, and general methodologies. You keep the right to display the work in your portfolio (unless the client has a legitimate confidentiality interest).

If a client wants to own your source code, your sketch files, your raw footage, or your training data — that's fine, but price it accordingly. Deliverable-only licensing is the default; full assignment is a premium.

## Revision Limits

Unlimited revisions is a recipe for scope creep and burnout. Your contract should specify the number of revision rounds included in the quoted price and your hourly rate for additional revisions.

**A reasonable structure:**
- Two rounds of revisions included per major deliverable
- Additional revisions billed at $[X] per hour
- A "revision" is defined as changes to existing content; new directions constitute a new project phase

Define what counts as a "revision" vs. a "new direction." A client who wants to change the entire concept after three rounds of feedback is not requesting a revision — they're requesting a new project.

## Client Approval Timelines

If the client doesn't approve work within a reasonable time, does the project stall indefinitely? Does your payment get delayed? Your contract should specify:

- A response deadline for approvals (typically 5–10 business days)
- Deemed approval: if no response within X days, work is deemed approved
- The impact of delays on project timeline and delivery dates

> ⚠️ **Red Flag (by omission):** A contract that specifies your delivery deadlines but imposes no timelines on the client for feedback or approval. This creates a situation where you can be held in breach for late delivery even when the delay was caused by the client's slow feedback.

## Confidentiality Scope

Many clients include broad NDAs in their freelance agreements. Before signing:

- Check what information you're restricted from disclosing
- Check whether you can discuss the client relationship publicly (for your portfolio)
- Check whether there's a carve-out for using the work in your portfolio
- Check the duration of the confidentiality obligation

A blanket NDA that prevents you from listing a major client in your portfolio can significantly harm your business. Negotiate a portfolio carve-out explicitly.

## Non-Compete Impact on Freelancers

Some client agreements include non-compete clauses — preventing you from working for competitors during or after the engagement. For freelancers, this can be devastating.

> ⚠️ **Red Flag:** *"During the term of this Agreement and for twelve (12) months thereafter, Freelancer shall not provide services to any company that competes with Client in Client's primary markets."*

A non-compete that covers "Client's primary markets" could effectively remove your entire client base if you work in a specialized industry. Non-competes in freelance agreements are generally less enforceable than employment non-competes, but you'll spend time and money fighting them.

Push to eliminate non-competes entirely, or limit them to: (a) current active clients of Client that you were introduced to through Client, and (b) a maximum of six months.

## Liability Caps

Your contract should limit your financial exposure to the fees you actually received. A client asking you to build a website for $3,000 should not be able to sue you for $300,000 in consequential damages if the website has a bug.

**Standard freelance liability cap:** Freelancer's total liability shall not exceed the total fees paid under this Agreement in the three months preceding the claim.

If the client requires you to carry professional liability (errors and omissions) insurance, confirm the required coverage amounts are reasonable for the scope of work.

## What Happens If the Client Goes Bankrupt

This one most freelancers never think about until it happens. If a client goes into insolvency proceedings before paying you, you become an unsecured creditor — which typically means you recover cents on the dollar, if anything.

Protections:
- Milestone payments reduce your exposure at any given time
- Upfront deposits are generally considered earned and harder to claw back
- In some jurisdictions, unpaid freelancers have priority claims; know your local law

Before doing large projects on net-60 or net-90 terms with a startup or distressed company, assess the credit risk. **Contract Checked** can flag unusual payment terms that increase your financial exposure.

## Related Guides

- [Independent Contractor Agreement: What to Check](/analyze/independent-contractor)
- [Service Agreement Analysis](/analyze/service-agreement)
- [Browse All Contract Types](/contract-types)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post5Content = `# Agreement of Purchase and Sale: 10 Clauses That Can Make or Break Your Deal

Buying a home is the largest financial transaction most people will ever make — and it's governed by a document that most buyers spend less than an hour reviewing. The Agreement of Purchase and Sale (APS) is not a form. It is a legally binding contract, and the clauses in it can cost you your deposit, your deal, or tens of thousands of dollars if they're wrong.

Here are the ten clauses that matter most.

## 1. Financing Condition: The Deadline That Catches Buyers Off Guard

The financing condition gives you the right to walk away from the deal if you can't secure a mortgage on satisfactory terms. But this protection has an expiry — and buyers routinely miss it.

> ⚠️ **Red Flag:** *"This offer is conditional upon the Buyer arranging, at the Buyer's own expense, a new first mortgage for not less than [X]% of the purchase price, bearing interest at a rate of no more than [X]% per annum, amortized over not more than [X] years, on or before [date]. Unless the Buyer gives notice in writing to the Seller that this condition is fulfilled on or before [date], this offer shall be null and void and the deposit shall be returned to the Buyer in full without deduction."*

Two things to watch: First, the waiver deadline — if your lawyer or broker doesn't send the waiver on time, the deal may collapse. Second, the specific mortgage terms. If you're approved for a mortgage at a rate that technically exceeds the rate specified in the condition, you may not be protected. Make sure the interest rate cap in the condition is meaningfully above current rates.

## 2. Inspection Condition: Waiving It Is a Gamble

In competitive markets, buyers are pressured to waive the inspection condition to make their offer more attractive. Sometimes this makes sense. Often it doesn't.

**What you're waiving:** The right to have a qualified home inspector assess the structural, mechanical, and electrical systems of the property — and the right to walk away if they find material issues.

**What you might find too late:**
- Foundation cracks or water infiltration ($10,000–$80,000 to repair)
- Knob-and-tube wiring that insurers won't cover
- HVAC systems at end of life ($5,000–$15,000 to replace)
- Roof near end of life ($8,000–$20,000 to replace)

If you're in a competitive market and considering waiving inspection, at minimum attend a pre-offer viewing with a contractor who can do a visual assessment. Some buyers conduct a pre-offer inspection (coordinated with the listing agent) to get protection without the conditional offer.

## 3. Deposit Forfeiture: When You Lose Your Money

The deposit you pay on acceptance of an APS is typically 5% of the purchase price. If you fail to complete the purchase — other than for a reason protected by a condition — you forfeit this deposit.

> ⚠️ **Red Flag:** *"If the Buyer fails to complete this transaction for any reason other than the Seller's default, the deposit shall be forfeited to the Seller as liquidated damages, and the Seller may also pursue any additional remedies available at law."*

"Pursue any additional remedies" means the seller can sue you for the difference between your offer price and the price they ultimately sell for if the market drops. On a $1M purchase, that could be substantial. Before removing financing and inspection conditions, be confident you can close.

## 4. Closing Date Adjustment Clauses

Closing dates can change — construction delays on a new build, problems with the seller's next purchase, or unforeseen circumstances. How the APS handles closing date adjustments matters.

For resale properties: Who bears the cost of a delay? If the seller can't close on the agreed date, are you entitled to compensation for bridging financing costs or temporary accommodations?

For new construction: Builders typically have extensive rights to push closing dates — sometimes by years — while the buyer's rights to exit are narrowly circumscribed.

> ⚠️ **Red Flag (new construction):** *"Builder reserves the right to extend the Tentative Occupancy Date by up to 365 days in aggregate, with notice provided to Purchaser as required by the Tarion Warranty Corporation."*

While Tarion (in Ontario) provides some framework for this, a one-year extension on a new construction closing can be enormously disruptive to buyers who have sold their existing home, given notice at their rental, or made other plans.

## 5. Chattels and Fixtures: The Stainless Steel Fridge Disappears

Fixtures are items attached to the property (built-in shelving, light fixtures, the furnace). Chattels are moveable items (the fridge, the washer/dryer, window coverings). What stays with the house must be listed in the APS.

> ⚠️ **Red Flag (by omission):** An APS that says the house includes "all existing appliances" without listing them specifically. You arrive on closing day to find a different, older fridge installed.

Be specific: list by brand, type, and location any appliances, light fixtures, window coverings, or other items you expect to remain. Sellers have been known to take items they consider "personal property" that buyers assumed were fixtures. The bathroom mirror. The custom storage unit in the garage. The smart thermostat.

## 6. Status Certificate Conditions for Condominiums

If you're buying a condominium, you should always include a condition allowing you to review the status certificate. This document reveals the financial health of the condo corporation, any pending special assessments, ongoing litigation, and the reserve fund balance.

**What to look for in a status certificate:**
- Reserve fund adequacy (is it underfunded relative to the reserve fund study?)
- Pending or threatened litigation against the corporation
- Special assessments — either passed or under discussion
- Management issues flagged in meeting minutes
- Any arrears among unit owners (which affects the corporation's cash flow)

A condo corporation with a severely underfunded reserve fund may face large special assessments — which become your problem the moment you close. These can run from $5,000 to $50,000+ per unit.

## 7. Title Search Condition: The Protection You Must Keep

Title search conditions give you (through your lawyer) the right to investigate title to the property and raise any objections. This is how you discover:

- Encroachments (a neighbour's fence or structure on your land)
- Easements for utilities, drainage, or access that limit how you can use the property
- Restrictive covenants limiting what can be built
- Outstanding liens from unpaid contractors or taxes

> ⚠️ **Red Flag:** Agreeing to close without a title search, or waiving the right to raise title objections. Your title insurance will cover many issues, but it doesn't give you the right to negotiate adjustments or exit the deal.

Never close without a proper title search conducted by your real estate lawyer.

## 8. Assignment Clauses: Can You Sell Before Closing?

An assignment clause allows you to transfer your rights and obligations under the APS to a third party before closing — effectively selling your contract. This is common in new construction pre-construction condos.

Some sellers (and builders) prohibit assignment outright or impose significant fees. Know this before you sign.

> ⚠️ **Red Flag (new construction):** *"Purchaser shall not assign this Agreement without Builder's prior written consent, which may be withheld in Builder's sole discretion, and a consent fee of $10,000 shall apply."*

If you're purchasing a pre-construction property with any possibility of needing to sell before closing (due to financial changes, relocation, etc.), ensure the assignment clause is either permissive or negotiated.

## 9. Holdback Provisions

A holdback is a sum of money held back from the purchase price (typically in trust with a lawyer) pending the completion of repairs or outstanding items. If the property has known deficiencies that will be repaired after closing, a holdback protects you.

Without a holdback, you're relying on the seller's good faith to complete promised repairs after you've paid. That's a precarious position.

For new construction: deficiency holdbacks are standard practice but need to be specifically documented and managed through the builder's warranty program.

## 10. Representation and Warranty Survival Periods

Sellers make representations in the APS — that they're unaware of any material latent defects, that the property complies with zoning, that there are no outstanding work orders. These representations typically "survive" closing for a limited period.

> ⚠️ **Red Flag:** *"All representations and warranties shall merge with and not survive the completion of this transaction."*

This clause means that the moment you close, the seller's representations are extinguished. If you discover two days after closing that the seller knew about a serious water infiltration problem they didn't disclose, you may have no contractual remedy — only a potential misrepresentation tort claim, which is expensive to pursue.

Push for a representation and warranty survival period of at least 12 months for material issues.

Before signing any Agreement of Purchase and Sale, upload it to **Contract Checked** for a plain-English review of every condition, deadline, and risk provision.

## Related Guides

- [Real Estate APS Analysis: What to Look For](/analyze/real-estate-aps)
- [Purchase Agreement Guide](/analyze/purchase-agreement)
- [Browse All Contract Types](/contract-types)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post6Content = `# Service Agreements: 8 Clauses That Protect Them (Not You)

Every time you hire a service provider — a software vendor, a marketing agency, a maintenance company, a consultant — they hand you a contract they drafted. That contract was written by or for them. Its purpose is to maximize their flexibility and minimize their liability. Your job is to find the clauses that do this and negotiate them before you sign.

Here are eight that appear in nearly every commercial service agreement and almost always favour the provider.

## 1. The Unilateral Amendment Clause

This clause allows the service provider to change the terms of your agreement — pricing, service levels, acceptable use policies, data handling — with minimal notice and no requirement for your consent.

> ⚠️ **Red Flag:** *"Company reserves the right to modify these Terms at any time. Continued use of the Service following notice of such changes shall constitute your acceptance of the modified Terms."*

"Continued use" as acceptance means you agree to any change simply by not cancelling. If the provider raises prices by 30% mid-contract and you keep using the service while you're looking for alternatives, you've legally accepted the new pricing. This clause is particularly common in SaaS agreements.

**What to push for:** Any material change to pricing or service levels should require your affirmative written consent. At minimum, push for a termination right without penalty if you don't accept a material change.

## 2. Auto-Renewal With Punishing Cancellation Windows

Service agreements almost universally auto-renew — usually for the same term as the original contract (meaning a one-year contract renews for another year). The cancellation window is often 30–90 days before the renewal date, and missing it locks you in for another full term.

> ⚠️ **Red Flag:** *"This Agreement shall automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least 90 days prior to the end of the then-current term."*

If your contract renews on January 1st and you miss the October 2nd deadline by a single day, you're committed to another $25,000 contract year. Many companies deliberately bury the renewal date and notice period in the agreement, knowing that clients won't track it.

**What to push for:** Shorten the cancellation notice window to 30 days. Add a requirement that the provider send a renewal reminder at least 60 days before the cancellation window opens. Negotiate a pro-rated exit if you miss the window.

## 3. Limitation of Liability That Leaves You Exposed

Providers limit their liability in service agreements — this is normal and generally acceptable. The problem is when the limitation is so low that it doesn't meaningfully compensate you for a material failure.

> ⚠️ **Red Flag:** *"In no event shall Provider's total liability to Client for any claims arising under this Agreement exceed the fees paid by Client in the one (1) month preceding the claim."*

One month of fees. If you're paying $2,000/month and the provider's platform goes down for a week during your biggest sales period, your maximum recovery is $2,000. The actual business losses could be ten times that.

**What to push for:** Cap at 3–12 months of fees, depending on the criticality of the service. For mission-critical integrations (payment processing, core infrastructure), negotiate higher caps or require the provider to carry appropriate insurance.

## 4. One-Way Indemnification

Indemnification clauses require one party to defend and compensate the other for specific types of claims. Standard service agreements include indemnification from you to the provider (you indemnify them if your use of the service causes third-party claims) but often provide no reciprocal indemnification.

> ⚠️ **Red Flag:** *"Client shall indemnify, defend, and hold harmless Provider from any claims arising from Client's use of the Service, Client's breach of this Agreement, or Client's violation of any law."*

This is entirely one-directional. The provider owes you nothing if their service infringes a third party's intellectual property, if their negligence causes you harm, or if their data breach exposes your customer data.

**What to push for:** Mutual indemnification. The provider should indemnify you for: claims arising from their negligence or misconduct, IP infringement in their service, and data security incidents caused by their failures.

## 5. IP Ownership in Custom Deliverables

If you're paying a service provider to build something for you — a custom software module, a website, a marketing campaign — who owns what gets built?

Under copyright law, the developer/creator owns the work by default unless there is an explicit written assignment. Many service agreements contain clauses that retain IP ownership for the provider while granting you only a license.

> ⚠️ **Red Flag:** *"All work product and deliverables created under this Agreement shall be the exclusive property of Provider. Client is granted a non-exclusive, non-transferable license to use such deliverables solely in connection with Client's internal business operations."*

If you paid $50,000 for a custom software platform and this clause applies, you own a license — not the software. The provider can license the same code to your competitors. If the relationship ends, your license may terminate with it.

**What to push for:** For custom deliverables built specifically to your specifications, insist on IP assignment to you. For templates, frameworks, or pre-existing tools the provider incorporates, a license is appropriate — but the custom layer should be yours.

## 6. "Reasonable Efforts" vs. Guaranteed Outcomes

Service providers routinely promise to "use reasonable efforts" or "use commercially reasonable efforts" to achieve outcomes rather than guaranteeing them. These phrases sound like commitments but are legally weak.

> ⚠️ **Red Flag:** *"Provider shall use commercially reasonable efforts to achieve the performance metrics outlined in Schedule A."*

"Commercially reasonable efforts" means "we'll try, but if we don't achieve it, we're not in breach." If Schedule A says response times of under 200ms and the provider consistently delivers 500ms, they can argue they "tried."

**What to push for:** Define specific, measurable service levels (SLAs) with consequences for breach — typically service credits proportional to the duration and severity of non-performance. "Shall achieve" is a much stronger standard than "shall use reasonable efforts to achieve."

## 7. Dispute Resolution That Favors Them

Mandatory arbitration clauses and choice-of-venue provisions can make it prohibitively expensive for you to pursue legitimate claims.

> ⚠️ **Red Flag:** *"Any dispute arising from this Agreement shall be resolved by binding arbitration in [Provider's Home City], under the rules of [Arbitration Body]. Each party shall bear its own costs."*

If you're a company in Toronto and the provider is in San Francisco, mandatory arbitration in San Francisco with each party bearing its own costs effectively means small and medium disputes go uncontested — the cost of pursuing them exceeds the value of the claim.

**What to push for:** Arbitration in a neutral location, or virtual arbitration. Fee-sharing for arbitration costs. A carve-out for small claims (under $25,000) where regular court proceedings are more efficient. And critically — make sure you have the right to seek injunctive relief in court without being limited to arbitration.

## 8. Termination for Convenience on Short Notice

Service providers often reserve the right to terminate the agreement "for convenience" — meaning without any cause — on very short notice.

> ⚠️ **Red Flag:** *"Provider may terminate this Agreement for any reason upon 14 days' written notice to Client."*

If you've built your operations around this service — integrated their API, trained your team, migrated your data — a 14-day exit window is a crisis. They can walk away from a one-year contract with two weeks' notice while your cancellation penalty is six months.

**What to push for:** If the provider has a for-convenience termination right, you should have an equivalent right on equivalent terms. If the contract has a minimum term, the provider's for-convenience termination should be limited or should trigger compensation for your transition costs.

Upload your service agreement to **Contract Checked** before you sign. Our analysis flags these eight clauses — and others — so you can negotiate before you're locked in.

## Related Guides

- [Service Agreement Analysis: What to Check](/analyze/service-agreement)
- [Independent Contractor Agreement Guide](/analyze/independent-contractor)
- [Browse All Contract Types](/contract-types)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post7Content = `# Starting a Business Partnership? These Contract Clauses Will Save Your Relationship

Most business partnerships don't fail because the business failed. They fail because two people who trusted each other enough to start a company together never wrote down how they would handle disagreements, exits, and the thousand decisions that lie between "let's do this" and a thriving business.

A properly drafted partnership or shareholders' agreement won't prevent every dispute. But it will provide a framework for resolving them — without destroying the business or the relationship in the process.

Here are the clauses you need before you take a dollar from investors, sign a lease, or tell anyone you have a business partner.

## Capital Contributions: Who Puts In What, When

The first question in any partnership is deceptively simple: what is each partner contributing, and on what timeline?

Capital contributions can be cash, property, intellectual property, or "sweat equity" (time and expertise). The problem arises when contributions aren't documented and partners develop different memories of what was agreed.

> ⚠️ **Red Flag (by omission):** A partnership formed on a handshake with no documentation of who contributed what to the initial capital, and no mechanism for future capital calls.

**What to specify:**
- Initial capital contribution for each partner (cash value, or method for valuing in-kind contributions)
- Timeline for any deferred contributions
- What happens if a partner can't make a required capital call — dilution, loan, or mandatory buy-out?
- Whether partners earn a return on contributed capital before profit sharing kicks in

The valuation of non-cash contributions (particularly IP and "sweat equity") is where partnerships most often go sideways early. Get an agreed methodology in writing.

## Profit and Loss Allocation

Profit allocation is not necessarily the same as equity ownership. You can own 50% of a company and agree to allocate 60% of profits to one partner because they have a higher workload or contributed more capital.

More importantly, *loss* allocation matters: are losses allocated equally? Proportionally to capital? And critically — are partners required to fund ongoing losses, or do losses simply reduce their equity stake?

> ⚠️ **Red Flag:** *"Profits and losses shall be distributed equally among the partners."*

This isn't wrong on its face — but it's dangerously incomplete. Equal profit sharing is often appropriate at founding; it frequently becomes inappropriate as roles and contributions diverge. Your agreement should include a mechanism for revisiting profit allocation annually or upon material change in partners' roles.

## Decision-Making Authority Thresholds

Which decisions can one partner make unilaterally? Which require unanimous consent? Which require a majority? Every partnership needs a clear decision-making framework.

**Typical structure:**

*Day-to-day operational decisions:* Any partner with operational authority can act alone up to a defined limit (e.g., purchase orders under $5,000).

*Material decisions:* Require majority partner approval (taking on debt, new significant contracts, hiring key employees).

*Major decisions:* Require unanimous consent (admitting new partners, selling the business, fundamental changes to business direction, making capital calls above threshold amounts).

Without this structure, a partner with de facto control can bind the business — and their co-partners — to decisions the others would never have approved.

## Deadlock Resolution Mechanisms

What happens when partners disagree and neither will yield? In a 50/50 partnership, this is called a deadlock — and without a resolution mechanism, it can literally paralyze the business.

**Common deadlock mechanisms:**

*Russian Roulette (Buy-Sell):* Either partner can trigger a buy-sell by naming a price. The other partner must either buy the triggering partner's shares at that price or sell their own shares at that price. This mechanism encourages fair pricing because you don't know which side you'll be on.

*Shotgun:* Functionally similar to Russian Roulette — one partner names a price, the other must buy or sell.

*Independent Valuation:* Appoint an independent valuator; the majority (or highest bidder among partners) buys out the minority at the determined value.

*Tie-Breaking Director:* Add an independent director whose vote breaks deadlocks. This is common in 50/50 ventures where neither partner wants a buy-out mechanism.

> ⚠️ **Red Flag (by omission):** A 50/50 partnership agreement with no deadlock resolution mechanism. If the partners disagree on a fundamental issue, the only resolution may be a court-supervised winding up of the company.

## Partner Exit and Buyout Provisions

People leave businesses. They get sick, get divorced, get a better offer, or simply change direction. Your partnership agreement needs to address every exit scenario before any of them happen.

**Key provisions to include:**

*Voluntary exit:* Can a partner simply resign? With how much notice? What are they owed?

*Valuation method for buyout:* Book value? Earnings multiple? Independent appraisal? The method matters enormously — a business worth $2M on an earnings multiple might be worth $400K at book value.

*Right of first refusal:* Before a partner can sell to an outside party, the remaining partners must have the right to buy at the same price.

*Drag-along rights:* If a majority of partners agree to sell the company, they can require minority partners to sell on the same terms. This prevents a minority partner from blocking a legitimate sale.

*Tag-along rights:* If a majority partner sells their stake, minority partners have the right to sell on the same terms. This prevents a majority partner from exiting at a premium while the minority gets stuck with a new partner they didn't choose.

> ⚠️ **Red Flag:** A buyout provision that values shares at book value only, with no goodwill or earnings multiple consideration. In a services business, this virtually guarantees an unfair exit for any departing partner.

## Non-Compete During and After Partnership

Partners are often each other's greatest competitive threat. Your agreement should address whether a departing partner can immediately start a competing business.

Non-competes in partnership/shareholders' agreements are generally more enforceable than employment non-competes — because partners are treated as principals who made a deliberate commercial choice, not employees who were in a position of lesser power.

Reasonable terms: 12–24 months following departure, limited to the company's actual market, covering the specific role the partner played (not the entire industry).

## Intellectual Property Ownership

All IP used in or created for the business should be owned by the company — not by individual partners. This sounds obvious but is frequently overlooked.

> ⚠️ **Red Flag:** A partnership where one partner owns the core IP (patent, software, brand) in their personal name and licenses it to the business. If that partner exits, they can revoke the license and the business collapses.

Ensure that all IP — including the founder's pre-existing IP that forms the core of the business — is either assigned to the company or subject to an irrevocable, perpetual license that survives any partner's departure.

## Fiduciary Duty Clauses

Partners owe each other fiduciary duties — duties of loyalty, good faith, and fair dealing. These duties exist at common law, but your agreement should reinforce them and define specific obligations:

- Obligation to disclose conflicts of interest
- Prohibition on self-dealing (taking business opportunities for personal benefit)
- Obligation to act in the best interest of the partnership, not individual partners

Corporate structures (corporations vs. general partnerships) affect the nature and extent of these duties. Get legal advice appropriate to your jurisdiction.

## The Dissolution Process

If the partnership ends — whether by mutual agreement, court order, or triggering of a buy-sell mechanism — how does it wind down?

Specify: who manages the dissolution process, how assets are valued and distributed, how liabilities are handled, and what happens to the business name and IP.

## Personal Guarantee Exposure

One of the most under-discussed risks in early-stage businesses: **personal guarantees**. When a company borrows money or signs a commercial lease, lenders and landlords often require the partners to personally guarantee the obligations.

Know before you sign: which partners are personally guaranteeing which obligations, what the maximum exposure is, and whether joint-and-several liability means one partner can be pursued for the full amount.

Review your partnership agreement *and* any guarantee documents with **Contract Checked** and with a qualified business lawyer before committing. The 30 minutes you spend now can prevent years of dispute.

## Related Guides

- [Partnership Agreement Analysis: What to Look For](/analyze/partnership-agreement)
- [NDA Guide for Business Partners](/analyze/nda)
- [Browse All Contract Types](/contract-types)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

const post8Content = `# How to Review Any Contract in 30 Minutes: A Practical Step-by-Step Framework

Most people either skip reading contracts entirely or read them once, top to bottom, without a framework — which means they spend a lot of time but still miss the things that matter.

A better approach: use a structured review process that tells you exactly what to look for, in what order, and what questions to ask. Done properly, you can evaluate any standard contract in 30 minutes and know exactly where the risks are.

Here's the framework.

## Before You Start: Set Up for Success

**Print or use a reading mode.** Dense legal text is harder to review on a bright screen. If you can, use a PDF reader or print the document.

**Have a notepad.** You're going to flag questions and concerns as you go. Write them down; don't trust your memory.

**Know your jurisdiction.** Some clauses that are standard in one province or state are unenforceable or illegal in another. If you're not sure about your local rules, note the clause for follow-up.

---

## Step 1: Identify the Parties, Date, and Purpose (3 minutes)

Before you read a single clause, answer three questions:

1. **Who are the parties?** Are they named correctly? Is the party you're dealing with the same entity that's signing the contract? (A subsidiary signing doesn't bind the parent company.)

2. **What is the effective date?** When does the contract begin? Is there a term? Does it end automatically or does it need to be terminated?

3. **What is the fundamental purpose?** One sentence: "This contract obligates [Party A] to [do X] in exchange for [Party B] paying [Y] by [Z]."

If you can't summarize the contract's purpose in one sentence, you need to read more carefully before proceeding.

**Watch for:** Contracts backdated to a date before you received them. Parties defined in unexpected ways (e.g., "Company and its subsidiaries and affiliates" — you may be contracting with a group of entities, not just one).

---

## Step 2: Map Your Obligations — What YOU Must Do (5 minutes)

Find every clause that creates an obligation for *you*. These are the "shall," "must," "agrees to," and "is responsible for" provisions that apply to your side.

Make a list:
- What must you deliver, and by when?
- What standards of quality or performance are you held to?
- What representations are you making (statements of fact you're certifying as true)?
- What are the notice requirements (when must you inform the other party of issues)?
- What are your payment obligations?

> ⚠️ **Red Flag:** Obligations defined by reference to a standard you can't control — "industry best practices," "the highest professional standards," or "as Client may direct from time to time." The last one is particularly dangerous: it means the other party can unilaterally change what you're obligated to do.

This step is where you assess whether the contract is asking you to do things you actually can do. If you can't perform an obligation, you need to negotiate it out or get clarity before signing.

---

## Step 3: Find the Money — Every Payment Term, Fee, and Penalty (5 minutes)

Money provisions are scattered throughout contracts — in the main body, in schedules, in renewal clauses, and in default provisions. Find all of them.

**What to look for:**
- The primary price or fee: is it fixed, variable, or formula-based?
- Payment schedule: net-30? On delivery? Milestone-based?
- What triggers invoices?
- Late payment consequences: interest, service suspension, acceleration of all amounts due?
- Price increase provisions: can the other party raise prices mid-contract?
- Taxes: who pays? Are prices inclusive or exclusive of applicable taxes?
- Expense reimbursement: what's covered, what's the approval process, what's the cap?
- Penalties and liquidated damages clauses

> ⚠️ **Red Flag:** *"Company reserves the right to adjust pricing upon 30 days' notice."* This is unilateral price adjustment with no limit and no termination right. You should have the right to exit without penalty if you don't accept a material price increase.

---

## Step 4: Look for the Exits — Termination and Cancellation Rights (5 minutes)

How does this contract end? This is one of the most important sections and one of the most commonly ignored.

**Questions to answer:**
- What is the initial term? When does it expire?
- Does it auto-renew? On what notice can you prevent renewal?
- Can you terminate for convenience (i.e., because you want to)? With how much notice?
- Can you terminate for cause (i.e., because the other party breached)? What process is required?
- Can *they* terminate for convenience? On what notice?
- What are the consequences of termination — payments owed, IP returned, transition obligations?

Make a note of all deadlines related to termination and put them in your calendar immediately.

> ⚠️ **Red Flag:** A contract where you must give 90 days' cancellation notice but they can cancel on 30 days — creating an asymmetric exit. Or a contract where termination for cause requires you to provide notice and a cure period, but doesn't impose the same obligation on the other party.

---

## Step 5: Find the Traps — Auto-Renewal, IP, Non-Compete, Arbitration (7 minutes)

This is the step most people skip — and where the most costly surprises live.

### Auto-Renewal Traps
Already covered in Step 4, but worth a second pass: find the exact renewal date and the exact notice window. Write both in your calendar *now*.

### Intellectual Property
Who owns what gets created? If you're creating anything for the other party — content, code, designs, strategies — the IP clause determines whether you own your work.

> ⚠️ **Red Flag:** *"All work product shall be a work made for hire and shall vest in Company upon creation."* "Upon creation" means ownership transfers before you're even paid. And "all work product" may include methodologies and approaches you'll need for future clients.

### Non-Compete and Non-Solicitation
Is there language preventing you from working with competitors, hiring the other party's employees, or soliciting their clients?

**Check:** How broad is the restriction? What's the duration? What geographic area? Is "competitor" defined, and how broadly?

### Dispute Resolution
Where do disputes go? Mandatory arbitration? Which jurisdiction's courts? Are you waiving a jury trial? Is there a class action waiver?

> ⚠️ **Red Flag:** A contract governed by the laws of a jurisdiction where you have no presence, requiring disputes to be resolved by arbitration in that jurisdiction. This makes it effectively impossible for you to enforce your rights economically.

### Governing Law and Jurisdiction
Related to the above: make sure you understand which jurisdiction's laws govern the contract and where you'd have to go to litigate if needed.

---

## Step 6: Check What's Missing (3 minutes)

Contracts can be unfair by omission as much as by commission. Ask yourself what standard protections you'd expect that aren't present.

**Common missing clauses by contract type:**

*Service agreements:* SLAs with remedies, IP assignment to you for custom deliverables, data security obligations, transition assistance on termination.

*Employment agreements:* For-cause termination standard, severance, non-compete limitations, IP carve-outs for personal projects.

*Lease agreements:* Repair and maintenance obligations with specificity, security deposit return timeline and conditions, subletting rights.

*Freelance contracts:* Kill fee, revision limits, client approval timelines, liability cap.

*Purchase agreements:* Inspection rights, financing conditions, representation survival periods.

---

## Step 7: Red Flag Summary — Your 5-Minute Gut Check

Before you finish, run through this quick mental checklist:

- [ ] Are there any clauses I didn't understand after two reads?
- [ ] Are there unlimited or uncapped liability provisions?
- [ ] Are there obligations I genuinely can't perform?
- [ ] Is there significant asymmetry — they can do things I can't?
- [ ] Are there missing standard protections for my contract type?
- [ ] Are there any clauses that feel designed to create a trap?

Any "yes" is a question to raise with the other party or a lawyer before signing.

---

## The 30-Minute Contract Review Checklist

**Step 1 (3 min) — Parties, Date, Purpose**
- [ ] Correct party names and legal entities
- [ ] Effective date and term
- [ ] One-sentence purpose summary

**Step 2 (5 min) — Your Obligations**
- [ ] List of deliverables with deadlines
- [ ] Performance standards
- [ ] Notice requirements
- [ ] Representations you're making

**Step 3 (5 min) — Money**
- [ ] Primary price/fee
- [ ] Payment schedule
- [ ] Late payment consequences
- [ ] Price adjustment provisions
- [ ] Penalties and liquidated damages

**Step 4 (5 min) — Exits**
- [ ] Term and auto-renewal details
- [ ] Your cancellation rights and notice windows
- [ ] Their cancellation rights
- [ ] Termination consequences

**Step 5 (7 min) — Traps**
- [ ] IP ownership provisions
- [ ] Non-compete and non-solicitation
- [ ] Dispute resolution and arbitration
- [ ] Governing law and jurisdiction

**Step 6 (3 min) — Missing Protections**
- [ ] Standard clauses for your contract type that are absent

**Step 7 (2 min) — Red Flag Summary**
- [ ] Any clauses you don't understand?
- [ ] Unlimited liability?
- [ ] Unperformable obligations?
- [ ] Significant asymmetry?

---

Want a faster path to the same result? Upload your contract to **Contract Checked** and our AI will run through this framework for you — flagging risks, explaining clauses in plain English, and highlighting what's missing. It takes less than two minutes and is completely free.

## Related Guides

- [Browse All Contract Types](/contract-types)
- [Resources & Contract Templates](/resources)
- [Rental Agreement Red Flags](/blog/rental-agreement-red-flags)

## Analyze Your Contract Before You Sign

Don't navigate this alone. Upload your contract to Contract Checked and get an instant plain-English analysis — free, no login required. [Analyze your contract now →](https://contractchecked.com/#upload-section)`;

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "12 Rental Agreement Red Flags Landlords Hope You Miss",
    slug: "rental-agreement-red-flags",
    excerpt: "Before you sign that lease, know these 12 red flags — from automatic renewal traps to illegal clauses landlords hope you won't notice.",
    content: post1Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2025-10-01",
    readTime: 10,
    tags: ["Rental Agreements", "Tenant Rights", "Lease Review"],
    category: "Rental Agreements",
    seoTitle: "12 Rental Agreement Red Flags Landlords Hope You Miss",
    seoDescription: "Signing a lease? Know these 12 rental agreement red flags — automatic renewal traps, illegal clauses, security deposit abuse, and more. Protect yourself before signing.",
    keywords: ["rental agreement red flags", "lease agreement problems", "what to look for in a lease", "signing a lease checklist", "tenant rights rental agreement"]
  },
  {
    id: "2",
    title: "Employment Contract Negotiation: What You Can (and Must) Push Back On",
    slug: "employment-contract-negotiation-guide",
    excerpt: "Just received a job offer? Here's what experienced professionals negotiate in every employment agreement — from non-competes to IP clauses.",
    content: post2Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2025-11-01",
    readTime: 10,
    tags: ["Employment Law", "Contract Negotiation", "Job Offers"],
    category: "Employment Law",
    seoTitle: "Employment Contract Negotiation: What to Push Back On Before You Sign",
    seoDescription: "Got a job offer? Learn which employment contract clauses to negotiate — non-competes, IP assignment, severance, bonus clawbacks, and more. Expert guide.",
    keywords: ["employment contract negotiation", "job offer negotiation", "employment agreement clauses", "non-compete agreement negotiation", "what to negotiate in a job offer"]
  },
  {
    id: "3",
    title: "NDA Mistakes That Backfire: What Both Parties Get Wrong",
    slug: "nda-mistakes-that-backfire",
    excerpt: "Most NDAs are either too broad to enforce or too narrow to protect. Here's what both sides consistently get wrong — and how to fix it.",
    content: post3Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2025-11-15",
    readTime: 10,
    tags: ["NDAs", "Non-Disclosure Agreements", "Contract Drafting"],
    category: "NDAs",
    seoTitle: "NDA Mistakes That Backfire: What Both Parties Get Wrong",
    seoDescription: "Avoid costly NDA mistakes — overly broad definitions, indefinite duration, missing carve-outs, and unenforceable clauses. Expert guide for both parties.",
    keywords: ["NDA mistakes", "non-disclosure agreement problems", "NDA red flags", "mutual vs unilateral NDA", "how long should an NDA last", "NDA enforceability"]
  },
  {
    id: "4",
    title: "The Freelancer Contract Checklist: Every Clause You Need Before Starting Work",
    slug: "freelancer-contract-checklist",
    excerpt: "Don't start a single billable hour without these contract protections in place. The complete freelancer contract checklist — payment, IP, scope, and more.",
    content: post4Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2025-12-01",
    readTime: 11,
    tags: ["Freelancing", "Independent Contractor", "Contract Checklist"],
    category: "Freelancing",
    seoTitle: "The Freelancer Contract Checklist: Every Clause You Need Before Starting Work",
    seoDescription: "Every clause a freelancer needs before starting work — payment terms, kill fees, IP ownership, scope creep protection, and liability caps. Complete checklist.",
    keywords: ["freelancer contract checklist", "independent contractor agreement", "freelance contract must-haves", "client contract red flags freelancer", "invoice payment terms contract"]
  },
  {
    id: "5",
    title: "Agreement of Purchase and Sale: 10 Clauses That Can Make or Break Your Deal",
    slug: "real-estate-purchase-agreement-guide",
    excerpt: "The APS is the most important contract you'll ever sign. Here are 10 clauses that determine whether your home purchase succeeds or falls apart.",
    content: post5Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2025-12-15",
    readTime: 11,
    tags: ["Real Estate", "Home Buying", "APS Review"],
    category: "Real Estate",
    seoTitle: "Agreement of Purchase and Sale: 10 Clauses That Can Make or Break Your Deal",
    seoDescription: "Before you make an offer on a home, understand these 10 APS clauses — financing conditions, deposit forfeiture, chattels disputes, and more. Expert homebuyer guide.",
    keywords: ["agreement of purchase and sale", "real estate contract clauses", "APS red flags", "conditions in real estate offer", "home purchase agreement review", "real estate contract problems"]
  },
  {
    id: "6",
    title: "Service Agreements: 8 Clauses That Protect Them (Not You)",
    slug: "service-agreement-problems",
    excerpt: "Every service agreement is drafted for the provider's benefit. Here are 8 clauses that routinely leave clients exposed — and how to negotiate them.",
    content: post6Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2026-01-15",
    readTime: 10,
    tags: ["Service Contracts", "Vendor Agreements", "Contract Review"],
    category: "Service Contracts",
    seoTitle: "Service Agreements: 8 Clauses That Protect Them, Not You",
    seoDescription: "Hiring a service provider? These 8 service agreement clauses are designed to protect the vendor, not you. Learn what to negotiate before signing.",
    keywords: ["service agreement red flags", "service contract problems", "consulting agreement review", "vendor contract review", "service agreement liability clauses"]
  },
  {
    id: "7",
    title: "Starting a Business Partnership? These Contract Clauses Will Save Your Relationship",
    slug: "partnership-agreement-must-haves",
    excerpt: "Most partnerships fail not because the business failed, but because there was no agreement for when things got hard. Here's what every partnership contract needs.",
    content: post7Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2026-02-15",
    readTime: 11,
    tags: ["Business Law", "Partnership Agreements", "Startup Contracts"],
    category: "Business Law",
    seoTitle: "Starting a Business Partnership? Contract Clauses That Will Save Your Relationship",
    seoDescription: "Starting a business with a partner? These partnership agreement clauses — buyout provisions, deadlock resolution, IP ownership — protect both your business and relationship.",
    keywords: ["partnership agreement must-haves", "business partnership contract", "partnership agreement clauses", "starting a business with a partner contract", "partnership buyout clause"]
  },
  {
    id: "8",
    title: "How to Review Any Contract in 30 Minutes: A Practical Step-by-Step Framework",
    slug: "how-to-review-any-contract",
    excerpt: "A structured 7-step framework for reviewing any contract quickly and confidently — including a printable checklist you can use every time.",
    content: post8Content,
    author: "Contract Checked Legal Team",
    publishedAt: "2026-03-15",
    readTime: 12,
    tags: ["Contract Basics", "Contract Review", "Legal Tips"],
    category: "Contract Basics",
    seoTitle: "How to Review Any Contract in 30 Minutes: A Step-by-Step Framework",
    seoDescription: "Learn how to review any contract in 30 minutes with this practical 7-step framework. Includes a printable checklist covering obligations, money, exits, and traps.",
    keywords: ["how to review a contract", "contract review checklist", "reading a contract for the first time", "contract review process", "what to look for when signing a contract"]
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = blogPosts.map(post => post.category);
  return [...new Set(categories)];
};

export const getRecentBlogPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};
