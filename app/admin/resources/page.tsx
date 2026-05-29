'use client'
import { useEffect, useState } from 'react'
import { Plus, Save, Trash2, ExternalLink } from 'lucide-react'

interface Resource {
  id?: number
  slug: string
  title: string
  desc: string
  type: string
  body: string
  sort_order: number
}

export default function AdminResources() {
  const [staticResources, setStaticResources] = useState<Resource[]>([])
  const [dbResources, setDbResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Resource | null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchResources = () => fetch('/api/admin/resources').then(r => r.json()).then(d => {
    setStaticResources(d.static || [])
    setDbResources(d.db || [])
    setLoading(false)
  })

  useEffect(() => { fetchResources() }, [])

  const merged = staticResources.map(sr => dbResources.find(r => r.slug === sr.slug) || sr)
  const extra = dbResources.filter(r => !staticResources.find(s => s.slug === r.slug))
  const all = [...merged, ...extra]

  const handleSave = async (res: Resource) => {
    setSaving(true)
    setError('')
    const existingDb = dbResources.find(r => r.slug === res.slug)
    const method = res.id || existingDb ? 'PUT' : 'POST'
    const body = res.id || existingDb ? { ...res, id: res.id || existingDb!.id } : res
    const r = await fetch('/api/admin/resources', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSaving(false)
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      setError(d.error || 'Failed to save')
      return
    }
    setEditing(null)
    setAdding(false)
    fetchResources()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this resource?')) return
    await fetch('/api/admin/resources', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchResources()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Resources ({all.length})</h1>
        <button onClick={() => { setAdding(true); setEditing(null) }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-700 rounded-xl hover:bg-purple-800 transition-all">
          <Plus className="w-4 h-4" /> Add Resource
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-4">
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {adding && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold text-yellow-800 mb-3">New Resource</p>
          <ResourceForm resource={{ slug: '', title: '', desc: '', type: 'Guide', body: '', sort_order: all.length }}
            onSave={handleSave} onCancel={() => { setAdding(false); setError('') }} saving={saving} />
        </div>
      )}

      {editing && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold text-blue-800 mb-3">Editing Resource</p>
          <ResourceForm resource={editing} onSave={handleSave} onCancel={() => { setEditing(null); setError('') }} saving={saving} />
        </div>
      )}

      <div className="space-y-3">
        {all.map((r) => (
          <div key={r.id || r.slug} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase">{r.type}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{r.slug}</span>
                  {r.id && <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Custom</span>}
                </div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{r.body}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={`/resources/${r.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-purple-600 transition-colors"><ExternalLink className="w-4 h-4" /></a>
                <button onClick={() => { setEditing({ ...r }); setAdding(false) }} className="p-2 text-gray-400 hover:text-blue-600 transition-colors text-sm font-medium">Edit</button>
                {r.id && <button onClick={() => handleDelete(r.id!)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>}
              </div>
            </div>
          </div>
        ))}
        {all.length === 0 && <p className="text-center py-8 text-sm text-gray-400">No resources found</p>}
      </div>
    </div>
  )
}

function ResourceForm({ resource, onSave, onCancel, saving }: {
  resource: Resource
  onSave: (r: Resource) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState(resource)
  const set = (key: keyof Resource, val: any) => setForm(prev => ({ ...prev, [key]: val }))

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Slug</label>
          <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" placeholder="e.g. my-resource" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1">
            {['Guide', 'Template', 'Tool', 'Kit', 'Stories', 'Docs'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Title</label>
        <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
      </div>
      <div>
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Description</label>
        <input type="text" value={form.desc} onChange={e => set('desc', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
      </div>
      <div>
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Body</label>
        <textarea rows={4} value={form.body} onChange={e => set('body', e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1 resize-y" />
      </div>
      <div>
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Sort Order</label>
        <input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} className="w-24 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 mt-1" />
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave(form)} disabled={saving || !form.slug.trim() || !form.title.trim()}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-purple-700 rounded-xl hover:bg-purple-800 disabled:opacity-50 transition-all">
          <Save className="w-4 h-4" />{saving ? 'Saving...' : resource.id ? 'Update' : 'Create'}
        </button>
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
      </div>
    </div>
  )
}
