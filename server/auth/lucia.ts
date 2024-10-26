import 'server-only'

import type { User } from '@prisma/client'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Discord, Google } from 'arctic'
import { Lucia } from 'lucia'

import { env } from '@/env'
import { getBaseUrl } from '@/lib/utils'
import { db } from '@/server/db'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: { expires: false, attributes: { secure: env.NODE_ENV === 'production' } },
  getUserAttributes: (attributes) => attributes,
})

export const discord = new Discord('', '', `${getBaseUrl()}/api/auth/discord/callback`)

export const google = new Google(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  env.GOOGLE_CLIENT_ID,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  env.GOOGLE_CLIENT_SECRET,
  `${getBaseUrl()}/api/auth/google/callback`,
)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
