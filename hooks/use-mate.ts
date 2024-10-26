import { create } from 'zustand'

interface MateState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useMate = create<MateState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
