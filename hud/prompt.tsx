'use client'

import { FormEvent, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { removeBackground } from '@imgly/background-removal'
import { gsap } from 'gsap'
import { LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import BorderBeam from '@/components/border-beam'
import { usePrompt } from '@/hooks/use-prompt'
import { useStage } from '@/hooks/use-stage'
import { Stuff, useStuffs } from '@/hooks/use-stuffs'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

export default function Prompt() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const controller = useRef<AbortController | null>(null)

  const showSubmitButton = useMemo(() => value.length > 4, [value])

  const { isOpen, setIsOpen } = usePrompt()
  const { appendStuff, setSelectedStuff } = useStuffs()
  const { setStage } = useStage()

  const generate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    controller.current = new AbortController()

    try {
      setLoading(true)
      const payload = {
        model_id: 'black-forest-labs/FLUX.1-dev',
        prompt: `Create a cozy style pixel art, very low resolution of a single object that is ${value}. The artwork should be strictly 32x32 pixels in size, with a focus on warmth and comfort. Place the object in the center vertical and bottom horizontal against a solid black background. Ensure the object stands out clearly and captures a cozy aesthetic.`,
        width: 512,
        height: 512,
        loras: '{ "artificialguybr/PixelArtRedmond": 1.2}',
      }

      const res = await fetch('https://dream-gateway.livepeer.cloud/text-to-image', {
        method: 'POST',
        body: JSON.stringify(payload),
        signal: controller.current.signal,
      })

      const livepeerData = await res.json()

      const blob = await removeBackground(livepeerData.images[0].url)

      const url = URL.createObjectURL(blob)
      const newStuff: Stuff = {
        id: uuidv4(),
        position: [0, -50, 0],
        texture: url,
      }

      const { data, error } = await supabase.storage
        .from('stuffs-textures')
        .upload(newStuff.id, blob, {
          cacheControl: '3600',
          upsert: false,
        })
      if (error) {
        console.error(error)
      } else {
        const newStuff: Stuff = {
          id: uuidv4(),
          position: [0, -50, 0],
          texture: `https://izhhgacoahisfvkhrzdi.supabase.co/storage/v1/object/public/${data.fullPath}`,
        }
        appendStuff(newStuff)
        setSelectedStuff(newStuff)
        setStage('edit')

        setIsOpen(false)
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch aborted') // Handle the abort error
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(containerRef.current, {
          opacity: 1,
          y: -20,
          duration: 0.3,
          delay: 0.3,
        })

        gsap.to('#prompt-input', { opacity: 1, duration: 0.3, delay: 0.3 })
      }
      if (!isOpen) {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.3, y: 20 })
        gsap.to('#prompt-input', { opacity: 0, duration: 0.3 })
      }
    },
    { scope: containerRef, dependencies: [isOpen] },
  )

  const onClose = () => {
    if (loading) {
      controller.current?.abort() // Abort the fetch request if loading
      return
    }

    setIsOpen(false)
    setValue('')
    setSelectedStuff(null)
    setStage('idle')
  }

  return (
    <section
      ref={containerRef}
      style={{
        zIndex: isOpen ? 50 : 1,
      }}
    >
      <aside
        id="prompt-input"
        className="absolute bottom-0 left-1/2 max-h-[50vh] w-[400px] -translate-x-1/2 rounded-3xl bg-background p-4 leading-none opacity-0"
      >
        <div className="flex items-center justify-between pl-1">
          <h3 className="font-collage text-xl text-primary">What’s on your mind?</h3>
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

        <BorderBeam className={cn('opacity-0', loading && 'opacity-100')} />

        {loading && (
          <div className="ml-1 mt-2 text-sm text-primary/70">
            <span>Beautiful! One moment please...</span>
          </div>
        )}

        <form onSubmit={generate} className="relative mt-2 h-fit w-full overflow-auto rounded-xl">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex: A shinny sunflower"
            className="w-full resize-none rounded-xl border-none bg-white/70 p-3 pl-4 pr-16 text-primary outline-none placeholder:text-primary/50"
          />

          <button
            className={cn(
              'absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary/50 px-2.5 py-1.5 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary group-hover:bg-primary/70',
              !showSubmitButton && 'pointer-events-none opacity-0',
            )}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Go'}
          </button>
        </form>
      </aside>
    </section>
  )
}
