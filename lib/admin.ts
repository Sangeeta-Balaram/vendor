export async function authenticateAdmin(username: string, password: string): Promise<{ success: boolean; token?: string }> {
  try {
    console.log('1. Starting auth for:', username)
    console.log('2. SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'MISSING')
    console.log('3. SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING')
    
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('password_hash')
      .eq('username', username)
      .single()
    
    console.log('4. DB data:', data)
    console.log('5. DB error:', error)
    console.log('6. Hash match:', data ? hashPassword(password) === data.password_hash : 'no data')
    
    if (!data) return { success: false }
    if (hashPassword(password) !== data.password_hash) return { success: false }
    return { success: true, token: createToken(username) }
  } catch (e) {
    console.error('7. CATCH ERROR:', e)
    return { success: false }
  }
}
