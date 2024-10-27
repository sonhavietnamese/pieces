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

export type Broadcast = {
  id: string
  title: string
  description: string
  from: string
  avatar: string
  image: string
  likes: number
  piece: string
}

export const BROADCAST_MOCK: Broadcast[] = [
  {
    id: '1',
    title: 'Such a day, Sunny day with these beautiful sunflowers',
    from: 'itownbp',
    avatar: '/avatars/bubo.webp',
    description: 'This is my first broadcast',
    image: '/broadcast/01.webp',
    likes: 10,
    piece: '/pieces/01.webp',
  },
  {
    id: '2',
    title: 'Camping day',
    from: 'mvpriebe',
    avatar: '/avatars/seep.webp',
    description: 'This is my first broadcast',
    image: '/broadcast/02.webp',
    likes: 7,
    piece: '/pieces/02.webp',
  },
  {
    id: '3',
    title: 'Handsome boyyy',
    from: 'sonhavietnamese',
    avatar: '/avatars/pupu.webp',
    description: 'This is my first broadcast',
    image: '/broadcast/03.webp',
    likes: 12,
    piece: '/pieces/03.webp',
  },
  {
    id: '4',
    title: 'Huge forest that I found',
    from: 'real_alexjones',
    avatar: '/avatars/boxi.webp',
    description: 'This is my first broadcast',
    image: '/broadcast/04.webp',
    likes: 5,
    piece: '/pieces/04.webp',
  },
]
