import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { resources as staticResources } from '@/lib/resources'

export async function GET() {
  const { data: dbResources } = await supabaseAdmin.from('resources').select('*').order('sort_order')
  const normalize = (r: any) => ({ ...r, desc: r.desc || r.description || '' })
  const dbNormalized = (dbResources || []).map(normalize)
  const merged = staticResources.map(sr => dbNormalized.find(r => r.slug === sr.slug) || sr)
  const extra = dbNormalized.filter(r => !staticResources.find(s => s.slug === r.slug))
  return NextResponse.json([...merged, ...extra])
}
