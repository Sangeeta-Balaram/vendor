'use client'
import { useEffect, useState } from 'react'
import { CheckCircle, Circle, Users } from 'lucide-react'

interface Stage { id: number; name: string; sort_order: number }
interface OnboardingItem { id: number; client_id: number; stage_id: number; completed: boolean; notes: string; client: { name: string; email: string }; stage: { name: string } }

export default function AdminOnboarding() {
  const [onboarding, setOnboarding] = useState<OnboardingItem[]>([])
  const [stages, setStages] = useState<Stage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<number | null>(null)

  const fetchData = () => fetch('/api/admin/onboarding').then(r => r.json()).then(d => { setOnboarding(d.onboarding); setStages(d.stages); setLoading(false) })
  useEffect(() => { fetchData() }, [])

  const toggleStage = async (id: number, completed: boolean) => {
    await fetch('/api/admin/onboarding', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, completed: !completed }) })
    fetchData()
  }

  const clients = [...new Map(onboarding.map(o => [o.client_id, { id: o.client_id, name: o.client.name, email: o.client.email }])).values()]

  const getClientProgress = (clientId: number) => {
    const completed = onboarding.filter(o => o.client_id === clientId && o.completed).length
    return { completed, total: stages.length, pct: Math.round((completed / stages.length) * 100) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">Onboarding</h1>

      {clients.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-12">No clients in onboarding yet</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {clients.map((c: any) => {
              const prog = getClientProgress(c.id)
              return (
                <button key={c.id} onClick={() => setSelectedClient(selectedClient === c.id ? null : c.id)}
                  className={`text-left p-4 rounded-2xl border transition-all ${selectedClient === c.id ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500/20' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">{c.name.charAt(0)}</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{c.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{c.email}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className={`font-semibold ${prog.pct === 100 ? 'text-green-600' : 'text-purple-600'}`}>{prog.completed}/{prog.total}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${prog.pct === 100 ? 'bg-green-500' : 'bg-purple-500'}`} style={{ width: `${prog.pct}%` }} />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {selectedClient ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {clients.find((c: any) => c.id === selectedClient)?.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold">{clients.find((c: any) => c.id === selectedClient)?.name}</h2>
                  <p className="text-xs text-gray-400">{clients.find((c: any) => c.id === selectedClient)?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                {stages.map(stage => {
                  const item = onboarding.find(o => o.client_id === selectedClient && o.stage_id === stage.id)
                  const completed = item?.completed || false
                  return (
                    <button key={stage.id} onClick={() => item && toggleStage(item.id, completed)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${completed ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
                      {completed ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${completed ? 'text-green-800' : 'text-gray-500'}`}>{stage.name}</p>
                        {item?.notes && <p className="text-[10px] text-gray-400 mt-0.5">{item.notes}</p>}
                      </div>
                      <span className={`text-[10px] font-medium ${completed ? 'text-green-600' : 'text-gray-400'}`}>{completed ? 'Done' : 'Pending'}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Select a client above to view their onboarding progress</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
