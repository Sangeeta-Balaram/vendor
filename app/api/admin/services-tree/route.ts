import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { solutionServiceTree } = await import('@/lib/pricing')
  const items: { id: string; name: string; price: number }[] = []
  for (const slug of Object.keys(solutionServiceTree)) {
    for (const g of solutionServiceTree[slug]) {
      if (g.subServices) {
        for (const s of g.subServices) items.push({ id: s.id, name: `${g.name} → ${s.name}`, price: s.price })
      } else {
        items.push({ id: g.id, name: g.name, price: g.price })
      }
    }
  }
  return NextResponse.json(items)
}
