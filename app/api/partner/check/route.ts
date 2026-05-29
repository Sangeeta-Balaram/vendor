import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const checkSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(20),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(`partner-check:${ip}`, 20, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = checkSchema.parse(body)

    const { data } = await supabaseAdmin.from('quotes').select('email').eq('name', parsed.name).eq('phone', parsed.phone).limit(1).single()
    if (data) return NextResponse.json({ exists: true, email: data.email })
    return NextResponse.json({ exists: false })
  } catch {
    return NextResponse.json({ exists: false })
  }
}
