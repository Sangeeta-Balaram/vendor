'use client'
import { useEffect, useState } from 'react'
import { Search, Mail, Phone, Building2, CalendarDays, Handshake, FileSignature } from 'lucide-react'

export default function AdminClients() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/clients').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  }, [])

  const filtered = data.filter((r: any) =>
    !search || r.name?.toLowerCase().includes(search.toLowerCase()) || r.email?.toLowerCase().includes(search.toLowerCase()) || r.company?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Clients ({data.length})</h1>
        <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-60" /></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r: any) => (
          <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">{r.name.charAt(0)}</div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{r.name}</p>
                <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                  <Building2 className="w-3 h-3" />{r.company || '—'}
                </p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 text-purple-600 hover:underline">
                <Mail className="w-3 h-3 shrink-0" />{r.email}
              </a>
              {r.phone && (
                <p className="flex items-center gap-1.5 text-gray-400">
                  <Phone className="w-3 h-3 shrink-0" />{r.phone}
                </p>
              )}
            </div>
            <div className="flex gap-4 text-[10px] text-gray-500 pt-3 mt-3 border-t border-gray-50">
              <span className="flex items-center gap-1"><Handshake className="w-3 h-3" />{r.negotiations?.[0]?.count || 0} negotiations</span>
              <span className="flex items-center gap-1"><FileSignature className="w-3 h-3" />{r.agreements?.[0]?.count || 0} agreements</span>
            </div>
            <p className="text-[10px] text-gray-300 mt-2 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Client since {new Date(r.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-gray-400 col-span-3 text-center py-8">No clients found</p>}
      </div>
    </div>
  )
}
