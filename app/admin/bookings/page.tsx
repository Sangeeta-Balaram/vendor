'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Calendar } from 'lucide-react'

export default function AdminBookings() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'list' | 'calendar'>('calendar')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/bookings').then(r => {
      if (!r.ok) { router.push('/partner/login'); return }
      return r.json()
    }).then(d => { if (d) { setData(d); setLoading(false) } })
  }, [router])

  const filtered = data.filter((r: any) =>
    !search || r.name?.toLowerCase().includes(search.toLowerCase()) || r.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Bookings ({data.length})</h1>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            <button onClick={() => setTab('calendar')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${tab === 'calendar' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Calendar</button>
            <button onClick={() => setTab('list')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${tab === 'list' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>List</button>
          </div>
          {tab === 'list' && <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-60" /></div>}
        </div>
      </div>

      {tab === 'calendar' ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">Schedule a call via Calendly</span>
          </div>
          <div className="h-[700px]">
            <iframe
              src="https://calendly.com/sangeeta-thereviereestudios/build-a-brand"
              width="100%"
              height="100%"
              frameBorder="0"
              className="min-h-[700px]"
              title="Calendly Booking Calendar"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Name</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Email</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Phone</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Solution</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Plan</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Budget</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Date</th></tr></thead>
            <tbody>{filtered.map((r: any) => <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50"><td className="px-4 py-3 font-medium">{r.name}</td><td className="px-4 py-3 text-gray-500">{r.email}</td><td className="px-4 py-3 text-gray-500">{r.phone}</td><td className="px-4 py-3 text-gray-500">{r.solution || '-'}</td><td className="px-4 py-3 text-gray-500">{r.plan || '-'}</td><td className="px-4 py-3 font-semibold text-purple-700">{r.budget || '-'}</td><td className="px-4 py-3 text-gray-400 text-[11px]">{new Date(r.created_at).toLocaleDateString()}</td></tr>)}</tbody>
          </table>
          {filtered.length === 0 && <p className="text-center py-8 text-sm text-gray-400">No bookings found</p>}
        </div>
      )}
    </div>
  )
}
