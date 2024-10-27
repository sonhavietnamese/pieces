'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { usePrompt } from '@/hooks/use-prompt'

export default function Prompt() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, setIsOpen } = usePrompt()

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(containerRef.current, {
          opacity: 1,
          y: -20,
          duration: 0.3,
          delay: 0.3,
        })

        // gsap.fromTo(
        //   `#mate-card`,
        //   { opacity: 0, y: 10 },
        //   { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, delay: 0.3 },
        // )
      }
      if (!isOpen) {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.3, y: 20 })
      }
    },
    { scope: containerRef, dependencies: [isOpen] },
  )

  return (
    <aside
      ref={containerRef}
      className="absolute bottom-0 left-1/2 max-h-[50vh] w-[400px] -translate-x-1/2 rounded-3xl bg-background p-4 leading-none opacity-0"
      style={{
        zIndex: isOpen ? 50 : 1,
      }}
    >
      <div className="flex items-center justify-between pl-1">
        <h3 className="font-collage text-xl text-primary">What’s on your mind?</h3>
        <button
          className="group rounded-lg p-1 transition-colors hover:bg-primary/10"
          onClick={() => setIsOpen(false)}
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

      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="relative mt-4 h-fit w-full overflow-auto rounded-xl"
      >
        <input
          placeholder="Ex: A shinny sunflower"
          className="w-full resize-none rounded-xl border-none bg-white/70 p-3 pl-4 pr-16 text-primary outline-none placeholder:text-primary/50"
        />

        <button className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary/50 px-2.5 py-1.5 font-semibold text-white transition-colors hover:bg-primary group-hover:bg-primary/70">
          Go
        </button>
      </form>
    </aside>
  )
}
