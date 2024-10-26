import { cookies } from 'next/headers'

import { HydrateClient } from '@/lib/trpc/server'
import { auth } from '@/server/auth'
import { lucia } from '@/server/auth/lucia'

export default async function Page() {
  const session = await auth()

  // const generate = async () => {
  //   try {
  //     const result = await livepeer.generate.textToImage({
  //       prompt: 'A beautiful sunset over the ocean',
  //     })

  //     console.log(result)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <HydrateClient>
      <main className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
        <div className="flex flex-col items-center justify-center"></div>

        <a href="/api/auth/google">Sign in with Google</a>
        <div className="mt-4 flex items-center gap-2">
          {session ? (
            <>
              <span>Logged in as {session.user.name}</span>
              <form
                action={async () => {
                  'use server'
                  await lucia.invalidateSession(session.id)
                  const cookieStore = await cookies()
                  cookieStore.delete(lucia.sessionCookieName)
                }}
              >
                <button className="text-sm text-primary transition-colors hover:text-background">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <form action="/api/auth/google" method="GET">
              <button className="text-sm text-primary transition-colors hover:text-background">
                Login with Google
              </button>
            </form>
          )}
        </div>
      </main>
    </HydrateClient>
  )
}
