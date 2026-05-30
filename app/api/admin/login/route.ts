import { NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin'

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const result = await authenticateAdmin(username, password)
  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  const isSecure = process.env.NODE_ENV === 'production'
  res.cookies.set('admin_token', result.token!, {
    httpOnly: true, secure: isSecure, sameSite: 'lax', maxAge: 86400, path: '/',
  })
  return res
}
