import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { page, slug } = await req.json()
    await supabase.from('page_views').insert({ page, slug: slug || null })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
