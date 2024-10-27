'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import BroadcastCard from '@/components/broadcast-card'
import { useBroadcast } from '@/hooks/use-broadcast'
import { useStage } from '@/hooks/use-stage'
import { BROADCAST_MOCK } from '@/lib/constants'

export default function Broadcast() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, setIsOpen } = useBroadcast()
  const { setStage } = useStage()

  useGSAP(
    () => {
      if (isOpen) {
        gsap.fromTo(
          containerRef.current,
          {
            opacity: 0,
            y: 20,
            pointerEvents: 'none',
          },
          {
            opacity: 1,
            y: -20,
            duration: 0.3,
            delay: 0.3,
            pointerEvents: 'auto',
          },
        )

        gsap.fromTo(
          `#broadcast-card`,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, delay: 0.4 },
        )
      }
      if (!isOpen) {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' })
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
      className="pointer-events-none absolute bottom-0 right-5 h-[calc(100%-1.25rem*2)] w-[400px] rounded-3xl bg-background p-4 leading-none opacity-0"
      style={{
        zIndex: isOpen ? 50 : 1,
      }}
    >
      <div className="flex items-start justify-between pl-1">
        <h3 className="font-collage text-2xl text-primary">Broadcast</h3>
        <div>
          <button className="group rounded-lg p-1 transition-colors hover:bg-primary/10">
            <figure className="relative flex h-5 w-5 items-center justify-center transition-transform group-hover:rotate-12">
              <svg
                className="h-full w-full"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="mask0_7_37" maskUnits="userSpaceOnUse" x="3" y="1" width="19" height="18">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 1H21.4969V18.348H3V1Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_7_37)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.247 2.5C8.75201 2.5 6.31601 5.238 6.31601 7.695C6.31601 9.774 5.73901 10.735 5.22901 11.583C4.82001 12.264 4.49701 12.802 4.49701 13.971C4.66401 15.857 5.90901 16.848 12.247 16.848C18.55 16.848 19.834 15.813 20 13.906C19.997 12.802 19.674 12.264 19.265 11.583C18.755 10.735 18.178 9.774 18.178 7.695C18.178 5.238 15.742 2.5 12.247 2.5ZM12.247 18.348C7.57101 18.348 3.34501 18.018 3.00001 14.035C2.99701 12.387 3.50001 11.549 3.94401 10.811C4.39301 10.063 4.81601 9.358 4.81601 7.695C4.81601 4.462 7.80201 1 12.247 1C16.692 1 19.678 4.462 19.678 7.695C19.678 9.358 20.101 10.063 20.55 10.811C20.994 11.549 21.497 12.387 21.497 13.971C21.148 18.018 16.923 18.348 12.247 18.348Z"
                    fill="#CDC4BD"
                  />
                </g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.198 22.5H12.196C11.075 22.499 10.014 22.005 9.20903 21.108C8.93203 20.801 8.95703 20.326 9.26503 20.05C9.57303 19.772 10.047 19.797 10.324 20.106C10.842 20.683 11.507 21 12.197 21H12.198C12.891 21 13.559 20.683 14.078 20.105C14.356 19.798 14.83 19.773 15.137 20.05C15.445 20.327 15.47 20.802 15.193 21.109C14.385 22.006 13.322 22.5 12.198 22.5Z"
                  fill="#CDC4BD"
                />
              </svg>
            </figure>
          </button>
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-[#CDC4BD]"
                    />
                    <path
                      id="Stroke 2"
                      d="M14.397 14.3899L9.60095 9.59293"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-[#CDC4BD]"
                    />
                    <path
                      id="Stroke 3"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.3345 2.75034H7.66549C4.64449 2.75034 2.75049 4.88934 2.75049 7.91634V16.0843C2.75049 19.1113 4.63549 21.2503 7.66549 21.2503H16.3335C19.3645 21.2503 21.2505 19.1113 21.2505 16.0843V7.91634C21.2505 4.88934 19.3645 2.75034 16.3345 2.75034Z"
                      strokeWidth="1.5"
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
      </div>

      <div className="mt-2 h-[calc(100%-1.25rem*2)] w-full overflow-auto rounded-xl">
        <ul className="mt-1 flex flex-col gap-3">
          {BROADCAST_MOCK.map((broadcast, index) => (
            <BroadcastCard broadcast={broadcast} isOpen={isOpen} key={index} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
