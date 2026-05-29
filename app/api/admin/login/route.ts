import { NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin'

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const result = await authenticateAdmin(username, password)
  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', result.token!, {
    httpOnly: true, secure: false, sameSite: 'lax', maxAge: 86400, path: '/',
  })
  return res
}
