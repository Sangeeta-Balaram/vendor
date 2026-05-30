'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { services, formatINR } from '@/lib/pricing'

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const dur = 1200
    const step = Math.ceil(value / (dur / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setDisplay(value); clearInterval(timer) } else setDisplay(start)
    }, 16)
    return () => clearInterval(timer)
  }, [value])
  return <span>{formatINR(display)}</span>
}

export default function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>(['web-design', 'uiux', 'seo', 'content-writing'])
  const toggle = useCallback((id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]), [])
  const subtotal = selected.reduce((s, id) => s + (services.find(x => x.id === id)?.price || 0), 0)
  const discount = selected.length >= 3 ? Math.round(subtotal * 0.1) : 0
  const gst = Math.round((subtotal - discount) * 0.18)
  const total = subtotal - discount + gst

  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="pt-10 md:pt-14 pb-16 md:pb-24 px-4 sm:px-6">
      <div className="max-w-[1100px] mx-auto bg-gradient-to-br from-[#0F172A] to-[#050816] rounded-[24px] md:rounded-[32px] p-5 md:p-14">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-white tracking-[-.03em] leading-[1.1] mb-2">
              Build your package.<br />See your price.<br />
              <span className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">Instantly.</span>
            </h2>
            <p className="text-xs text-white/40 mb-4 md:mb-5">Toggle services to build the perfect package for your client.</p>
            <div className="space-y-2 md:space-y-3">
              {[
                'Select the services your client needs',
                'Get an instant AI-recommended quote',
                'Share or save the package',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="text-xs text-white/50">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-3 items-stretch">
            <div className="bg-white/5 backdrop-blur-sm rounded-[20px] p-4 border border-white/5">
              <div className="space-y-1">
                {services.slice(0, 4).map(s => (
                  <label key={s.id} className={`flex items-center justify-between p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${selected.includes(s.id) ? 'bg-purple-600/15 border border-purple-500/20' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}>
                    <div className="flex items-center gap-2">
                      <div onClick={() => toggle(s.id)} className={`w-4 h-4 rounded-lg flex items-center justify-center transition-all ${selected.includes(s.id) ? 'bg-purple-600' : 'bg-white/10 border border-white/20'}`}>
                        {selected.includes(s.id) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white">{s.name}</span>
                        <span className="text-[8px] text-white/30 block leading-none mt-0.5">{s.cat}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white/80">{formatINR(s.price)}</span>
                  </label>
                ))}
              </div>
              <button onClick={scrollToSolutions} className="w-full mt-2 text-[10px] font-semibold text-purple-400 hover:text-purple-300 transition-colors text-center">View all services →</button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-[20px] p-4 border border-white/5">
              <div className="space-y-1 mb-3">
                {services.slice(4, 8).map(s => (
                  <label key={s.id} className={`flex items-center justify-between p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${selected.includes(s.id) ? 'bg-purple-600/15 border border-purple-500/20' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}>
                    <div className="flex items-center gap-2">
                      <div onClick={() => toggle(s.id)} className={`w-4 h-4 rounded-lg flex items-center justify-center transition-all ${selected.includes(s.id) ? 'bg-purple-600' : 'bg-white/10 border border-white/20'}`}>
                        {selected.includes(s.id) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white">{s.name}</span>
                        <span className="text-[8px] text-white/30 block leading-none mt-0.5">{s.cat}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white/80">{formatINR(s.price)}</span>
                  </label>
                ))}
              </div>
              <div className="border-t border-white/5 pt-2 space-y-1">
                <div className="flex justify-between text-xs text-white/40"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-xs text-green-400/80"><span>Bundle Discount (10%)</span><span>-{formatINR(discount)}</span></div>}
                <div className="flex justify-between text-xs text-white/40"><span>GST (18%)</span><span>{formatINR(gst)}</span></div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent text-base"><AnimatedNumber value={total} /></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
