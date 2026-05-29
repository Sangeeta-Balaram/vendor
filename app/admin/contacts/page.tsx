'use client'
import { useEffect, useState } from 'react'
import { Search, Mail, Phone, MessageSquare, Save, X, Pencil } from 'lucide-react'

export default function AdminContacts() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [editing, setEditing] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [saving, setSaving] = useState(false)

  const fetchData = () => fetch('/api/admin/contacts').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  useEffect(() => { fetchData() }, [])

  const filtered = data.filter((r: any) => {
    if (search && !r.name?.toLowerCase().includes(search.toLowerCase()) && !r.email?.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter !== 'all' && r.type !== typeFilter) return false
    return true
  })

  const types = [...new Set(data.map(r => r.type || 'contact'))]

  const startEditing = (r: any) => {
    setEditing(r.id)
    setEditForm({ name: r.name, email: r.email, phone: r.phone || '', message: r.message || '', solution: r.solution || '', plan: r.plan || '', budget: r.budget || '' })
  }

  const handleSave = async (id: number) => {
    setSaving(true)
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...editForm }) })
    setSaving(false)
    setEditing(null)
    fetchData()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Contacts ({data.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-60" /></div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 bg-white">
            <option value="all">All Types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((r: any) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 transition-all">
            {editing === r.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500">Name</label>
                    <input type="text" value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500">Email</label>
                    <input type="email" value={editForm.email} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500">Phone</label>
                    <input type="text" value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500">Solution</label>
                    <input type="text" value={editForm.solution} onChange={e => setEditForm(p => ({ ...p, solution: e.target.value }))} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500">Budget</label>
                    <input type="text" value={editForm.budget} onChange={e => setEditForm(p => ({ ...p, budget: e.target.value }))} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-500">Message</label>
                  <textarea rows={2} value={editForm.message} onChange={e => setEditForm(p => ({ ...p, message: e.target.value }))} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1 resize-y" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleSave(r.id)} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-700 rounded-xl hover:bg-purple-800 disabled:opacity-50 transition-all">
                    <Save className="w-3.5 h-3.5" />{saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                    {r.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{r.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${r.type === 'booking' ? 'bg-green-100 text-green-700' : r.type === 'custom-request' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>{r.type || 'contact'}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{r.email}</span>
                      {r.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{r.phone}</span>}
                    </div>
                    {r.message && (
                      <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                        <p className="text-[13px]">{r.message}</p>
                      </div>
                    )}
                    {r.solution && <p className="text-[10px] text-gray-400 mt-1.5">Solution: {r.solution}{r.plan ? ` · Plan: ${r.plan}` : ''}{r.budget ? ` · Budget: ${r.budget}` : ''}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => startEditing(r)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                  <span className="text-[10px] text-gray-400">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-8 text-sm text-gray-400">No contacts found</p>}
      </div>
    </div>
  )
}
