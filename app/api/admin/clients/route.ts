import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { supabaseAdmin } = await import('@/lib/db')
  const { data } = await supabaseAdmin.from('clients').select('*, negotiations(count), agreements(count)').order('created_at', { ascending: false })
  return NextResponse.json(data || [])
}
