'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { formatINR } from '@/lib/pricing'

const plans = [
  { name: 'Starter', price: 25000, desc: 'For small projects and single services', features: ['Up to 3 services', 'Basic support', '2 revisions', '7-day delivery'], popular: false },
  { name: 'Partner', price: 65000, desc: 'For growing agencies and regular clients', features: ['Up to 10 services', 'Priority support', '5 revisions', '14-day delivery', 'White-label option'], popular: true },
  { name: 'Enterprise', price: 0, desc: 'For large-scale projects and dedicated teams', features: ['Unlimited services', 'Dedicated PM', 'Unlimited revisions', 'Custom timeline', 'API access', 'SLA guarantee'], popular: false, custom: true },
]

export default function PricingPage() {
  const [selected, setSelected] = useState('Partner')
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-24">
      <h1 className="text-[48px] font-extrabold tracking-[-.03em] mb-4 text-center">Transparent Pricing</h1>
      <p className="text-gray-400 text-lg text-center mb-16">Pay only for what you need. No hidden fees.</p>
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {plans.map(p => (
          <motion.div key={p.name} whileHover={{ y: -4 }}
            className={`rounded-[24px] p-8 border-2 cursor-pointer relative ${selected === p.name ? 'border-purple-500 bg-purple-50/30 shadow-xl shadow-purple-500/8' : 'border-gray-100 bg-white'}`}
            onClick={() => setSelected(p.name)}
          >
            {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-[10px] font-bold text-white px-4 py-1 rounded-full">Most Popular</div>}
            <h3 className="text-xl font-bold mb-1 mt-1.5">{p.name}</h3>
            <div className="text-3xl font-extrabold gradient-text mb-1">{p.custom ? 'Custom' : formatINR(p.price)}</div>
            {p.custom && <div className="text-xs text-gray-400 mb-1">Let&apos;s talk</div>}
            <p className="text-xs text-gray-400 mb-6">{p.desc}</p>
            <ul className="space-y-2.5 mb-8">
              {p.features.map(f => <li key={f} className="flex items-center gap-2 text-xs text-gray-500"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> {f}</li>)}
            </ul>
            <button className={`w-full py-2.5 text-sm font-semibold rounded-full ${selected === p.name ? 'gradient-primary text-white' : 'border border-gray-200 text-gray-600'}`}>
              {p.custom ? 'Contact Us' : 'Get Started'}
            </button>
          </motion.div>
        ))}
      </div>
      <div className="bg-gray-100 rounded-[24px] p-10 text-center">
        <h3 className="text-xl font-bold mb-1.5">All plans include:</h3>
        <p className="text-gray-400 text-sm mb-5">15% partner commission, AI recommendations, proposal generator, and CRM access.</p>
        <button className="px-6 py-2.5 text-sm font-semibold text-white gradient-primary rounded-full">Become a Partner</button>
      </div>
    </div>
  )
}
