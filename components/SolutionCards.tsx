'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Palette, Globe, Clapperboard, Image, Printer, TrendingUp, Bot, Package, Settings, Lightbulb } from 'lucide-react'
import { solutions } from '@/lib/pricing'

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette strokeWidth={1} />,
  Globe: <Globe strokeWidth={1} />,
  Clapperboard: <Clapperboard strokeWidth={1} />,
  Image: <Image strokeWidth={1} />,
  Printer: <Printer strokeWidth={1} />,
  TrendingUp: <TrendingUp strokeWidth={1} />,
  Bot: <Bot strokeWidth={1} />,
  Package: <Package strokeWidth={1} />,
  Settings: <Settings strokeWidth={1} />,
  Lightbulb: <Lightbulb strokeWidth={1} />,
}

function Card({ s, i }: { s: typeof solutions[number]; i: number }) {
  const creative = s.cat === 'creative'
  return (
    <motion.div className="flex items-stretch relative group" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
      <div className={`absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b blur-xl pointer-events-none ${creative ? 'from-purple-500/20 via-purple-400/10 to-transparent' : 'from-blue-500/20 via-blue-400/10 to-transparent'}`} />
      <Link
        href={`/solutions/${s.slug}`}
        className={`relative w-full h-[220px] flex flex-col rounded-2xl p-[2px] transition-all duration-500 shadow-soft hover:shadow-xl hover:-translate-y-1 overflow-hidden ${creative ? 'bg-gradient-to-br from-purple-300 to-purple-500 hover:from-purple-200 hover:to-purple-400' : 'bg-gradient-to-br from-blue-300 to-blue-500 hover:from-blue-200 hover:to-blue-400'}`}
      >
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-8 text-center relative">
          <div className={`mb-4 transition-all duration-500 [&>svg]:w-8 [&>svg]:h-8 ${creative ? '[&>svg]:stroke-[url(#iconGradCreative)]' : '[&>svg]:stroke-[url(#iconGradTech)]'}`}>
            {iconMap[s.icon] || <Package strokeWidth={1} />}
          </div>
          <h3 className="text-xs font-extrabold mb-4 text-gray-800">{s.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
          <div className={`absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1 ${creative ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SolutionCards() {
  const creative = solutions.filter(s => s.cat === 'creative')
  const tech = solutions.filter(s => s.cat === 'tech')

  return (
    <section id="solutions" className="pt-24 pb-12 px-4 sm:px-8 md:px-20">
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="iconGradCreative" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="iconGradTech" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      <div className="max-w-[900px] mx-auto text-center mb-16">
        <h2 className="text-[40px] md:text-[48px] font-extrabold tracking-[-.03em] mb-4">What does your client need help with?</h2>
        <p className="text-gray-500 text-lg">Choose a goal and we will suggest the best solution.</p>
      </div>

      <div className="max-w-[1400px] mx-auto mb-16">
        <h3 className="text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Creative Excellence</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {creative.map((s, i) => <Card key={s.slug} s={s} i={i} />)}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <h3 className="text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Technology Power</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {tech.map((s, i) => <Card key={s.slug} s={s} i={i} />)}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/solutions" className="inline-block px-6 py-2.5 text-sm font-semibold text-purple-deep hover:text-purple-700 transition-colors">
          Not sure? Answer a few questions →
        </Link>
      </div>
    </section>
  )
}
