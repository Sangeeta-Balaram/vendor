import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'
import crypto from 'crypto'

function createToken(name: string, phone: string): string {
  const payload = `${name}:${phone}`
  return payload + '.' + crypto.createHash('sha256').update(payload + '::partner-secret').digest('hex')
}

const loginSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(20),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(`partner-login:${ip}`, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = loginSchema.parse(body)

    const { data: quoteData } = await supabaseAdmin.from('quotes').select('email').ilike('name', parsed.name).eq('phone', parsed.phone).limit(1).maybeSingle()
    const { data: contactData } = await supabaseAdmin.from('contacts').select('email').ilike('name', parsed.name).eq('phone', parsed.phone).limit(1).maybeSingle()

    const data = quoteData || contactData
    if (!data) {
      return NextResponse.json({ success: false, error: 'No records found with that name and phone. Please submit a contact form or quote first.' }, { status: 404 })
    }

    const token = createToken(parsed.name, parsed.phone)
    const res = NextResponse.json({ success: true, name: parsed.name, email: data.email })
    const isSecure = process.env.NODE_ENV === 'production'
    res.cookies.set('partner_token', token, { httpOnly: true, secure: isSecure, sameSite: 'lax', maxAge: 86400, path: '/' })
    return res
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
