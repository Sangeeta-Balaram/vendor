import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, type, solution, plan, budget } = body

    if (type === 'booking') {
      const { error } = await supabase.from('bookings').insert({
        name, email, phone, company: body.company || null,
        solution: solution || null, plan: plan || null, budget: budget || null,
      })
      if (error) throw error
    } else {
      const { error } = await supabase.from('contacts').insert({
        name, email, phone: phone || null, message: message || null,
        type: type || 'contact', solution: solution || null,
        plan: plan || null, budget: budget || null,
      })
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
