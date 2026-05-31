'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, RefreshCw, Search } from 'lucide-react'

interface ServiceItem { id: string; name: string; price: number }

export default function AdminServices() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [overrides, setOverrides] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [solutionFilter, setSolutionFilter] = useState<string>('all')
  const router = useRouter()

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/services-tree').then(r => r.ok ? r.json() : Promise.reject()),
      fetch('/api/admin/prices').then(r => r.ok ? r.json() : Promise.reject()),
    ]).then(([tree, overridesData]) => {
      setServices(tree)
      const m: Record<string, number> = {}
      for (const r of overridesData) m[r.id] = r.price
      setOverrides(m)
      setLoading(false)
    }).catch(() => router.push('/partner/login'))
  }, [router])

  const price = (id: string) => overrides[id] !== undefined ? overrides[id] : services.find(s => s.id === id)?.price || 0
  const setPrice = (id: string, val: number) => setOverrides(prev => ({ ...prev, [id]: val }))

  const handleSave = async () => {
    setSaving(true)
    const payload = Object.entries(overrides).map(([id, price]) => ({ id, price }))
    await fetch('/api/admin/prices', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ overrides: payload }) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const resetPrice = (id: string) => {
    const newOverrides = { ...overrides }
    delete newOverrides[id]
    setOverrides(newOverrides)
  }

  // Extract solution names from service IDs (format: "slug_serviceid")
  const solutions = [...new Set(services.map(s => s.id.split('_')[0]))].sort()

  const filtered = services.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false
    if (solutionFilter !== 'all' && !s.id.startsWith(solutionFilter)) return false
    return true
  })

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  const changed = Object.keys(overrides).length > 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">Services</h1>
          <p className="text-sm text-gray-400 mt-0.5">{services.length} total services · {Object.keys(overrides).length} overridden</p>
        </div>
        <button onClick={handleSave} disabled={!changed || saving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-purple-700 rounded-xl hover:bg-purple-800 disabled:opacity-50 transition-all shadow-sm">
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40" />
        </div>
        <select value={solutionFilter} onChange={e => setSolutionFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 bg-white">
          <option value="all">All Solutions</option>
          {solutions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs text-gray-400">{filtered.length} showing</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50 sticky top-0"><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide w-12">#</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Service</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Original Price</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide">Override Price (₹)</th><th className="text-left px-4 py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wide w-20"></th></tr></thead>
            <tbody>{filtered.map((s, i) => {
              const isOverridden = overrides[s.id] !== undefined
              const currentPrice = isOverridden ? overrides[s.id] : s.price
              return (
                <tr key={s.id} className={`border-b border-gray-50 hover:bg-gray-50/50 ${isOverridden ? 'bg-purple-50/40' : ''}`}>
                  <td className="px-4 py-2.5 text-gray-400 text-[10px]">{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">{s.id}</p>
                  </td>
                  <td className={`px-4 py-2.5 font-semibold ${isOverridden ? 'text-gray-400 line-through' : 'text-gray-800'}`}>₹{s.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <input type="number" value={currentPrice} onChange={e => setPrice(s.id, Number(e.target.value))}
                        className={`w-28 px-3 py-1.5 text-sm rounded-lg border ${isOverridden ? 'border-purple-300 bg-purple-50 text-purple-800 font-semibold' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500/40`} />
                      {isOverridden && (
                        <button onClick={() => resetPrice(s.id)} className="text-[10px] font-medium text-gray-400 hover:text-red-500 px-2 py-1 rounded-lg hover:bg-red-50 transition-all">
                          Reset
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    {isOverridden && <span className="text-[10px] font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">Overridden</span>}
                  </td>
                </tr>
              )
            })}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center py-8 text-sm text-gray-400">No services found</p>}
      </div>
    </div>
  )
}
