import Image from 'next/image'

import { AVATAR_MAPPING } from '@/lib/constants'
import { hashCode } from '@/lib/utils'

type AvatarProps = {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  const hash = (hashCode(name) % Object.keys(AVATAR_MAPPING).length) - 1

  const avatar = AVATAR_MAPPING[hash.toString()]

  if (!avatar) return null

  return (
    <div className="absolute left-10 top-10 z-[999] h-20 w-20 select-none overflow-hidden rounded-xl bg-[#D8B488] outline outline-[6px] outline-primary">
      <div className="bg-infinite h-full w-full"></div>
      <figure className="absolute inset-0 h-full w-full">
        <Image draggable={false} src={avatar} alt={name} fill />
      </figure>
    </div>
  )
}
