'use client'
import { useEffect, useState } from 'react'
import { Search, Check, X, MessageSquare } from 'lucide-react'

export default function AdminNegotiations() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const fetchData = () => fetch('/api/admin/negotiations').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  useEffect(() => { fetchData() }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/negotiations', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    fetchData()
  }

  const filtered = data.filter((r: any) => {
    if (search && !r.name?.toLowerCase().includes(search.toLowerCase()) && !r.email?.toLowerCase().includes(search.toLowerCase()) && !r.solution?.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    return true
  })

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Negotiations ({data.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-60" /></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 bg-white">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((r: any) => (
          <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">{r.name.charAt(0)}</div>
                <div><p className="font-semibold">{r.name}</p><p className="text-[11px] text-gray-400">{r.email}</p></div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${r.status === 'accepted' ? 'bg-green-100 text-green-700' : r.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{r.status}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{r.solution}{r.plan ? ` — ${r.plan}` : ''}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-gray-400 line-through">₹{r.original_total?.toLocaleString('en-IN')}</span>
                <span className="text-purple-400 text-sm">→</span>
                <span className="text-lg font-bold text-purple-700">₹{r.negotiated_total?.toLocaleString('en-IN')}</span>
              </div>
            </div>
            {r.notes && (
              <div className="flex items-start gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg p-2.5 mb-3">
                <MessageSquare className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                <p>{r.notes}</p>
              </div>
            )}
            {r.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => updateStatus(r.id, 'accepted')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all"><Check className="w-3.5 h-3.5" /> Accept</button>
                <button onClick={() => updateStatus(r.id, 'rejected')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all"><X className="w-3.5 h-3.5" /> Reject</button>
              </div>
            )}
            <p className="text-[10px] text-gray-400 mt-3">{new Date(r.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-gray-400 col-span-2 text-center py-12">No negotiations found</p>}
      </div>
    </div>
  )
}


