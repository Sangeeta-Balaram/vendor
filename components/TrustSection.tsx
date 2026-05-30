'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '500+', label: 'Partners' },
  { value: '1200+', label: 'Projects' },
  { value: '98%', label: 'Satisfaction' },
]

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-dark-bg">
      <div className="max-w-[1100px] mx-auto text-center">
        <h3 className="text-[24px] md:text-[28px] font-bold text-white/80 mb-12 tracking-[-.02em]">Trusted by businesses worldwide</h3>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map(s => (
            <div key={s.label}>
              <span className="text-4xl md:text-5xl font-extrabold gradient-text mb-1 block">{s.value}</span>
              <span className="text-sm text-white/40">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}