import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  const isSecure = process.env.NODE_ENV === 'production'
  res.cookies.set('partner_token', '', { httpOnly: true, secure: isSecure, sameSite: 'lax', maxAge: 0, path: '/' })
  return res
}
