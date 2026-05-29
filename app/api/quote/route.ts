import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, solution, plan, planPrice, services, servicesSubtotal, discount, gst, total, proposalPdf } = body

    const servicesStr = (services as Array<{ id: string; name: string; price: number }>)
      .map(s => `${s.name} (INR ${s.price.toLocaleString('en-IN')})`).join('; ')

    const { error } = await supabaseAdmin.from('quotes').insert({
      name, email, phone: phone || null, company: company || null,
      solution, plan: plan || null,
      plan_price: planPrice ? `INR ${Number(planPrice).toLocaleString('en-IN')}` : null,
      services: servicesStr,
      services_subtotal: `INR ${Number(servicesSubtotal).toLocaleString('en-IN')}`,
      discount: discount ? `INR ${Number(discount).toLocaleString('en-IN')}` : '0',
      gst: `INR ${Number(gst).toLocaleString('en-IN')}`,
      total: `INR ${Number(total).toLocaleString('en-IN')}`,
      proposal_pdf: proposalPdf?.slice(0, 2000000) || null,
    })
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote API error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
