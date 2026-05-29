import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getResource, resources } from '@/lib/resources'
import { supabaseAdmin } from '@/lib/db'

export function generateStaticParams() {
  return resources.map(r => ({ slug: r.slug }))
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let resource = getResource(slug)

  if (!resource) {
    const { data } = await supabaseAdmin.from('resources').select('*').eq('slug', slug).single()
    if (data) resource = { ...data, desc: data.desc || data.description }
  }

  if (!resource) notFound()

  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <Link href="/resources" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">&larr; Back to Resources</Link>
      <div className="text-[9px] font-bold uppercase tracking-[.15em] text-purple-600 mb-3">{resource.type}</div>
      <h1 className="text-[40px] font-extrabold tracking-[-.03em] mb-6">{resource.title}</h1>
      <p className="text-gray-600 leading-relaxed">{resource.body}</p>
    </div>
  )
}
