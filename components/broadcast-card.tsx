import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Broadcast } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface BroadcastCardProps {
  broadcast: Broadcast
  isOpen: boolean
}

export default function BroadcastCard({ broadcast, isOpen }: BroadcastCardProps) {
  const [likes, setLikes] = useState(broadcast.likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <li
      id={`broadcast-card`}
      className="group relative flex min-h-28 select-none flex-col items-start gap-2 rounded-2xl bg-white/70 p-3"
      style={{
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center gap-2">
          <figure className="relative h-[50px] w-[50px] overflow-hidden rounded-lg bg-[#EDDCC0]">
            <Image
              draggable={false}
              src={broadcast.avatar}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </figure>
        </div>

        <div className="flex flex-col gap-0.5">
          <Link href="#" className="font-collage text-sm text-primary/80">
            @{broadcast.from}
          </Link>
          <p className="ml-1 select-none text-sm leading-[15px] text-primary/50">
            {broadcast.title}
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#EDDCC0]">
          <Image
            draggable={false}
            src={broadcast.image}
            alt="Broadcast"
            fill
            className="object-cover"
          />
        </figure>

        <button className="absolute bottom-2 right-2">
          <figure className="h-12 w-12 overflow-hidden rounded-lg">
            <Image
              draggable={false}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7v4BnHi0BYWM4FIdTGuwXioj8A6RgRN4PWQ&s"
              alt="Heart"
              fill
              className="object-cover"
            />
          </figure>
        </button>

        <div className="absolute bottom-2 left-2">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center justify-center gap-1 rounded-lg bg-white p-1.5 pr-2.5 leading-none opacity-[.9] transition-opacity hover:opacity-100',
              isLiked && 'bg-primary',
            )}
          >
            <figure className="h-4 w-4 overflow-hidden rounded-lg">
              <svg
                className="h-full w-full"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_10_51)">
                  <path
                    d="M16.9083 7.94673L16.3853 7.45682C16.4969 7.36881 16.603 7.27156 16.7026 7.16523C17.7828 6.01228 17.7238 4.20199 16.5708 3.12184C15.4179 2.0417 13.6076 2.10071 12.5274 3.25367C12.4278 3.36 12.3377 3.47226 12.2571 3.5893L11.4198 2.8048C10.3536 1.806 8.6797 1.86058 7.6809 2.9267L7.5069 3.11242C7.48863 3.09438 7.47009 3.07653 7.45126 3.05889C6.29831 1.97874 4.48802 2.03776 3.40788 3.19071C2.32773 4.34366 2.38675 6.15395 3.5397 7.2341C3.55853 7.25174 3.57754 7.26908 3.59674 7.28613L2.53897 8.41519C1.54018 9.48131 1.59475 11.1553 2.66087 12.1541L3.92086 13.3345C4.28015 13.6711 4.73544 13.7446 5.10482 13.68C5.46422 13.6172 5.8002 13.4194 6.03108 13.1192C6.04818 13.097 6.06668 13.0752 6.08663 13.0539C6.4116 12.707 6.95623 12.6893 7.30309 13.0142C7.64996 13.3392 7.66772 13.8838 7.34275 14.2307C7.32279 14.252 7.30222 14.2719 7.28116 14.2904C6.99668 14.5403 6.82114 14.8885 6.78189 15.2512C6.74155 15.624 6.84452 16.0735 7.20382 16.4101L8.14936 17.296C9.21548 18.2948 10.8894 18.2402 11.8882 17.1741L13.243 15.728C13.7263 15.2121 13.6733 14.5192 13.4202 14.0728C13.239 13.7531 13.2787 13.3408 13.5416 13.0603C13.8044 12.7797 14.2132 12.7132 14.5441 12.8732C15.006 13.0966 15.7009 13.1045 16.1842 12.5886L17.0302 11.6856C18.029 10.6195 17.9744 8.94553 16.9083 7.94673Z"
                    stroke={!isLiked ? '#6C3F27' : 'white'}
                    strokeWidth="2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10_51">
                    <rect width="19" height="19" fill={!isLiked ? '#6C3F27' : 'white'} />
                  </clipPath>
                </defs>
              </svg>
            </figure>
            <span
              className={cn(
                'text-sm font-semibold leading-none',
                !isLiked ? 'text-primary' : 'text-white',
              )}
            >
              {likes}
            </span>
          </button>
        </div>
      </div>
    </li>
  )
}
