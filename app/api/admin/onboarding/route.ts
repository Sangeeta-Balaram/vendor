import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const [onboardingRes, stagesRes] = await Promise.all([
    supabaseAdmin.from('onboarding').select('*, client:clients(name, email), stage:onboarding_stages(name)').order('created_at', { ascending: false }),
    supabaseAdmin.from('onboarding_stages').select('*').order('sort_order'),
  ])
  return NextResponse.json({ onboarding: onboardingRes.data || [], stages: stagesRes.data || [] })
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const { id, completed, notes } = await req.json()
  const updates: any = {}
  if (completed !== undefined) updates.completed = completed
  if (completed) updates.completed_at = new Date().toISOString()
  else updates.completed_at = null
  if (notes !== undefined) updates.notes = notes
  const { error } = await supabaseAdmin.from('onboarding').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('onboarding').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
