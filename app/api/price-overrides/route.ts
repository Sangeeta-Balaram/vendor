import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function GET() {
  const { data } = await supabase.from('price_overrides').select('id, price')
  const map: Record<string, number> = {}
  if (data) for (const r of data) map[r.id] = r.price
  return NextResponse.json(map)
}
