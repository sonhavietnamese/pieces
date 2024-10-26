'use client'

import type { User } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Vignette from '@/components/vignette'
import { useBroadcast } from '@/hooks/use-broadcast'
import { useMate } from '@/hooks/use-mate'
import { usePrompt } from '@/hooks/use-prompt'
import Avatar from '@/hud/avatar'
import Prompt from '@/hud/prompt'

const Broadcast = dynamic(() => import('@/hud/broadcast'))
const Mates = dynamic(() => import('@/hud/mates'))
const Land = dynamic(() => import('@/scenes/land'))

type Panel = 'mates' | 'broadcast' | 'prompt'

interface PageClientProps {
  user: User
}

export default function PageClient({ user }: PageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const groupButtonsRef = useRef<HTMLDivElement>(null)

  const { isOpen: isMateOpen, setIsOpen: setIsMateOpen } = useMate()
  const { isOpen: isBroadcastOpen, setIsOpen: setIsBroadcastOpen } = useBroadcast()
  const { isOpen: isPromptOpen, setIsOpen: setIsPromptOpen } = usePrompt()

  const isExpanded = useMemo(
    () => isMateOpen || isBroadcastOpen || isPromptOpen,
    [isMateOpen, isBroadcastOpen, isPromptOpen],
  )

  useGSAP(
    () => {
      if (!isExpanded) {
        gsap.fromTo(
          '#roundedRectClip rect',
          { width: '100%', height: '100%', rx: 0, x: 0, y: 0 },
          {
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            rx: 24,
            x: 20,
            y: 20,
            duration: 0.3,
          },
        )

        gsap.fromTo(
          groupButtonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.2, delay: 0.4 },
        )
      }

      if (isExpanded) {
        gsap.fromTo(
          '#roundedRectClip rect',
          { width: 'calc(100% - 40px)', height: 'calc(100% - 40px)', rx: 24, x: 20, y: 20 },
          {
            width: '100%',
            height: '100%',
            rx: 0,
            x: 0,
            y: 0,
            duration: 0.3,
          },
        )

        gsap.fromTo(
          groupButtonsRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: 20, duration: 0.2 },
        )
      }
    },
    { scope: containerRef, dependencies: [isExpanded] },
  )

  const handleOpenPanel = (panel: Panel) => {
    setIsMateOpen(panel === 'mates')
    setIsBroadcastOpen(panel === 'broadcast')
    setIsPromptOpen(panel === 'prompt')
  }

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-background"
      style={{
        clipPath: 'url(#roundedRectClip)',
      }}
    >
      <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="roundedRectClip">
            <rect x="0" y="0" width="100%" height="100%" rx="24" />
          </clipPath>
        </defs>
      </svg>

      <section ref={contentRef} className="h-full w-full overflow-hidden bg-black">
        <Vignette />

        <Land />
      </section>

      <Avatar name={user.username} />
      <Mates />
      <Broadcast />
      <Prompt />

      <div
        ref={groupButtonsRef}
        className="absolute bottom-9 z-20 grid w-full select-none grid-cols-3 justify-between gap-3 px-9"
      >
        <div className="flex items-center gap-3">
          <button className="group flex items-center gap-2 rounded-full bg-background p-3 text-white transition-colors duration-100 hover:bg-primary">
            <figure className="relative flex h-7 w-7 items-center justify-center transition-transform group-hover:rotate-90">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Iconly/Regular/Light/Setting">
                  <g id="Setting">
                    <path
                      id="Path_33946"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.8067 7.62368L20.1842 6.54358C19.6577 5.62966 18.4907 5.31438 17.5755 5.83878V5.83878C17.1399 6.09541 16.6201 6.16821 16.1307 6.04115C15.6413 5.91408 15.2226 5.59758 14.9668 5.16143C14.8023 4.88421 14.7139 4.56846 14.7105 4.2461V4.2461C14.7254 3.72928 14.5304 3.22846 14.17 2.85773C13.8096 2.487 13.3145 2.27792 12.7975 2.27814H11.5435C11.037 2.27813 10.5513 2.47998 10.194 2.83901C9.83669 3.19804 9.63717 3.68465 9.63961 4.19118V4.19118C9.6246 5.23699 8.77248 6.07687 7.72657 6.07676C7.40421 6.07342 7.08846 5.98501 6.81123 5.82047V5.82047C5.89606 5.29607 4.72911 5.61136 4.20254 6.52528L3.53435 7.62368C3.00841 8.53645 3.3194 9.70267 4.23 10.2324V10.2324C4.8219 10.5741 5.18653 11.2057 5.18653 11.8891C5.18653 12.5726 4.8219 13.2041 4.23 13.5459V13.5459C3.32056 14.072 3.00923 15.2354 3.53435 16.1454V16.1454L4.16593 17.2347C4.41265 17.6798 4.8266 18.0084 5.31619 18.1475C5.80578 18.2866 6.33064 18.225 6.77462 17.9761V17.9761C7.21108 17.7214 7.73119 17.6516 8.21934 17.7823C8.70749 17.9129 9.12324 18.2331 9.37416 18.6717C9.5387 18.949 9.62711 19.2647 9.63046 19.5871V19.5871C9.63046 20.6436 10.487 21.5001 11.5435 21.5001H12.7975C13.8505 21.5001 14.7055 20.6492 14.7105 19.5962V19.5962C14.7081 19.0881 14.9089 18.6001 15.2682 18.2408C15.6275 17.8815 16.1155 17.6807 16.6236 17.6832C16.9452 17.6918 17.2596 17.7798 17.5389 17.9395V17.9395C18.4517 18.4654 19.6179 18.1544 20.1476 17.2438V17.2438L20.8067 16.1454C21.0618 15.7076 21.1318 15.1861 21.0012 14.6964C20.8706 14.2068 20.5502 13.7894 20.111 13.5367V13.5367C19.6718 13.284 19.3514 12.8666 19.2208 12.377C19.0902 11.8874 19.1603 11.3659 19.4154 10.928C19.5812 10.6384 19.8214 10.3983 20.111 10.2324V10.2324C21.0161 9.70295 21.3264 8.54355 20.8067 7.63283V7.63283V7.62368Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <circle
                      id="Ellipse_737"
                      cx="12.175"
                      cy="11.8891"
                      r="2.63616"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                  </g>
                </g>
              </svg>
            </figure>
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button className="group flex items-center gap-2 rounded-full bg-background p-3 text-white transition-colors duration-100 hover:bg-primary">
            <figure className="relative flex h-7 w-7 items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Iconly/Regular/Light/Camera">
                  <g id="Camera">
                    <path
                      id="Stroke 1"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0402 4.05144C16.0502 4.45344 16.3592 5.85344 16.7722 6.30344C17.1852 6.75344 17.7762 6.90644 18.1032 6.90644C19.8412 6.90644 21.2502 8.31544 21.2502 10.0524V15.8474C21.2502 18.1774 19.3602 20.0674 17.0302 20.0674H6.97024C4.63924 20.0674 2.75024 18.1774 2.75024 15.8474V10.0524C2.75024 8.31544 4.15924 6.90644 5.89724 6.90644C6.22324 6.90644 6.81424 6.75344 7.22824 6.30344C7.64124 5.85344 7.94924 4.45344 8.95924 4.05144C9.97024 3.64944 14.0302 3.64944 15.0402 4.05144Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <path
                      id="Stroke 13"
                      d="M17.4955 9.50012H17.5045"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <path
                      id="Stroke 5"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.1789 13.1282C15.1789 11.3722 13.7559 9.94916 11.9999 9.94916C10.2439 9.94916 8.82092 11.3722 8.82092 13.1282C8.82092 14.8842 10.2439 16.3072 11.9999 16.3072C13.7559 16.3072 15.1789 14.8842 15.1789 13.1282Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                  </g>
                </g>
              </svg>
            </figure>
          </button>

          <button className="group flex items-center gap-2 rounded-full bg-background p-3 text-white transition-colors duration-100 hover:bg-primary">
            <figure className="relative flex h-7 w-7 items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Iconly/Regular/Light/Image">
                  <g id="Image">
                    <path
                      id="Stroke 1"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.21 7.89931V16.0503C21.21 19.0703 19.32 21.2003 16.3 21.2003H7.65C4.63 21.2003 2.75 19.0703 2.75 16.0503V7.89931C2.75 4.87931 4.64 2.75031 7.65 2.75031H16.3C19.32 2.75031 21.21 4.87931 21.21 7.89931Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <path
                      id="Stroke 3"
                      d="M5.28125 16.431L6.80925 14.818C7.34025 14.255 8.22525 14.228 8.78925 14.758C8.80625 14.775 9.72625 15.71 9.72625 15.71C10.2813 16.275 11.1883 16.284 11.7533 15.73C11.7903 15.694 14.0872 12.908 14.0872 12.908C14.6792 12.189 15.7422 12.086 16.4622 12.679C16.5102 12.719 18.6803 14.946 18.6803 14.946"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <path
                      id="Stroke 5"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.3126 9.13321C10.3126 10.1022 9.52757 10.8872 8.55857 10.8872C7.58957 10.8872 6.80457 10.1022 6.80457 9.13321C6.80457 8.16421 7.58957 7.37921 8.55857 7.37921C9.52757 7.38021 10.3126 8.16421 10.3126 9.13321Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                  </g>
                </g>
              </svg>
            </figure>
          </button>

          <button
            className="group flex items-center gap-2 rounded-full bg-background p-3 text-white transition-colors duration-100 hover:bg-primary"
            onMouseUp={() => handleOpenPanel('prompt')}
          >
            <figure className="relative flex h-7 w-7 items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Iconly/Regular/Light/Edit">
                  <g id="Edit">
                    <path
                      id="Stroke 1"
                      d="M13.7473 20.443H20.9999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <path
                      id="Stroke 3"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.78 3.79491C13.5557 2.86791 14.95 2.73198 15.8962 3.49186C15.9485 3.53308 17.6295 4.83891 17.6295 4.83891C18.669 5.46731 18.992 6.80323 18.3494 7.82271C18.3153 7.87731 8.81195 19.7646 8.81195 19.7646C8.49578 20.159 8.01583 20.3919 7.50291 20.3975L3.86353 20.4431L3.04353 16.9724C2.92866 16.4844 3.04353 15.9719 3.3597 15.5775L12.78 3.79491Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                    <path
                      id="Stroke 5"
                      d="M11.0208 6.00104L16.473 10.1882"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-primary group-hover:stroke-background"
                    />
                  </g>
                </g>
              </svg>
            </figure>
          </button>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            className="group flex items-center gap-2 rounded-full bg-background px-4 py-3 pr-5 text-white transition-colors duration-100 hover:bg-primary"
            onMouseUp={() => handleOpenPanel('broadcast')}
          >
            <figure className="relative flex h-5 w-5 items-center justify-center">
              <svg
                className="h-full w-full"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7161 16.2234H8.49609"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  d="M15.7161 12.0369H8.49609"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  d="M11.2511 7.8601H8.49609"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.9085 2.7498C15.9085 2.7498 8.23149 2.7538 8.21949 2.7538C5.45949 2.7708 3.75049 4.5868 3.75049 7.3568V16.5528C3.75049 19.3368 5.47249 21.1598 8.25649 21.1598C8.25649 21.1598 15.9325 21.1568 15.9455 21.1568C18.7055 21.1398 20.4155 19.3228 20.4155 16.5528V7.3568C20.4155 4.5728 18.6925 2.7498 15.9085 2.7498Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
              </svg>
            </figure>

            <span className="font-collage text-lg text-primary group-hover:text-background">
              Broadcast
            </span>
          </button>

          <button
            className="group flex items-center gap-2 rounded-full bg-background px-4 py-3 pr-5 text-white transition-colors duration-100 hover:bg-primary"
            onMouseUp={() => handleOpenPanel('mates')}
          >
            <figure className="relative flex h-5 w-5 items-center justify-center">
              <svg
                className="h-full w-full"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.59151 15.2069C13.2805 15.2069 16.4335 15.7659 16.4335 17.9989C16.4335 20.2319 13.3015 20.8069 9.59151 20.8069C5.90151 20.8069 2.74951 20.2529 2.74951 18.0189C2.74951 15.7849 5.88051 15.2069 9.59151 15.2069Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.59157 12.0199C7.16957 12.0199 5.20557 10.0569 5.20557 7.63492C5.20557 5.21292 7.16957 3.24992 9.59157 3.24992C12.0126 3.24992 13.9766 5.21292 13.9766 7.63492C13.9856 10.0479 12.0356 12.0109 9.62257 12.0199H9.59157Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  d="M16.4832 10.8817C18.0842 10.6567 19.3172 9.28272 19.3202 7.61972C19.3202 5.98072 18.1252 4.62072 16.5582 4.36372"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
                <path
                  d="M18.5955 14.7323C20.1465 14.9633 21.2295 15.5073 21.2295 16.6273C21.2295 17.3983 20.7195 17.8983 19.8955 18.2113"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary group-hover:stroke-background"
                />
              </svg>
            </figure>

            <span className="font-collage text-lg text-primary group-hover:text-background">
              Mates
            </span>
          </button>
        </div>
      </div>
    </main>
  )
}
