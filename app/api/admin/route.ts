import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    supabase_url: process.env.SUPABASE_URL ? 'SET' : 'MISSING',
    service_role: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
    anon_key: process.env.SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
  })
}
