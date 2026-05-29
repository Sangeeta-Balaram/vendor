import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-[40px] font-extrabold tracking-[-.03em] mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 29, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <Section title="1. Acceptance of Terms">
          By accessing or using The Revieree Studios website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </Section>

        <Section title="2. Description of Services">
          <p>The Revieree Studios provides branding, web development, marketing, content creation, and related digital services. Our platform allows users to:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mt-2">
            <li>Explore service solutions and pricing</li>
            <li>Generate customized quotes and proposals</li>
            <li>Access partner resources and tools</li>
            <li>Track negotiations, agreements, and project onboarding</li>
            <li>Schedule consultations via Calendly</li>
          </ul>
        </Section>

        <Section title="3. User Responsibilities">
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>Provide accurate and complete information when using our forms</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the platform in compliance with all applicable laws</li>
            <li>Not misuse or abuse the platform, including attempting unauthorized access</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <p>All content, trademarks, logos, and intellectual property on this website are owned by or licensed to The Revieree Studios. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
        </Section>

        <Section title="5. Quotes and Proposals">
          <p>Quotes generated through our platform are estimates valid for the period stated in the proposal. Final pricing may be adjusted based on scope changes, requirements gathering, and negotiation. All proposals are subject to written agreement before work commences.</p>
        </Section>

        <Section title="6. Partner Portal">
          <p>Access to the partner portal is granted to verified partners. Partner accounts are non-transferable. We reserve the right to suspend or terminate access for violation of these terms. Partner resources provided through the portal are for internal use only.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>The Revieree Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.</p>
        </Section>

        <Section title="8. Indemnification">
          <p>You agree to indemnify and hold harmless The Revieree Studios, its officers, employees, and agents from any claims, damages, or expenses arising from your use of the platform or violation of these terms.</p>
        </Section>

        <Section title="9. Termination">
          <p>We reserve the right to suspend or terminate access to our platform at any time, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.</p>
        </Section>

        <Section title="10. Governing Law">
          <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the courts of Mumbai, Maharashtra.</p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform after changes constitutes acceptance of the new terms.</p>
        </Section>

        <Section title="12. Contact">
          <p>For questions about these Terms of Service, please contact us:</p>
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
