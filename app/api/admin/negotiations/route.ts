import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const { data } = await supabaseAdmin.from('negotiations').select('*').order('created_at', { ascending: false })
  return NextResponse.json(data || [])
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const { id, status, notes } = await req.json()
  const { error } = await supabaseAdmin.from('negotiations').update({ status, notes }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
