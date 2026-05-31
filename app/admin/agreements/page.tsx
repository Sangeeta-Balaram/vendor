'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Check, X, FileText, ArrowRight } from 'lucide-react'

const statusColors: Record<string, string> = { draft: 'bg-gray-100 text-gray-600', sent: 'bg-blue-100 text-blue-700', signed: 'bg-green-100 text-green-700', completed: 'bg-purple-100 text-purple-700', cancelled: 'bg-red-100 text-red-700' }

const statusFlow = ['draft', 'sent', 'signed', 'completed']

export default function AdminAgreements() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()

  const fetchData = () => fetch('/api/admin/agreements').then(r => {
    if (!r.ok) { router.push('/partner/login'); throw new Error('unauthorized') }
    return r.json()
  }).then(d => { setData(d); setLoading(false) })
  useEffect(() => { fetchData() }, [router])

  const updateStatus = async (id: number, status: string) => {
    const body: any = { id, status }
    if (status === 'signed') body.signed_at = new Date().toISOString()
    await fetch('/api/admin/agreements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
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
        <h1 className="text-2xl font-extrabold">Agreements ({data.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-60" /></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 bg-white">
            <option value="all">All Status</option>
            {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((r: any) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                  {r.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{r.name}</p>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${statusColors[r.status] || 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{r.email}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>Solution: {r.solution}</span>
                    {r.plan && <span>Plan: {r.plan}</span>}
                    <span className="font-semibold text-purple-700">₹{r.total?.toLocaleString('en-IN')}</span>
                  </div>
                  {/* Status pipeline */}
                  <div className="flex items-center gap-1.5 mt-3">
                    {statusFlow.map((s, i) => {
                      const currentIdx = statusFlow.indexOf(r.status)
                      const isActive = i <= currentIdx
                      const isCurrent = r.status === s
                      return (
                        <div key={s} className="flex items-center gap-1.5">
                          {i > 0 && <div className={`w-6 h-px ${isActive ? 'bg-purple-300' : 'bg-gray-200'}`} />}
                          <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${isCurrent ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-300' : isActive ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-300'}`}>{s}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {r.status === 'draft' && <button onClick={() => updateStatus(r.id, 'sent')} className="px-3 py-1.5 text-[10px] font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">Send</button>}
                {r.status === 'sent' && <button onClick={() => updateStatus(r.id, 'signed')} className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-all"><Check className="w-3 h-3" /> Sign</button>}
                {r.status === 'signed' && <button onClick={() => updateStatus(r.id, 'completed')} className="px-3 py-1.5 text-[10px] font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all">Complete</button>}
                {['draft', 'sent'].includes(r.status) && <button onClick={() => updateStatus(r.id, 'cancelled')} className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all"><X className="w-3 h-3" /> Cancel</button>}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3">{new Date(r.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-12 text-sm text-gray-400">No agreements found</p>}
      </div>
    </div>
  )
}
