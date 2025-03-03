// pages/privacy-policy.js
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Privacy Policy - AI Pull Requets Review</title>
        <meta name="description" content="Privacy Policy for AI Pull Requets Review" />
      </Head>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          Last Updated: March 03, 2025
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Introduction</h2>
          <p className="text-gray-600">
            Welcome to AI Pull Requets Review ("we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our AI-powered pull request review tool. We are committed to safeguarding your privacy and ensuring compliance with applicable laws and standards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect only the data necessary to provide our services:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li><strong>Authentication Data</strong>: GitHub usernames and OAuth tokens to authenticate users.</li>
            <li><strong>Code Data</strong>: Code diffs, commit messages, and pull request details for analysis.</li>
            <li><strong>Usage Data</strong>: Anonymized analytics to improve app performance (e.g., feature usage frequency).</li>
          </ul>
          <p className="text-gray-600 mt-2">
            We do not collect additional personally identifiable information (PII) unless explicitly required and consented to by you.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            Your information is used to:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Provide AI-driven pull request reviews and suggestions.</li>
            <li>Authenticate your access to GitHub repositories.</li>
            <li>Improve our services through anonymized usage analysis.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Data Security</h2>
          <p className="text-gray-600">
            We implement robust security measures to protect your data:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Data is encrypted in transit (TLS 1.3) and at rest (AES-256).</li>
            <li>AI processing occurs in sandboxed environments or secure cloud instances.</li>
            <li>Regular vulnerability scans and audits are conducted.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Data Retention</h2>
          <p className="text-gray-600">
            Processed data (e.g., code diffs) is retained for a maximum of 30 days for debugging and performance improvement, after which it is automatically deleted. You may request immediate deletion by contacting us at <a href="mailto:anshulkahar2211@gmail.com" className="text-blue-600 hover:underline">anshulkahar2211@gmail.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Sharing Your Information</h2>
          <p className="text-gray-600">
            We do not share your data with third parties except:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>As required to integrate with GitHub for functionality.</li>
            <li>With your explicit consent (e.g., for third-party AI services).</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Your Rights</h2>
          <p className="text-gray-600">
            Under GDPR and similar regulations, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Access your data.</li>
            <li>Request corrections or deletion.</li>
            <li>Opt out of data processing (where applicable).</li>
          </ul>
          <p className="text-gray-600 mt-2">
            Exercise these rights by contacting us at <a href="mailto:anshulkahar2211@gmail.com" className="text-blue-600 hover:underline">anshulkahar2211@gmail.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Compliance</h2>
          <p className="text-gray-600">
            We comply with:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li><a href="https://docs.github.com/en/apps/marketplace/github-marketplace-developer-agreement" className="text-blue-600 hover:underline">GitHub Marketplace Developer Agreement</a></li>
            <li><a href="https://example.com/eu-ai-act-compliance-report.pdf" className="text-blue-600 hover:underline">EU AI Act (Articles 6, 8-17)</a></li>
            <li><a href="https://example.com/gdpr-compliance.pdf" className="text-blue-600 hover:underline">GDPR</a></li>
            <li>SOC 2 Type II (report available upon request).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">8. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy periodically. Changes will be posted here with an updated "Last Updated" date. Significant changes will be communicated via email or app notifications.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">9. Contact Us</h2>
          <p className="text-gray-600">
            For questions or concerns, contact us at <a href="anshulkahar2211@gmail.com" className="text-blue-600 hover:underline">anshulkahar2211@gmail.com</a> or visit our GitHub repository at <a href="https://github.com/AnshulKahar2729/ai-repo" className="text-blue-600 hover:underline">AI Pull Request Review</a>.
          </p>
        </section>
      </div>
    </div>
  );
}