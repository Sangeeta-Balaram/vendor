import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const negotiationSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(20).nullable().optional(),
  solution: z.string().max(200).nullable().optional(),
  plan: z.string().max(200).nullable().optional(),
  original_total: z.number().min(0),
  negotiated_total: z.number().min(0),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(`negotiations:${ip}`, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = negotiationSchema.parse(body)

    const { error } = await supabaseAdmin.from('negotiations').insert({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      solution: parsed.solution || null,
      plan: parsed.plan || null,
      original_total: parsed.original_total,
      negotiated_total: parsed.negotiated_total,
      status: 'pending',
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('Negotiation API error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
