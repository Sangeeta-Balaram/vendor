'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="gradient-primary rounded-[32px] p-10 md:p-14 text-center"
        >
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-white tracking-[-.03em] mb-3">Ready to grow your business?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-[480px] mx-auto">Join 500+ partners already building solutions with Revieree.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/solutions" className="px-7 py-3 text-sm font-semibold text-purple-deep bg-white rounded-full hover:shadow-xl transition-all duration-300">
              Explore Solutions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}