import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import crypto from 'crypto'

function createToken(name: string, phone: string): string {
  const payload = `${name}:${phone}`
  return payload + '.' + crypto.createHash('sha256').update(payload + '::partner-secret').digest('hex')
}

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json()
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ success: false, error: 'Name and phone required' }, { status: 400 })
    }

    const { data } = await supabaseAdmin.from('quotes').select('email').eq('name', name.trim()).eq('phone', phone.trim()).limit(1).single()
    if (!data) {
      return NextResponse.json({ success: false, error: 'No records found with that name and phone' }, { status: 404 })
    }

    const token = createToken(name.trim(), phone.trim())
    const res = NextResponse.json({ success: true, name: name.trim(), email: data.email })
    res.cookies.set('partner_token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 86400, path: '/' })
    return res
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
