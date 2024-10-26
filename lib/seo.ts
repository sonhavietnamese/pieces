import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { type Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

interface Prams {
  title?: string
  description?: string
  url?: string
  images?: OpenGraph['images']
}

export const seo = (params: Prams): Metadata => {
  const title = params.title ? `${params.title} | Pieces` : 'Pieces'
  const description =
    params.description ?? 'Pieces is a platform for creating and sharing your own stories.'
  const images = params.images ?? ['/api/og']
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl()

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    applicationName: 'Pieces',
    alternates: { canonical: url },
    openGraph: { url, images, type: 'website' },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/favicon.png' },
  }
}
