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
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const partner = getPartnerFromToken(token)
    if (!partner) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: partnerData } = await supabaseAdmin
      .from('quotes').select('email').eq('name', partner.name).eq('phone', partner.phone).limit(1).maybeSingle()

    const [quotes, negotiations, agreements, onboarding, resourceAccess] = await Promise.all([
      supabaseAdmin.from('quotes').select('*').eq('phone', partner.phone).order('created_at', { ascending: false }),
      supabaseAdmin.from('negotiations').select('*').eq('phone', partner.phone).order('created_at', { ascending: false }),
      supabaseAdmin.from('agreements').select('*').eq('phone', partner.phone).order('created_at', { ascending: false }),
      supabaseAdmin.from('onboarding').select('*').eq('phone', partner.phone).order('created_at', { ascending: false }),
      supabaseAdmin.from('resource_access').select('*').eq('phone', partner.phone).order('created_at', { ascending: false }),
    ])

    return NextResponse.json({
      loggedIn: true,
      partner: { name: partner.name, phone: partner.phone, email: partnerData?.email || '' },
      quotes: quotes.data || [],
      contacts: [],
      bookings: [],
      negotiations: negotiations.data || [],
      agreements: agreements.data || [],
      onboarding: onboarding.data || [],
      resourceAccess: resourceAccess.data || [],
    })
  } catch (e) {
    console.error('partner/me error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
