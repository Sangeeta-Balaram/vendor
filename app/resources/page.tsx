'use client'
import { useEffect, useState } from 'react'

interface ResourceItem { slug: string; title: string; desc: string; type: string }

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/resources').then(r => r.json()).then(d => { setResources(d); setLoading(false) })
  }, [])

  const handleClick = async (slug: string) => {
    window.open(`/resources/${slug}`, '_blank')
    try { await fetch('/api/partner/track-resource', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resource: slug }) }) } catch {}
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-24">
      <h1 className="text-[48px] font-extrabold tracking-[-.03em] mb-4">Resources</h1>
      <p className="text-gray-400 text-lg mb-14">Guides, templates, and tools to help you succeed as a partner.</p>
      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {resources.map(r => (
            <div key={r.slug} onClick={() => handleClick(r.slug)} className="bg-white border border-gray-100 rounded-[24px] p-8 hover:shadow-soft hover:-translate-y-1 transition-all cursor-pointer">
              <div className="text-[9px] font-bold uppercase tracking-[.15em] text-purple-600 mb-3">{r.type}</div>
              <h3 className="font-bold mb-1.5">{r.title}</h3>
              <p className="text-sm text-gray-400">{r.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
