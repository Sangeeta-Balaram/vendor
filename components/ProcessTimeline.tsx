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

export default function ProcessTimeline() {
  return (
    <section id="how-it-works" className="pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-6 bg-white">
      <div className="max-w-[900px] mx-auto text-center mb-8 md:mb-20">
        <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-[-.03em] mb-4">How it works</h2>
        <p className="text-gray-400 text-sm md:text-lg">From selection to delivery in 6 simple steps.</p>
      </div>
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile: vertical timeline */}
        <div className="md:hidden max-w-[400px] mx-auto">
          {steps.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-4 relative pb-8 last:pb-0"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-[17px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400" />
              )}
              <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 bg-white shadow-sm ${
                i === 0 ? 'border-purple-400' : i === 1 ? 'border-blue-400' : i === 2 ? 'border-emerald-400' : i === 3 ? 'border-orange-400' : i === 4 ? 'border-red-400' : 'border-indigo-400'
              }`}>
                <s.icon className={`w-4 h-4 ${
                  i === 0 ? 'text-purple-500' : i === 1 ? 'text-blue-500' : i === 2 ? 'text-emerald-500' : i === 3 ? 'text-orange-500' : i === 4 ? 'text-red-500' : 'text-indigo-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i === 0 ? 'bg-purple-deep' : i === 1 ? 'bg-blue-600' : i === 2 ? 'bg-emerald-600' : i === 3 ? 'bg-orange-600' : i === 4 ? 'bg-red-600' : 'bg-indigo-600'
                  }`}>{i + 1}</span>
                  <h4 className="text-sm font-bold">{s.label}</h4>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 ml-7">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop/tablet: horizontal row */}
        <div className="hidden md:flex md:justify-center md:items-start gap-2 md:px-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center text-center w-[120px]"
              >
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center mb-3 relative bg-white shadow-sm ${
                  i === 0 ? 'border-purple-400' : i === 1 ? 'border-blue-400' : i === 2 ? 'border-emerald-400' : i === 3 ? 'border-orange-400' : i === 4 ? 'border-red-400' : 'border-indigo-400'
                }`}>
                  <s.icon className={`w-7 h-7 ${
                    i === 0 ? 'text-purple-500' : i === 1 ? 'text-blue-500' : i === 2 ? 'text-emerald-500' : i === 3 ? 'text-orange-500' : i === 4 ? 'text-red-500' : 'text-indigo-500'
                  }`} />
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white ${
                    i === 0 ? 'bg-purple-deep' : i === 1 ? 'bg-blue-600' : i === 2 ? 'bg-emerald-600' : i === 3 ? 'bg-orange-600' : i === 4 ? 'bg-red-600' : 'bg-indigo-600'
                  }`}>{i + 1}</div>
                </div>
                <h4 className="text-base font-bold mb-1.5">{s.label}</h4>
                <p className="text-xs text-gray-500 font-medium">{s.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 flex-shrink-0 text-transparent fill-none"
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