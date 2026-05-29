import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import crypto from 'crypto'

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

export async function POST(req: Request) {
  try {
    const { resource } = await req.json()
    if (!resource) return NextResponse.json({ error: 'missing resource' }, { status: 400 })

    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('partner_token')?.value
    let name = ''
    if (token) {
      const partner = getPartnerFromToken(token)
      if (partner) name = partner.name
    }

    const { error } = await supabaseAdmin.from('resource_access').insert({ resource, partner_name: name })
    if (error) console.error('track-resource error:', error)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
