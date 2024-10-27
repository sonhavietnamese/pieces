'use server'

import { cookies } from 'next/headers'

import { HydrateClient } from '@/lib/trpc/server'
import { auth } from '@/server/auth'
import { lucia } from '@/server/auth/lucia'

export default async function LogoutButton() {
  const session = await auth()

  if (!session) return null

  return (
    <form
      action={async () => {
        'use server'
        await lucia.invalidateSession(session.id)
        const cookieStore = cookies()
        cookieStore.delete(lucia.sessionCookieName)
      }}
    >
      <button className="group absolute right-9 top-9 z-10 flex items-center gap-2 rounded-full bg-background p-2 text-white transition-colors duration-100 hover:bg-primary">
        <figure className="relative flex h-6 w-6 items-center justify-center">
          <svg
            className="ml-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Iconly/Regular/Light/Logout">
              <g id="Logout">
                <path
                  id="Stroke 1"
                  d="M15.016 7.38961V6.45661C15.016 4.42161 13.366 2.77161 11.331 2.77161H6.45597C4.42197 2.77161 2.77197 4.42161 2.77197 6.45661V17.5866C2.77197 19.6216 4.42197 21.2716 6.45597 21.2716H11.341C13.37 21.2716 15.016 19.6266 15.016 17.5976V16.6546"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  id="Stroke 3"
                  d="M21.8094 12.0215H9.76843"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  id="Stroke 5"
                  d="M18.8812 9.10638L21.8092 12.0214L18.8812 14.9374"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
              </g>
            </g>
          </svg>
        </figure>
      </button>
    </form>
  )
}
