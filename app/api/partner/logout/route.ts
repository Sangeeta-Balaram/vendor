import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('partner_token', '', { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 0, path: '/' })
  return res
}
