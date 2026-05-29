import { createClient, SupabaseClient } from '@supabase/supabase-js'

function makeLazy(getKey: () => string): SupabaseClient {
  let client: SupabaseClient | null = null
  return new Proxy({} as SupabaseClient, {
    get(_, prop) {
      if (!client) {
        const url = process.env.SUPABASE_URL
        const key = getKey()
        if (!url || !key) throw new Error('Supabase credentials not configured')
        client = createClient(url, key)
      }
      return (client as any)[prop]
    }
  })
}

export const supabase: SupabaseClient = makeLazy(() => process.env.SUPABASE_ANON_KEY || '')
export const supabaseAdmin: SupabaseClient = makeLazy(() => process.env.SUPABASE_SERVICE_ROLE_KEY || '')
