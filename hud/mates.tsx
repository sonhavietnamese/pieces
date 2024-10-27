'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { useMate } from '@/hooks/use-mate'
import { useStage } from '@/hooks/use-stage'
import { MATES_MOCK } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Mates() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, setIsOpen } = useMate()
  const { setStage } = useStage()

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(containerRef.current, {
          opacity: 1,
          y: -20,
          duration: 0.3,
          delay: 0.3,
          pointerEvents: 'auto',
        })

        gsap.fromTo(
          `#mate-card`,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, delay: 0.3 },
        )
      }
      if (!isOpen) {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.3, y: 20, pointerEvents: 'none' })
      }
    },
    { scope: containerRef, dependencies: [isOpen] },
  )

  const onClose = () => {
    setIsOpen(false)
    setStage('idle')
  }

  return (
    <aside
      ref={containerRef}
      className="pointer-events-none absolute bottom-0 right-5 max-h-[50vh] w-[400px] rounded-3xl bg-background p-4 leading-none opacity-0"
      style={{
        zIndex: isOpen ? 50 : 1,
      }}
    >
      <div className="flex items-center justify-between pl-1">
        <h3 className="font-collage text-2xl text-primary">Mates</h3>

        <button
          className="group rounded-lg p-1 transition-colors hover:bg-primary/10"
          onClick={onClose}
        >
          <figure className="relative flex h-5 w-5 items-center justify-center transition-transform">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Iconly/Regular/Light/Close Square">
                <g id="Close Square">
                  <path
                    id="Stroke 1"
                    d="M14.3955 9.59503L9.60352 14.387"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#CDC4BD]"
                  />
                  <path
                    id="Stroke 2"
                    d="M14.397 14.3899L9.60095 9.59293"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#CDC4BD]"
                  />
                  <path
                    id="Stroke 3"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.3345 2.75034H7.66549C4.64449 2.75034 2.75049 4.88934 2.75049 7.91634V16.0843C2.75049 19.1113 4.63549 21.2503 7.66549 21.2503H16.3335C19.3645 21.2503 21.2505 19.1113 21.2505 16.0843V7.91634C21.2505 4.88934 19.3645 2.75034 16.3345 2.75034Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#CDC4BD]"
                  />
                </g>
              </g>
            </svg>
          </figure>
        </button>
      </div>

      <div className="mt-2 h-[400px] w-full overflow-auto rounded-xl">
        <ul className="mt-1 flex flex-col gap-3">
          {MATES_MOCK.map((mate) => (
            <li
              id={`mate-card`}
              key={mate.id}
              className="group relative flex min-h-28 items-start gap-3.5 rounded-xl bg-white/70 p-3"
            >
              <div className="relative flex items-center gap-2">
                <figure className="relative h-16 w-16 overflow-hidden rounded-lg bg-[#EDDCC0]">
                  <Image
                    draggable={false}
                    src={mate.avatar}
                    alt={mate.username}
                    fill
                    className="object-cover"
                  />
                </figure>

                <div
                  className={cn(
                    'absolute -bottom-1 -right-1.5 h-3 w-3 rounded-full outline outline-white',
                    {
                      'bg-[#32E069]': mate.status === 'online',
                      'bg-[#F44336]': mate.status === 'offline',
                      'bg-[#FF9800]': mate.status === 'away',
                    },
                  )}
                ></div>
              </div>

              <div className="mt-2 flex flex-col gap-1">
                <span className="font-collage text-primary/80">@{mate.username}</span>
                <p className="select-none text-sm leading-none text-primary/50">{mate.bio}</p>
              </div>

              <button className="absolute bottom-3 right-3 rounded-lg bg-primary/50 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-primary group-hover:bg-primary/70">
                Visit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
