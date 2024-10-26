import { create } from 'zustand'

interface PromptState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const usePrompt = create<PromptState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
