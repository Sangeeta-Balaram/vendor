import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { supabaseAdmin } = await import('@/lib/db')

  const [contactsCount, bookingsCount, quotesCount, clientsCount, viewCount, negotiationsCount, agreementsCount] = await Promise.all([
    supabaseAdmin.from('contacts').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('quotes').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('clients').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('page_views').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('negotiations').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('agreements').select('*', { count: 'exact', head: true }),
  ])

  const today = new Date().toISOString().split('T')[0]
  const { count: todayViews } = await supabaseAdmin.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today)

  const { data: solutionViews } = await supabaseAdmin.from('page_views').select('slug').eq('page', 'solution')
  const { data: recentContacts } = await supabaseAdmin.from('contacts').select('*').order('created_at', { ascending: false }).limit(5)
  const { data: recentQuotes } = await supabaseAdmin.from('quotes').select('*').order('created_at', { ascending: false }).limit(5)

  return NextResponse.json({
    contacts: contactsCount.count || 0,
    bookings: bookingsCount.count || 0,
    quotes: quotesCount.count || 0,
    clients: clientsCount.count || 0,
    views: viewCount.count || 0,
    todayViews: todayViews || 0,
    negotiations: negotiationsCount.count || 0,
    agreements: agreementsCount.count || 0,
    solutionViews: solutionViews || [],
    recentContacts: recentContacts || [],
    recentQuotes: recentQuotes || [],
  })
}
