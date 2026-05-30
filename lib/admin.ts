import { createHash, randomBytes } from 'crypto'
import { supabaseAdmin } from '@/lib/db'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret'

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

function createToken(username: string): string {
  const payload = `${username}:${Date.now()}:${randomBytes(8).toString('hex')}`
  const sig = createHash('sha256').update(payload + ADMIN_SECRET).digest('hex')
  return `${payload}.${sig}`
}

function verifyToken(token: string): string | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const payload = parts[0]
    const sig = createHash('sha256').update(payload + ADMIN_SECRET).digest('hex')
    if (sig !== parts[1]) return null
    return payload.split(':')[0]
  } catch { return null }
}

export async function authenticateAdmin(username: string, password: string): Promise<{ success: boolean; token?: string }> {
  try {
    const { data } = await supabaseAdmin
      .from('admin_users')
      .select('password_hash')
      .eq('username', username)
      .single()
    if (!data) return { success: false }
    if (hashPassword(password) !== data.password_hash) return { success: false }
    return { success: true, token: createToken(username) }
  } catch (e) {
    console.error('Admin auth error:', e)
    return { success: false }
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token) return false
    return verifyToken(token) !== null
  } catch { return false }
}
