import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  const authed = await isAdmin()
  return NextResponse.json({ authed })
}
