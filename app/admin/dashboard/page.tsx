'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, CalendarCheck, FileText, Eye, Handshake, TrendingUp, Activity, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  contacts: number; bookings: number; quotes: number; clients: number;
  views: number; todayViews: number; negotiations: number; agreements: number;
  solutionViews: { slug: string }[]; recentContacts: any[]; recentQuotes: any[];
}

const cards = [
  { key: 'contacts', label: 'Contacts', icon: Users, color: 'bg-blue-50 text-blue-700', href: '/admin/contacts' },
  { key: 'bookings', label: 'Bookings', icon: CalendarCheck, color: 'bg-green-50 text-green-700', href: '/admin/bookings' },
  { key: 'quotes', label: 'Quotes', icon: FileText, color: 'bg-purple-50 text-purple-700', href: '/admin/quotes' },
  { key: 'clients', label: 'Clients', icon: Users, color: 'bg-indigo-50 text-indigo-700', href: '/admin/clients' },
  { key: 'views', label: 'Total Views', icon: Eye, color: 'bg-orange-50 text-orange-700', href: '/admin/dashboard' },
  { key: 'todayViews', label: "Today's Views", icon: TrendingUp, color: 'bg-pink-50 text-pink-700', href: '/admin/dashboard' },
  { key: 'negotiations', label: 'Negotiations', icon: Handshake, color: 'bg-teal-50 text-teal-700', href: '/admin/negotiations' },
  { key: 'agreements', label: 'Agreements', icon: Activity, color: 'bg-cyan-50 text-cyan-700', href: '/admin/agreements' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/stats').then(r => {
      if (!r.ok) { router.push('/partner/login'); return }
      return r.json()
    }).then(d => { if (d) setStats(d) })
  }, [router])

  if (!stats) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Overview of your platform activity</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(({ key, label, icon: Icon, color, href }) => (
          <Link key={key} href={href} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}><Icon className="w-5 h-5" /></div>
              <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 transition-colors" />
            </div>
            <p className="text-2xl font-extrabold">{stats[key as keyof Stats] as number}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Recent Contacts</h2>
            <Link href="/admin/contacts" className="text-xs font-medium text-purple-600 hover:text-purple-800">View all</Link>
          </div>
          {stats.recentContacts.length === 0 ? <p className="text-sm text-gray-400 text-center py-6">No contacts yet</p> : (
            <div className="space-y-2">
              {stats.recentContacts.map((c: any) => (
                <div key={c.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{c.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{c.email}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Recent Quotes</h2>
            <Link href="/admin/quotes" className="text-xs font-medium text-purple-600 hover:text-purple-800">View all</Link>
          </div>
          {stats.recentQuotes.length === 0 ? <p className="text-sm text-gray-400 text-center py-6">No quotes yet</p> : (
            <div className="space-y-2">
              {stats.recentQuotes.map((q: any) => (
                <div key={q.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{q.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{q.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{q.solution}</p>
                  </div>
                  <span className="text-xs font-semibold text-purple-700 shrink-0">{q.total}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
