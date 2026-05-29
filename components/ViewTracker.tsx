'use client'
import { useEffect } from 'react'

export default function ViewTracker({ page, slug }: { page: string; slug?: string }) {
  useEffect(() => {
    fetch('/api/track-view', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page, slug: slug || null }) }).catch(() => {})
  }, [page, slug])
  return null
}
