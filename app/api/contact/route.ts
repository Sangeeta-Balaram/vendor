import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(20).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  type: z.enum(['contact', 'booking']).optional().default('contact'),
  solution: z.string().max(200).optional().nullable(),
  plan: z.string().max(200).optional().nullable(),
  budget: z.string().max(200).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(`contact:${ip}`, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = contactSchema.parse(body)

    if (parsed.type === 'booking') {
      const { error } = await supabase.from('bookings').insert({
        name: parsed.name, email: parsed.email, phone: parsed.phone,
        company: parsed.company || null,
        solution: parsed.solution || null, plan: parsed.plan || null,
        budget: parsed.budget || null,
      })
      if (error) throw error
    } else {
      const { error } = await supabase.from('contacts').insert({
        name: parsed.name, email: parsed.email, phone: parsed.phone || null,
        message: parsed.message || null,
        type: parsed.type || 'contact', solution: parsed.solution || null,
        plan: parsed.plan || null, budget: parsed.budget || null,
      })
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('Contact API error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
