import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/db'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function createToken(username: string): string {
  const payload = `${username}:${Date.now()}`
  return payload + '.' + crypto.createHash('sha256').update(payload + '::admin-secret').digest('hex')
}

function verifyToken(token: string): string | null {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const payload = parts[0]
  const sig = crypto.createHash('sha256').update(payload + '::admin-secret').digest('hex')
  if (sig !== parts[1]) return null
  return payload.split(':')[0]
}

export async function authenticateAdmin(username: string, password: string): Promise<{ success: boolean; token?: string }> {
  try {
    const { data } = await supabaseAdmin.from('admin_users').select('password_hash').eq('username', username).single()
    if (!data) return { success: false }
    if (hashPassword(password) !== data.password_hash) return { success: false }
    return { success: true, token: createToken(username) }
  } catch {
    return { success: false }
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token) return false
    const username = verifyToken(token)
    if (!username) return false
    const { data } = await supabaseAdmin.from('admin_users').select('id').eq('username', username).single()
    return !!data
  } catch {
    return false
  }
}
