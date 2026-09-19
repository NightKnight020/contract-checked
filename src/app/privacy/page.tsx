import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Contract Checked',
  description: 'Privacy policy for Contract Checked - How we collect, use, and protect your contract data',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: September 19, 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Contract Checked (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides AI-powered contract analysis services. This Privacy Policy explains how we collect, use, store, and protect your information when you use our service.
              </p>
              <p className="text-gray-700">
                By using Contract Checked, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Uploaded Contracts</h3>
              <p className="text-gray-700 mb-4">
                When you upload a contract for analysis, we collect and store:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>The complete uploaded file (PDF, Word, image, or text)</li>
                <li>File metadata (type, size, upload timestamp)</li>
                <li>Extracted text content from your contract</li>
                <li>Analysis results and classifications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Usage Data</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Anonymous session identifiers (not linked to personal identity)</li>
                <li>Analysis performance metrics (duration, success/failure status)</li>
                <li>Error logs for service improvement</li>
                <li>Browser and device information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Information We Do NOT Collect</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Email addresses or personal identifiers (unless you contact us)</li>
                <li>Payment information (service is currently free)</li>
                <li>Geolocation data</li>
                <li>Social media profiles</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use collected information for:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Service Operation:</strong> Processing and analyzing your uploaded contracts</li>
                <li><strong>AI Processing:</strong> Sending contract text to third-party AI services (Anthropic Claude) for analysis</li>
                <li><strong>Service Improvement:</strong> Training and improving our contract classification and analysis algorithms</li>
                <li><strong>Quality Assurance:</strong> Reviewing analysis accuracy and identifying errors</li>
                <li><strong>Analytics:</strong> Understanding usage patterns and popular contract types</li>
                <li><strong>Technical Support:</strong> Debugging issues and improving performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Retention</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Storage</h3>
              <p className="text-gray-700 mb-4">
                Uploaded contracts are stored in secure, private Supabase Storage buckets. Files are:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Not publicly accessible</li>
                <li>Encrypted at rest</li>
                <li>Accessible only to authorized service operators</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Retention Period</h3>
              <p className="text-gray-700 mb-4">
                We retain uploaded contracts and analysis data for approximately <strong>12 months</strong> from the upload date, unless:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>You request deletion (see Section 7)</li>
                <li>Required for legal compliance or dispute resolution</li>
                <li>Needed for service improvement purposes (anonymized)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Deletion</h3>
              <p className="text-gray-700 mb-4">
                After the retention period, contracts are automatically flagged for deletion. Anonymized analytics data may be retained indefinitely for service improvement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 AI Processing</h3>
              <p className="text-gray-700 mb-4">
                We use <strong>Anthropic Claude</strong> for contract analysis. When you upload a contract, the extracted text is sent to Anthropic&apos;s API for processing. Anthropic&apos;s data handling is governed by their privacy policy and terms of service.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Infrastructure Providers</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Vercel:</strong> Hosting and deployment</li>
                <li><strong>Supabase:</strong> Database and file storage</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Analytics</h3>
              <p className="text-gray-700 mb-4">
                We may use Google Analytics to track aggregate usage patterns. No personally identifiable information is shared.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do <strong>NOT</strong>:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Sell your contracts or data to third parties</li>
                <li>Share your contracts with advertisers</li>
                <li>Make your uploaded files publicly accessible</li>
                <li>Use your data for marketing purposes (no email campaigns)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We may disclose information if:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Required by law or legal process</li>
                <li>Necessary to protect our rights or safety</li>
                <li>Part of a business transfer (merger or acquisition)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Data Deletion</h3>
              <p className="text-gray-700 mb-4">
                You may request deletion of your uploaded contracts by contacting us at the email below. We will process deletion requests within 30 days.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Access and Correction</h3>
              <p className="text-gray-700 mb-4">
                Since we use anonymous session IDs, we cannot link specific uploads to your identity unless you provide identifiable information. If you can identify your uploads (e.g., by timestamp or contract content), contact us for access or correction.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Opt-Out of Analytics</h3>
              <p className="text-gray-700 mb-4">
                You may opt out of Google Analytics tracking using browser extensions or privacy tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Encrypted data storage</li>
                <li>Access controls and authentication</li>
                <li>Regular security audits</li>
              </ul>
              <p className="text-gray-700">
                However, no system is 100% secure. Use at your own risk for sensitive or confidential contracts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Our service is not intended for users under 18 years of age. We do not knowingly collect information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Users</h2>
              <p className="text-gray-700">
                Our services are hosted in the United States. By using Contract Checked, you consent to the transfer and processing of your data in the U.S.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the service after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Legal Disclaimer</h2>
              <p className="text-gray-700 font-semibold mb-4">
                ⚠️ Contract Checked provides AI-powered analysis for informational purposes only. Our analysis is NOT legal advice and should NOT be relied upon as a substitute for consultation with qualified legal professionals.
              </p>
              <p className="text-gray-700">
                Always consult with a licensed attorney for legal advice regarding your contracts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For questions about this Privacy Policy, data deletion requests, or other privacy concerns, contact us at:
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-gray-800 font-medium">Email: privacy@contractchecked.com</p>
                <p className="text-gray-700 text-sm mt-2">(Response time: typically within 5 business days)</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
