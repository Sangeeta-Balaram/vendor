import Link from 'next/link'
import { solutions } from '@/lib/pricing'
import { Palette, Globe, Clapperboard, Image, Printer, TrendingUp, Bot, Package, Settings, Lightbulb } from 'lucide-react'

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

export default function SolutionsPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-24">
      <h1 className="text-[48px] font-extrabold tracking-[-.03em] mb-4 text-center">All Solutions</h1>
      <p className="text-gray-400 text-lg text-center mb-16">Choose a path to get started.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solutions.map(s => (
          <Link key={s.slug} href={`/solutions/${s.slug}`} className="group block bg-white border border-gray-100 rounded-[24px] p-8 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/8 transition-all duration-300 hover:-translate-y-1.5">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>{iconMap[s.icon] || <Package strokeWidth={1} />}</div>
            <h3 className="text-base font-bold mb-1.5">{s.title}</h3>
            <p className="text-sm text-gray-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
