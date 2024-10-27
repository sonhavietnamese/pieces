import { create } from 'zustand'

export interface Stuff {
  id: string
  position: [number, number, number]
  texture: string
}

interface StuffsState {
  stuffs: Stuff[]
  setStuffs: (stuffs: Stuff[]) => void
  appendStuff: (stuff: Stuff) => void
  removeStuff: (stuff: Stuff) => void
  updateStuff: (stuff: Stuff) => void

  selectedStuff: Stuff | null
  setSelectedStuff: (stuff: Stuff | null) => void

  newStuff: Stuff | null
  setNewStuff: (stuff: Stuff | null) => void
}

export const useStuffs = create<StuffsState>((set) => ({
  stuffs: [],
  setStuffs: (stuffs) => set({ stuffs }),
  appendStuff: (stuff) => set((state) => ({ stuffs: [...state.stuffs, stuff] })),
  removeStuff: (stuff) => set((state) => ({ stuffs: state.stuffs.filter((s) => s !== stuff) })),
  updateStuff: (stuff) =>
    set((state) => ({ stuffs: state.stuffs.map((s) => (s.id === stuff.id ? stuff : s)) })),

  selectedStuff: null,
  setSelectedStuff: (stuff) => set({ selectedStuff: stuff }),

  newStuff: null,
  setNewStuff: (stuff) => set({ newStuff: stuff }),
}))
