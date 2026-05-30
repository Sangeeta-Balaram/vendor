'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Globe, MapPin, Send } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-[40px] font-extrabold tracking-[-.03em] mb-4">Contact Us</h2>
        <p className="text-gray-400 text-lg max-w-[500px] mx-auto">Have a project in mind? We'd love to hear from you.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3 className="text-xl font-bold mb-6">Send us a message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input required placeholder="Your Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            <input placeholder="Phone Number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
            <textarea required rows={4} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              <Send className="w-4 h-4" /> {sent ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-8">
          <h3 className="text-xl font-bold mb-2">Get in touch</h3>
          <div className="flex flex-col gap-5">
            <a href="tel:+919156472904" className="flex items-center gap-4 text-gray-600 hover:text-purple-deep transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><Phone className="w-4 h-4 text-purple-deep" /></div>
              <div><div className="text-sm font-medium">Phone</div><div className="text-sm text-gray-400">+91 91564 72904</div></div>
            </a>
            <a href="mailto:sangeeta@thereviereestudios.in" className="flex items-center gap-4 text-gray-600 hover:text-purple-deep transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><Mail className="w-4 h-4 text-purple-deep" /></div>
              <div><div className="text-sm font-medium">Email</div><div className="text-sm text-gray-400">sangeeta@thereviereestudios.in</div></div>
            </a>
            <a href="https://www.thereviereestudios.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-600 hover:text-purple-deep transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><Globe className="w-4 h-4 text-purple-deep" /></div>
              <div><div className="text-sm font-medium">Website</div><div className="text-sm text-gray-400">www.thereviereestudios.in</div></div>
            </a>
            <a href="https://www.google.com/maps/place/The+Revieree+Studios/@18.5642945,73.9164662,847m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2c17b9b5d2a23:0x1c3ce55481fa183!8m2!3d18.5642894!4d73.9190411!16s%2Fg%2F11zb58qcx6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-600 hover:text-purple-deep transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><MapPin className="w-4 h-4 text-purple-deep" /></div>
              <div><div className="text-sm font-medium">Office</div><div className="text-sm text-gray-400">Pune, India</div></div>
            </a>
          </div>
          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
            <p className="text-sm text-gray-500 mb-1">Prefer WhatsApp?</p>
            <a href="https://wa.me/919156472904" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-purple-deep hover:underline">Chat with us on WhatsApp →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}