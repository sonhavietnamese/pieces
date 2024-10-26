import { create } from 'zustand'

interface Stuff {
  id: string
  position: [number, number, number]
}

interface StuffsState {
  stuffs: Stuff[]
  setStuffs: (stuffs: Stuff[]) => void
  appendStuff: (stuff: Stuff) => void
  removeStuff: (stuff: Stuff) => void
}

export const useStuffs = create<StuffsState>((set) => ({
  stuffs: [],
  setStuffs: (stuffs) => set({ stuffs }),
  appendStuff: (stuff) => set((state) => ({ stuffs: [...state.stuffs, stuff] })),
  removeStuff: (stuff) => set((state) => ({ stuffs: state.stuffs.filter((s) => s !== stuff) })),
}))
