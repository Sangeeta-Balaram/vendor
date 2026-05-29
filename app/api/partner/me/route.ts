import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/db'

function getPartnerFromToken(token: string): { name: string; phone: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const payload = parts[0]
    const sig = crypto.createHash('sha256').update(payload + '::partner-secret').digest('hex')
    if (sig !== parts[1]) return null
    const [name, phone] = payload.split(':')
    return { name, phone }
  } catch { return null }
}

export async function GET() {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('partner_token')?.value
    if (!token) return NextResponse.json({ loggedIn: false })

    const partner = getPartnerFromToken(token)
    if (!partner) return NextResponse.json({ loggedIn: false })

    const { data } = await supabaseAdmin.from('quotes').select('email').eq('name', partner.name).eq('phone', partner.phone).limit(1).single()
    if (!data) return NextResponse.json({ loggedIn: false })

    return NextResponse.json({ loggedIn: true, name: partner.name, phone: partner.phone, email: data.email })
  } catch {
    return NextResponse.json({ loggedIn: false })
  }
}
