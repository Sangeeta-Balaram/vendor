import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json()
    if (!name?.trim() || !phone?.trim()) return NextResponse.json({ exists: false })

    const { data } = await supabaseAdmin.from('quotes').select('email').eq('name', name.trim()).eq('phone', phone.trim()).limit(1).single()
    if (data) return NextResponse.json({ exists: true, email: data.email })
    return NextResponse.json({ exists: false })
  } catch {
    return NextResponse.json({ exists: false })
  }
}
