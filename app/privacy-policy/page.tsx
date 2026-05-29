import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-[40px] font-extrabold tracking-[-.03em] mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 29, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <Section title="1. Introduction">
          The Revieree Studios (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
        </Section>

        <Section title="2. Information We Collect">
          <p className="mb-2">We collect information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>Fill out contact or booking forms (name, email, phone number, company name)</li>
            <li>Request a quote or proposal (name, email, phone, company, service preferences)</li>
            <li>Access the partner portal (name, phone number)</li>
            <li>Communicate with us via email or other channels</li>
          </ul>
          <p className="mt-2">We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is anonymized and used for analytics purposes only.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>To provide, operate, and maintain our services</li>
            <li>To process and respond to your inquiries and quote requests</li>
            <li>To generate proposals and PDF documents</li>
            <li>To manage partner accounts and track resource access</li>
            <li>To improve our website and service offerings</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="4. Data Storage and Security">
          <p>Your data is stored securely in Supabase (PostgreSQL) with row-level security enabled. We implement the following security measures:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mt-2">
            <li>All data transmitted over TLS/HTTPS encryption</li>
            <li>Server-side authentication for all administrative functions</li>
            <li>Row-level security policies in the database</li>
            <li>HTTP-only, secure cookies for session management</li>
            <li>Strict Content Security Policy headers</li>
          </ul>
        </Section>

        <Section title="5. Data Sharing">
          <p>We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for analytics purposes. We may disclose information if required by law or to protect our rights.</p>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain your personal information for as long as necessary to provide services and fulfill the purposes described in this policy. You may request deletion of your data by contacting us.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
        </Section>

        <Section title="8. Cookies">
          <p>We use essential cookies for session management and authentication. We do not use tracking cookies or third-party advertising cookies. The Calendly booking widget may set its own cookies; please refer to Calendly&apos;s privacy policy for details.</p>
        </Section>

        <Section title="9. Lodge a Complaint">
          <p>If you believe we have violated data protection laws or mishandled your personal information, you have the right to lodge a complaint with your local data protection authority.</p>
          <p className="mt-2">For users in India, you may contact:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mt-2">
            <li><strong>Ministry of Electronics &amp; Information Technology (MeitY)</strong> — <a href="https://www.meity.gov.in" className="text-purple-600 hover:underline">www.meity.gov.in</a></li>
          </ul>
          <p className="mt-2">We encourage you to reach out to us first at <a href="mailto:sangeeta@thereviereestudios.in" className="text-purple-600 hover:underline">sangeeta@thereviereestudios.in</a> so we can address your concerns directly.</p>
        </Section>

        <Section title="10. Contact Us">
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <p className="mt-2">
            Email: sangeeta@thereviereestudios.in<br />
            Phone: +91 91564 72904
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  )
}
