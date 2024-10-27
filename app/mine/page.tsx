import { redirect } from 'next/navigation'

import LogoutButton from '@/components/logout-button'
import { auth } from '@/server/auth'
import PageClient from './page.client'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <LogoutButton />
      <PageClient user={session.user} />
    </>
  )
}
