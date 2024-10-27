export const AVATAR_MAPPING: Record<string, string> = {
  '0': '/avatars/boxi.webp',
  '1': '/avatars/bubo.webp',
  '2': '/avatars/dudu.webp',
  '3': '/avatars/foco.webp',
  '4': '/avatars/pupu.webp',
  '5': '/avatars/rogo.webp',
  '6': '/avatars/sako.webp',
  '7': '/avatars/seep.webp',
}

export type Status = 'online' | 'offline' | 'away'

export type Mate = {
  id: string
  username: string
  bio: string
  avatar: string
  status: Status
}

export const MATES_MOCK: Mate[] = [
  {
    id: '1',
    username: 'real_alexjones',
    bio: 'Beautiful day for a walk!',
    status: 'online',
    avatar: '/avatars/boxi.webp',
  },
  {
    id: '2',
    username: 'itownbp',
    bio: 'Please, feed the cat',
    status: 'offline',
    avatar: '/avatars/bubo.webp',
  },
  {
    id: '3',
    username: 'mvpriebe',
    bio: 'Harvesting the garden',
    status: 'away',
    avatar: '/avatars/seep.webp',
  },
  {
    id: '4',
    username: '_mattrot',
    bio: 'Sunny day, lil bit of work, but mostly fun',
    status: 'online',
    avatar: '/avatars/foco.webp',
  },
  {
    id: '5',
    username: 'sonhavietnamese',
    bio: '100% Vietnamese',
    status: 'offline',
    avatar: '/avatars/pupu.webp',
  },
]
