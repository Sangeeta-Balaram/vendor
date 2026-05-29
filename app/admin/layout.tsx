'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, CalendarCheck, FileText, Settings, Handshake, FileSignature, ClipboardCheck, BookOpen, LogOut, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/contacts', label: 'Contacts', icon: Users },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/quotes', label: 'Quotes', icon: FileText },
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/admin/negotiations', label: 'Negotiations', icon: Handshake },
  { href: '/admin/agreements', label: 'Agreements', icon: FileSignature },
  { href: '/admin/onboarding', label: 'Onboarding', icon: ClipboardCheck },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/resources', label: 'Resources', icon: BookOpen },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/me').then(r => {
      if (r.ok) setAuthed(true)
      else router.push('/admin/login')
    }).finally(() => setChecking(false))
  }, [router])

  if (pathname.startsWith('/admin/login')) return <>{children}</>
  if (checking) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>
  if (!authed) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40" style={{ top: '100px', height: 'calc(100vh - 100px)' }}>
        <aside className="flex-1 flex flex-col bg-white border-r border-gray-200 min-h-0">
          <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
            <Link href="/admin/dashboard" className="font-extrabold text-lg"><span className="gradient-text">Revieree</span> <span className="text-gray-400 font-medium text-sm">Admin</span></Link>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const active = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                  <Icon className="w-4 h-4 shrink-0" />{item.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-3 border-t border-gray-100 shrink-0">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
              <LogOut className="w-4 h-4" />Back to Site
            </Link>
          </div>
        </aside>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed top-[100px] left-0 z-40 h-[calc(100vh-100px)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
          <span className="font-extrabold text-lg"><span className="gradient-text">Revieree</span> <span className="text-gray-400 font-medium text-sm">Admin</span></span>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-3.5rem)]">
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                <Icon className="w-4 h-4 shrink-0" />{item.label}
              </Link>
            )
          })}
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all mt-4 border-t border-gray-100 pt-4">
            <LogOut className="w-4 h-4" />Back to Site
          </Link>
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky z-20 h-14 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center px-4 lg:px-8" style={{ top: '100px' }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 mr-3"><Menu className="w-5 h-5" /></button>
          <h2 className="text-sm font-medium text-gray-500 capitalize">{pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}</h2>
        </header>
        <main className="p-4 lg:p-6 min-h-[calc(100vh-164px)]">{children}</main>
      </div>
    </div>
  )
}
