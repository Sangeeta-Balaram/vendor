'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserCircle } from 'lucide-react'

export default function PartnerLogin() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const r = await fetch('/api/partner/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), phone: phone.trim() }) })
      if (r.ok) { window.dispatchEvent(new Event('partner-login')); router.push('/partner/dashboard') }
      else { const d = await r.json(); setErr(d.error || 'Invalid credentials') }
    } catch { setErr('Connection error') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4"><UserCircle className="w-7 h-7 text-blue-700" /></div>
        <h1 className="text-2xl font-extrabold text-center mb-1">Partner Portal</h1>
        <p className="text-sm text-gray-400 text-center mb-6">Track your quotes, agreements & onboarding</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">User ID</label>
            <input type="text" autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Your full name (as entered in the form)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Password</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Registered 10 digit phone number"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button type="submit" disabled={loading || !name.trim() || phone.length !== 10}
            className="w-full py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-all">{loading ? 'Checking...' : 'Track My Projects'}</button>
          <p className="text-xs text-gray-400 text-center mt-4">Don't have an account? <a href="/" className="text-blue-600 hover:underline font-medium">Take me to the website</a></p>
        </div>
      </form>
    </div>
  )
}
