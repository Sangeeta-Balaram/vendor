'use client'
import { motion } from 'framer-motion'
import { ShoppingCart, Sparkles, Zap, Shield } from 'lucide-react'
import { formatINR } from '@/lib/pricing'

const badgeItems = [
  { icon: Zap, label: 'Instant Pricing' },
  { icon: Sparkles, label: 'AI Recommended' },
  { icon: Shield, label: 'Partner First' },
]

const quoteItems = [
  { label: 'Website Design', price: 45000 },
  { label: 'UI/UX Design', price: 20000 },
  { label: 'SEO Optimization', price: 10000 },
  { label: 'Brand Identity', price: 35000 },
  { label: 'Content Writing', price: 15000 },
]

const totalItems = quoteItems.length
const estimatedTotal = quoteItems.reduce((s, i) => s + i.price, 0)

export default function HeroSection() {
  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center px-6 pt-20 pb-12">
      <div className="absolute top-[-300px] left-[-200px] w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-300px] right-[-200px] w-[600px] h-[600px] bg-red-500/8 rounded-full blur-[150px]" />

      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.6fr_1fr] gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200/50 rounded-full text-[11px] font-semibold text-purple-deep uppercase tracking-[.15em] mb-6">
            <span className="w-1.5 h-1.5 bg-purple-deep rounded-full" /> Partner Portal
          </div>
          <h1 className="text-[52px] md:text-[72px] lg:text-[80px] font-extrabold leading-[1.05] tracking-[-.03em] mb-5">
            Build Solutions.
            <br />
            <span className="gradient-text">Get Instant Quotes.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-[520px] leading-relaxed mb-8">
            Select what your client needs, get AI-recommended services, negotiate, generate proposals, and close deals faster.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {badgeItems.map(b => (
              <span key={b.label} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-100 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                <b.icon className="w-3.5 h-3.5 text-purple-500" /> {b.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={scrollToSolutions} className="px-7 py-3 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer">
              Explore Solutions →
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-[360px] shadow-soft rounded-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 px-6 py-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-[.15em]">Your Quote</span>
              <div className="flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-purple-600">{totalItems}</span>
              </div>
            </div>
            <div className="bg-white px-6 py-5">
              {quoteItems.map((item, i) => (
                <div key={item.label} className={`flex justify-between items-center py-2.5 ${i < quoteItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{formatINR(item.price)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3.5 mt-2 border-t-2 border-gray-200">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-[.15em]">Estimated Total</span>
                <span className="text-xl font-extrabold gradient-text-purple">{formatINR(estimatedTotal)}</span>
              </div>
              <button onClick={scrollToSolutions} className="w-full mt-4 py-3 text-sm font-semibold text-white gradient-primary rounded-full transition-all duration-300 cursor-pointer">
                View Full Quote →
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
