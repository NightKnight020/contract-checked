import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | Contract Checked',
  description: 'Learn how Contract Checked handles your contract data, what we collect, and how we protect your privacy.',
  alternates: {
    canonical: 'https://contractchecked.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: April 18, 2026</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-emerald-900 text-sm leading-relaxed">
            <strong>The short version:</strong> We process your contract to give you analysis results. We don&apos;t store your contract permanently, we don&apos;t use it to train AI models, and we don&apos;t sell your data. This policy explains the details.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>When you use Contract Checked, we may collect the following:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li><strong>Contract content:</strong> The text or files you upload for analysis. This is processed temporarily to generate your results and is not stored permanently on our servers.</li>
              <li><strong>Usage data:</strong> Anonymous information about how you interact with the platform — pages visited, features used, browser type, and general geographic region. This is collected via Google Analytics and does not include your contract content.</li>
              <li><strong>Cookies:</strong> We use session cookies and Google Analytics (GA4) cookies to understand how people use the site. No advertising or tracking cookies are used.</li>
              <li><strong>Account information (optional):</strong> If you choose to create an account, we collect your email address for authentication purposes. No account is required to use core analysis features.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
          <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
            <p>Your contract content is used <strong>solely to generate your analysis results</strong>. Specifically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contract text is sent to the Anthropic API to perform the AI-powered analysis.</li>
              <li>Your contract is <strong>not stored permanently</strong> after the analysis session ends.</li>
              <li>Your contract is <strong>not used to train any AI models</strong>, including Anthropic&apos;s models.</li>
              <li>Your contract is <strong>not shared with third parties</strong> beyond the service providers listed in Section 4.</li>
            </ul>
            <p>Usage data is used to understand how people use the platform so we can improve it. It is never linked to your contract content.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Data Retention</h2>
          <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
            <p><strong>Contract content:</strong> Deleted after your analysis session. We do not maintain a database of uploaded contracts. Once you close or navigate away, the content is not retained.</p>
            <p><strong>Server logs:</strong> Standard server access logs (IP address, timestamp, request path) are retained for up to 30 days for security and debugging purposes, then automatically deleted.</p>
            <p><strong>Analytics data:</strong> Aggregated, anonymized usage data retained by Google Analytics per their standard retention policy (26 months by default). This data cannot be linked back to specific contract content.</p>
            <p><strong>Account data:</strong> If you create an account, your email is retained until you request deletion. You can request account deletion at any time by emailing <a href="mailto:support@contractchecked.com" className="text-[#2D6A4F] underline">support@contractchecked.com</a>.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Third-Party Services</h2>
          <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
            <p>Contract Checked uses the following third-party services to operate:</p>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-800 mb-1">Anthropic API</p>
                <p>Powers the AI contract analysis. Your contract text is transmitted to Anthropic&apos;s API for processing. Anthropic does not use API inputs to train their models. See <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline">Anthropic&apos;s Privacy Policy</a> for details.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-800 mb-1">Vercel</p>
                <p>Hosts and serves the Contract Checked platform. Standard server infrastructure; processes requests but does not store contract content. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline">Vercel&apos;s Privacy Policy</a>.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-800 mb-1">Supabase</p>
                <p>Used for optional user authentication only. If you create an account, your email is stored in Supabase. No contract content is stored in Supabase. See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline">Supabase&apos;s Privacy Policy</a>.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-800 mb-1">Google Analytics (GA4)</p>
                <p>Collects anonymized usage data to help us understand site traffic and improve the platform. Uses cookies. No contract content is sent to Google Analytics. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline">Google&apos;s Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Cookies &amp; Tracking</h2>
          <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
            <p>We use the following cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Session cookies:</strong> Required for basic site functionality. Expire when you close your browser.</li>
              <li><strong>Google Analytics cookies (GA4):</strong> Used to measure site traffic and usage patterns anonymously. You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline">Google Analytics Opt-out Browser Add-on</a>.</li>
              <li><strong>Authentication cookies:</strong> Only set if you create an account and log in. Used to keep you logged in.</li>
            </ul>
            <p>We do not use advertising cookies, retargeting cookies, or any cross-site tracking.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Your Rights</h2>
          <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
            <p>Depending on your jurisdiction, you may have the following rights regarding your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Deletion:</strong> Request that we delete your personal data. Note that since contract content is not permanently stored, there is typically nothing to delete after your session.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate account data.</li>
              <li><strong>Opt-out of analytics:</strong> Use the Google Analytics Opt-out Add-on or enable &quot;Do Not Track&quot; in your browser.</li>
              <li><strong>Data portability:</strong> Request a machine-readable copy of your account data.</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:support@contractchecked.com" className="text-[#2D6A4F] underline">support@contractchecked.com</a>. We will respond within 30 days.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Children&apos;s Privacy</h2>
          <div className="text-slate-600 text-sm leading-relaxed">
            <p>Contract Checked is not intended for use by anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us at <a href="mailto:support@contractchecked.com" className="text-[#2D6A4F] underline">support@contractchecked.com</a> and we will delete it promptly.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Contact</h2>
          <div className="text-slate-600 text-sm leading-relaxed">
            <p>For privacy-related questions, requests, or concerns, contact us at:</p>
            <div className="bg-white border border-slate-200 rounded-xl p-4 mt-3">
              <p className="font-semibold text-slate-800">Contract Checked</p>
              <p>Email: <a href="mailto:support@contractchecked.com" className="text-[#2D6A4F] underline">support@contractchecked.com</a></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Changes to This Policy</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">
            <p>We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. For significant changes, we will make reasonable efforts to notify users (such as via a notice on the site).</p>
            <p>Continued use of Contract Checked after changes are posted constitutes acceptance of the updated policy.</p>
          </div>
        </section>

        <div className="border-t border-slate-200 pt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-[#2D6A4F] hover:underline">Terms of Service</Link>
          <Link href="/about" className="text-[#2D6A4F] hover:underline">About Contract Checked</Link>
          <Link href="/" className="text-[#2D6A4F] hover:underline">Back to Home</Link>
        </div>

      </div>

      <SiteFooter />
    </div>
  );
}
