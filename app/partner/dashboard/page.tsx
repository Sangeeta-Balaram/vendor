'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Handshake, FileSignature, ClipboardCheck, Mail, Download, ExternalLink, CheckCircle, Circle, BookOpen, FileSpreadsheet, Calculator, Palette, Newspaper, Code2 } from 'lucide-react'

interface PartnerData {
  partner: { name: string; email: string; phone: string }
  quotes: any[]; contacts: any[]; bookings: any[]; negotiations: any[]; agreements: any[]; onboarding: any[]; resourceAccess: any[]
}

const tabs = [
  { key: 'resources', label: 'Resources', icon: Download },
  { key: 'quotes', label: 'Quotes', icon: FileText },
  { key: 'negotiations', label: 'Negotiations', icon: Handshake },
  { key: 'agreements', label: 'Agreements', icon: FileSignature },
  { key: 'onboarding', label: 'Onboarding', icon: ClipboardCheck },
]

export default function PartnerDashboard() {
  const [data, setData] = useState<PartnerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resources')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/partner/data').then(r => {
      if (!r.ok) { router.push('/partner/login'); return }
      return r.json()
    }).then(d => { setData(d); setLoading(false) }).catch(() => router.push('/partner/login'))
  }, [router])

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
  if (!data) return null

  const pdfValid = (pdf: string) => {
    if (!pdf?.startsWith('data:')) return false
    try { atob(pdf.split('base64,')[1] || pdf); return true } catch { return false }
  }

  const viewPdf = (pdf: string, title?: string) => {
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
      a.download = title ? `${title.replace(/\s+/g, '-').toLowerCase()}.pdf` : 'proposal.pdf'
      a.click()
      setTimeout(() => { URL.revokeObjectURL(url); a.remove() }, 10000)
    } catch (e) { console.error('viewPdf error:', e) }
  }

  const resourceIcons: Record<string, any> = {
    'onboarding-guide': BookOpen, 'proposal-templates': FileText, 'pricing-calculator': Calculator,
    'marketing-kit': Palette, 'case-studies': Newspaper, 'api-docs': Code2,
  }

  const resourceLabels: Record<string, string> = {
    'onboarding-guide': 'Guide', 'proposal-templates': 'Template', 'pricing-calculator': 'Tool',
    'marketing-kit': 'Kit', 'case-studies': 'Stories', 'api-docs': 'Docs',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div><h1 className="font-extrabold text-lg">Partner Portal</h1><p className="text-xs text-gray-400">Read-only access to your project data</p></div>
        <div className="flex items-center gap-3">
          <div className="text-right text-[10px] text-gray-400"><p>{data.partner.name}</p><p className="text-gray-300">{data.partner.email}</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{data.partner.name.charAt(0)}</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center"><p className="text-2xl font-extrabold text-blue-700">{data.quotes.length}</p><p className="text-[10px] text-gray-400">Quotes</p></div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center"><p className="text-2xl font-extrabold text-orange-700">{data.negotiations.length}</p><p className="text-[10px] text-gray-400">Negotiations</p></div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center"><p className="text-2xl font-extrabold text-green-700">{data.agreements.length}</p><p className="text-[10px] text-gray-400">Agreements</p></div>
          <a href="mailto:sangeeta@thereviereestudios.in" className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:border-blue-200 transition-colors"><Mail className="w-5 h-5 text-gray-400 mx-auto mb-1" /><p className="text-[10px] text-gray-500">Contact Support</p></a>
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-2xl p-1 border border-gray-100 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'resources' && (
          <div className="grid md:grid-cols-2 gap-4">
            {(data.resourceAccess || []).length === 0
              ? <div className="md:col-span-2 text-center py-12"><p className="text-sm text-gray-400">No resources viewed yet. Browse resources on the website to track them here.</p></div>
              : data.resourceAccess.map((ra: any) => {
                  const slug = ra.resource
                  const Icon = resourceIcons[slug] || BookOpen
                  const label = resourceLabels[slug] || 'Resource'
                  const title = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                  return (
                    <a key={ra.id} href={`/resources/${slug}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-soft hover:-translate-y-0.5 transition-all block">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-blue-600" /></div>
                      <div className="text-[9px] font-bold uppercase tracking-[.15em] text-purple-600 mb-2">{label}</div>
                      <h3 className="font-bold text-sm mb-1">{title}</h3>
                      <p className="text-xs text-gray-400">Opened {new Date(ra.created_at).toLocaleDateString()}</p>
                    </a>
                  )
                })}
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="space-y-3">
            {data.quotes.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">No quotes yet. Download a proposal from the website to see it here.</p> :
              data.quotes.map((q: any) => (
                <div key={q.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div><p className="font-semibold">{q.solution}</p><p className="text-xs text-gray-400">{q.plan || 'No plan'} • {new Date(q.created_at).toLocaleDateString()}</p></div>
                    <span className="font-bold text-blue-700">{q.total}</span>
                  </div>
                  {q.services && <p className="text-[11px] text-gray-500 mb-2 line-clamp-2">{q.services}</p>}
                  {q.proposal_pdf && pdfValid(q.proposal_pdf) && <button onClick={() => viewPdf(q.proposal_pdf, q.solution)} className="flex items-center gap-1 text-[10px] font-medium text-blue-600 hover:underline"><ExternalLink className="w-3 h-3" />View Proposal PDF</button>}
                </div>
              ))}
          </div>
        )}

        {activeTab === 'negotiations' && (
          <div className="space-y-3">
            {data.negotiations.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">No negotiations found.</p> :
              data.negotiations.map((n: any) => (
                <div key={n.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div><p className="font-semibold">{n.solution}</p><p className="text-xs text-gray-400">{n.plan || 'No plan'}</p></div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${n.status === 'accepted' ? 'bg-green-100 text-green-700' : n.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{n.status}</span>
                  </div>
                  <p className="text-xs text-gray-500"><span className="line-through">₹{n.original_total?.toLocaleString('en-IN')}</span> → <span className="font-semibold text-green-700">₹{n.negotiated_total?.toLocaleString('en-IN')}</span></p>
                  <p className="text-[10px] text-gray-400 mt-1">{new Date(n.created_at).toLocaleDateString()}</p>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'agreements' && (
          <div className="space-y-3">
            {data.agreements.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">No agreements yet.</p> :
              data.agreements.map((a: any) => (
                <div key={a.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div><p className="font-semibold">{a.solution}</p><p className="text-xs text-gray-400">{a.plan || 'No plan'} • {new Date(a.created_at).toLocaleDateString()}</p></div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${a.status === 'signed' ? 'bg-green-100 text-green-700' : a.status === 'completed' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                  </div>
                  <p className="text-sm font-semibold text-blue-700">₹{a.total?.toLocaleString('en-IN')}</p>
                  {a.pdf_url && <button onClick={() => viewPdf(a.pdf_url)} className="flex items-center gap-1 text-[10px] font-medium text-blue-600 hover:underline mt-1"><ExternalLink className="w-3 h-3" />View Agreement</button>}
                </div>
              ))}
          </div>
        )}

        {activeTab === 'onboarding' && (
          <div className="space-y-3">
            {data.onboarding.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">Onboarding not started yet.</p> :
              data.onboarding.map((o: any) => (
                <div key={o.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-3">
                    {o.completed ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
                    <div><p className={`text-sm font-medium ${o.completed ? 'text-green-800' : 'text-gray-500'}`}>{o.stage?.name || `Stage #${o.stage_id}`}</p>
                    {o.completed_at && <p className="text-[10px] text-gray-400">Completed {new Date(o.completed_at).toLocaleDateString()}</p>}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
