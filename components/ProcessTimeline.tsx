'use client'
import { motion } from 'framer-motion'
import { Search, FileText, Handshake, CheckCircle, Settings, UserCheck, ArrowRight } from 'lucide-react'

const steps = [
  { icon: Search, label: 'Choose', desc: 'Pick services or AI-recommended' },
  { icon: FileText, label: 'Quote', desc: 'See instant pricing' },
  { icon: Handshake, label: 'Negotiate', desc: 'Send offers or chat' },
  { icon: CheckCircle, label: 'Proposal', desc: 'Auto-generated document' },
  { icon: Settings, label: 'Agreement', desc: 'Digital contract' },
  { icon: UserCheck, label: 'Onboarding', desc: 'Kickoff & delivery' },
]

const colors = [
  { border: 'border-purple-400', icon: 'text-purple-500', numBg: 'bg-purple-deep' },
  { border: 'border-blue-400', icon: 'text-blue-500', numBg: 'bg-blue-600' },
  { border: 'border-emerald-400', icon: 'text-emerald-500', numBg: 'bg-emerald-600' },
  { border: 'border-orange-400', icon: 'text-orange-500', numBg: 'bg-orange-600' },
  { border: 'border-red-400', icon: 'text-red-500', numBg: 'bg-red-600' },
  { border: 'border-indigo-400', icon: 'text-indigo-500', numBg: 'bg-indigo-600' },
]

export default function ProcessTimeline() {
  return (
    <section id="how-it-works" className="pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 bg-white">
      <div className="max-w-[900px] mx-auto text-center mb-20">
        <h2 className="text-[40px] md:text-[48px] font-extrabold tracking-[-.03em] mb-4">How it works</h2>
        <p className="text-gray-400 text-lg">From selection to delivery in 6 simple steps.</p>
      </div>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center lg:items-start gap-4 lg:gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2 lg:gap-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center text-center w-full lg:w-[120px]"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 ${colors[i].border} flex items-center justify-center mb-3 relative bg-white shadow-sm`}>
                  <s.icon className={`w-6 h-6 md:w-7 md:h-7 ${colors[i].icon}`} />
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${colors[i].numBg} text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white`}>{i + 1}</div>
                </div>
                <h4 className="text-sm md:text-base font-bold mb-0.5 md:mb-1.5">{s.label}</h4>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium">{s.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block w-5 h-5 flex-shrink-0 text-transparent fill-none"
                  style={{ stroke: 'url(#arrowGrad)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}