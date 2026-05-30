'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [partner, setPartner] = useState<{ name: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    const check = () => {
      fetch('/api/partner/me').then(r => {
        if (!r.ok) { setPartner(null); return }
        return r.json()
      }).then(d => {
        if (d?.loggedIn && d?.partner?.name) setPartner({ name: d.partner.name })
        else setPartner(null)
      }).catch(() => setPartner(null))
    }
    check()
    window.addEventListener('partner-login', check)
    window.addEventListener('partner-logout', check)
    return () => {
      window.removeEventListener('partner-login', check)
      window.removeEventListener('partner-logout', check)
    }
  }, [pathname])

  const handleLogout = useCallback(async () => {
    await fetch('/api/partner/logout', { method: 'POST' })
    setPartner(null)
    window.dispatchEvent(new Event('partner-logout'))
    if (pathname.startsWith('/partner')) router.push('/partner/login')
  }, [router, pathname])

  const partnerBtn = partner
    ? <div className="flex items-center gap-2">
        <Link href="/partner/dashboard" className="px-5 py-2 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">Hi, {partner.name}</Link>
        <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout"><LogOut className="w-4 h-4" /></button>
      </div>
    : <Link href="/partner" className="px-5 py-2 text-sm font-semibold text-white gradient-primary rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">Partner Login</Link>

  const mobilePartnerBtn = partner
    ? <div className="flex gap-2 w-full">
        <Link href="/partner/dashboard" className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white gradient-primary rounded-full">Hi, {partner.name}</Link>
        <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout"><LogOut className="w-4 h-4" /></button>
      </div>
    : <Link href="/partner" className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white gradient-primary rounded-full">Partner Login</Link>

  return (
<nav className="sticky top-0 z-50 h-[70px] lg:h-[100px] bg-white/80 backdrop-blur-xl border-b border-gray-100/60">
  <div className="max-w-[1280px] mx-auto h-full px-4 lg:px-6 flex items-center justify-between">
        <Link href="/" className="group">
          <img src="/logo.svg" alt="The Revieree Studios" className="w-16 h-16 lg:w-24 lg:h-24 group-hover:scale-105 transition-transform object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {!isHome && <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Home</Link>}
          <a href="/#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
          <a href="/#solutions" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Solutions</a>
          <Link href="/resources" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Resources</Link>
          <a href="/#contact" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {partnerBtn}
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-3">
              {!isHome && <Link href="/" onClick={() => setOpen(false)} className="text-sm font-medium">Home</Link>}
              <a href="/#how-it-works" onClick={() => setOpen(false)} className="text-sm font-medium">How it works</a>
              <a href="/#solutions" onClick={() => setOpen(false)} className="text-sm font-medium">Solutions</a>
              <Link href="/resources" onClick={() => setOpen(false)} className="text-sm font-medium">Resources</Link>
              <a href="/#contact" onClick={() => setOpen(false)} className="text-sm font-medium">Contact</a>
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                {mobilePartnerBtn}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  )
}
