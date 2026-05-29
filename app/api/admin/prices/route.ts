import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const { data } = await supabaseAdmin.from('price_overrides').select('*')
  return NextResponse.json(data || [])
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const { overrides } = await req.json()
  const upserts = overrides.map((o: { id: string; price: number }) =>
    supabaseAdmin.from('price_overrides').upsert({ id: o.id, price: o.price, updated_at: new Date().toISOString() }, { onConflict: 'id' })
  )
  await Promise.all(upserts)
  return NextResponse.json({ success: true })
}
