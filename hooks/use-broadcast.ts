import { create } from 'zustand'

interface BroadcastState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useBroadcast = create<BroadcastState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
