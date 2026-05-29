import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const serviceItemSchema = z.object({
  id: z.string(),
  name: z.string().max(200),
  price: z.number().min(0),
})

const quoteSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(20).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  solution: z.string().min(1).max(200),
  plan: z.string().max(200).optional().nullable(),
  planPrice: z.number().min(0).optional().nullable(),
  services: z.array(serviceItemSchema).min(1),
  servicesSubtotal: z.number().min(0),
  discount: z.number().min(0).optional().nullable(),
  gst: z.number().min(0),
  total: z.number().min(0),
  proposalPdf: z.string().max(2000000).optional().nullable(),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(`quote:${ip}`, 10, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = quoteSchema.parse(body)

    const servicesStr = parsed.services
      .map(s => `${s.name} (INR ${s.price.toLocaleString('en-IN')})`).join('; ')

    const { error } = await supabaseAdmin.from('quotes').insert({
      name: parsed.name, email: parsed.email, phone: parsed.phone || null,
      company: parsed.company || null,
      solution: parsed.solution, plan: parsed.plan || null,
      plan_price: parsed.planPrice ? `INR ${Number(parsed.planPrice).toLocaleString('en-IN')}` : null,
      services: servicesStr,
      services_subtotal: `INR ${Number(parsed.servicesSubtotal).toLocaleString('en-IN')}`,
      discount: parsed.discount ? `INR ${Number(parsed.discount).toLocaleString('en-IN')}` : '0',
      gst: `INR ${Number(parsed.gst).toLocaleString('en-IN')}`,
      total: `INR ${Number(parsed.total).toLocaleString('en-IN')}`,
      proposal_pdf: parsed.proposalPdf?.slice(0, 2000000) || null,
    })
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('Quote API error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
