import { redirect } from 'next/navigation'

import { auth } from '@/server/auth'
import PageClient from './page.client'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return <PageClient user={session.user} />
}
