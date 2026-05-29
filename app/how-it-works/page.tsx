export default function HowItWorks() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <h1 className="text-[48px] font-extrabold tracking-[-.03em] mb-4">How It Works</h1>
      <p className="text-gray-400 text-lg mb-14">From selecting services to closing deals — the complete partner workflow.</p>
      <div className="space-y-10">
        {[
          { step: '01', title: 'Choose Services', desc: 'Browse 50+ services across technology and creative divisions. Use AI recommendations or answer a few questions to find the perfect fit.' },
          { step: '02', title: 'Get Instant Quote', desc: 'Toggle services on and off to see live pricing. Bundle discounts apply automatically when you select multiple services.' },
          { step: '03', title: 'Negotiate & Close', desc: 'Send counter offers, chat via WhatsApp, or schedule a call. Once agreed, generate a professional proposal instantly.' },
          { step: '04', title: 'Generate Proposal', desc: 'Auto-generated proposals with your branding, pricing breakdown, terms, and delivery timeline. Export as PDF.' },
          { step: '05', title: 'Sign Agreement', desc: 'Digital contract with e-signature. Set commission rates, contract duration, and scope of work.' },
          { step: '06', title: 'Onboard & Deliver', desc: 'Structured onboarding checklist, milestone tracking, and client management tools for smooth delivery.' },
        ].map(item => (
          <div key={item.step} className="flex gap-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">{item.step}</div>
            <div>
              <h3 className="text-lg font-bold mb-1.5">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
