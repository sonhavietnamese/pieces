import { revalidatePath } from 'next/cache'

import { api } from '@/lib/trpc/server'
import { auth } from '@/server/auth'

type Params = {
  username: string
}

export default async function Page({ params }: { params: Params }) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { username } = await params
  const user = await api.user.get({ username })
  const session = await auth()

  if (!user) {
    return <span>User not found</span>
  }

  const isFriend = await api.friend.isFriend({ friendId: user.id })

  return (
    <div>
      hello {user.name} - {isFriend ? 'friend' : 'not friend'}
      {!isFriend ? (
        user.id !== session?.user.id && (
          <form
            action={async () => {
              'use server'
              await api.friend.add({ friendId: user.id })
              revalidatePath(`/${user.username}`)
            }}
          >
            <button type="submit">Add friend</button>
          </form>
        )
      ) : (
        <form
          action={async () => {
            'use server'
            await api.friend.unfriend({ friendId: user.id })
            revalidatePath(`/${user.username}`)
          }}
        >
          <button type="submit">Unfriend</button>
        </form>
      )}
    </div>
  )
}
