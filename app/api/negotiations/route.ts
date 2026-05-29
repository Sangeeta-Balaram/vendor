import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { error } = await supabaseAdmin.from('negotiations').insert({
      name: body.name || null,
      email: body.email || null,
      phone: body.phone || null,
      solution: body.solution || null,
      plan: body.plan || null,
      original_total: body.original_total || 0,
      negotiated_total: body.negotiated_total || 0,
      status: 'pending',
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Negotiation API error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
