import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'
import { supabaseAdmin } from '@/lib/db'
import { resources } from '@/lib/resources'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { data: dbResources } = await supabaseAdmin.from('resources').select('*').order('sort_order')
  const normalize = (r: any) => ({ ...r, desc: r.desc || r.description || '' })
  return NextResponse.json({ static: resources, db: (dbResources || []).map(normalize) })
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('resources').insert({
    slug: body.slug,
    title: body.title,
    description: body.desc,
    type: body.type,
    body: body.body,
    sort_order: body.sort_order || 0,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('resources').update({
    slug: body.slug,
    title: body.title,
    description: body.desc,
    type: body.type,
    body: body.body,
    sort_order: body.sort_order,
  }).eq('id', body.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const { error } = await supabaseAdmin.from('resources').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
