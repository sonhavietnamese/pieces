'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { useBroadcast } from '@/hooks/use-broadcast'
import { useStage } from '@/hooks/use-stage'

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
          {Array.from({ length: 10 }).map((_, index) => (
            <li
              id={`broadcast-card`}
              key={index}
              className="group relative flex min-h-28 flex-col items-start gap-2 rounded-2xl bg-white/70 p-3"
              style={{
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
            >
              <div className="flex items-start gap-2.5">
                <div className="relative flex items-center gap-2">
                  <figure className="relative h-[50px] w-[50px] overflow-hidden rounded-lg bg-[#EDDCC0]">
                    <Image
                      draggable={false}
                      src="/avatars/boxi.webp"
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </figure>
                </div>

                <div className="flex flex-col gap-0.5">
                  <Link href="#" className="font-collage text-sm text-primary/80">
                    @boobyblon_
                  </Link>
                  <p className="ml-1 select-none text-sm leading-none text-primary/50">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              </div>

              <div className="relative w-full">
                <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#EDDCC0]">
                  <Image
                    draggable={false}
                    src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/traveling-based-on-fare-deals-900x510.jpg"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </figure>

                <div className="absolute bottom-2 right-2">
                  <figure className="h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      draggable={false}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7v4BnHi0BYWM4FIdTGuwXioj8A6RgRN4PWQ&s"
                      alt="Heart"
                      fill
                      className="object-cover"
                    />
                  </figure>
                </div>

                <div className="absolute bottom-2 left-2">
                  {/* <button className="flex items-center justify-center gap-1 rounded-lg bg-background p-1.5 pr-2.5 leading-none opacity-[.9] backdrop-blur-md backdrop-filter transition-opacity hover:opacity-100">
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
                            stroke="#6C3F27"
                            strokeWidth="2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_10_51">
                            <rect width="19" height="19" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </figure>
                    <span className="text-sm font-semibold leading-none text-primary/80">23</span>
                  </button> */}

                  <button className="flex items-center justify-center gap-1 rounded-lg bg-primary p-1.5 pr-2.5 leading-none opacity-[.9] backdrop-blur-md backdrop-filter transition-opacity hover:opacity-100">
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
                            stroke="white"
                            strokeWidth="2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_10_51">
                            <rect width="19" height="19" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </figure>
                    <span className="text-sm font-semibold leading-none text-white">23</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
