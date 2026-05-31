'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ExternalLink, ChevronDown, ChevronRight, User } from 'lucide-react'

export default function AdminQuotes() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/quotes').then(r => {
      if (!r.ok) { router.push('/partner/login'); return }
      return r.json()
    }).then(d => { if (d) { setData(d); setLoading(false) } })
  }, [router])

  const filtered = data.filter((r: any) =>
    !search || r.name?.toLowerCase().includes(search.toLowerCase()) || r.email?.toLowerCase().includes(search.toLowerCase()) || r.solution?.toLowerCase().includes(search.toLowerCase())
  )

  const grouped: Record<string, any[]> = {}
  for (const q of filtered) {
    const key = `${q.name}|${q.email}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(q)
  }

  const viewPdf = (pdf: string) => {
    if (!pdf?.startsWith('data:')) return
    try {
      const raw = pdf.split('base64,')[1] || pdf
      const byteChars = atob(raw)
      const bytes = new Uint8Array(byteChars.length)
      for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i)
      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'proposal.pdf'
      a.click()
      setTimeout(() => { URL.revokeObjectURL(url); a.remove() }, 10000)
    } catch (e) { console.error('viewPdf error:', e) }
  }

  const pdfValid = (pdf: string) => {
    if (!pdf?.startsWith('data:')) return false
    try { atob(pdf.split('base64,')[1] || pdf); return true } catch { return false }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Quotes ({data.length})</h1>
        <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-60" /></div>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([key, quotes]) => {
          const [name, email] = key.split('|')
          const isOpen = expanded[key]
          return (
            <div key={key} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button onClick={() => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50/50 transition-all">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {name.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-gray-400">{email} — {quotes.length} quote{quotes.length > 1 ? 's' : ''}</p>
                </div>
                {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
              </button>
              {isOpen && (
                <div className="border-t border-gray-50">
                  {quotes.map((q: any) => (
                    <div key={q.id} className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/30">
                      <div className="flex-1 min-w-0 grid grid-cols-5 gap-3 text-sm">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Solution</span>
                          <span className="font-medium">{q.solution}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block">Plan</span>
                          <span className="text-gray-500">{q.plan || '-'}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] text-gray-400 block">Services</span>
                          <span className="text-gray-500 text-[11px] truncate block">{q.services || '-'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block">Total</span>
                          <span className="font-semibold text-purple-700">{q.total}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {q.proposal_pdf && pdfValid(q.proposal_pdf) ? (
                          <button onClick={() => viewPdf(q.proposal_pdf)} className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-all" title="Download PDF">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        ) : <span className="text-[10px] text-gray-300">-</span>}
                        <span className="text-[10px] text-gray-400 w-20 text-right">{new Date(q.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {Object.keys(grouped).length === 0 && <p className="text-center py-12 text-sm text-gray-400">No quotes found</p>}
      </div>
    </div>
  )
}
