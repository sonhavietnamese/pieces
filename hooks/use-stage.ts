import { create } from 'zustand'

export type Stage = 'edit' | 'prompt' | 'idle' | 'mate' | 'broadcast'

interface StageState {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const useStage = create<StageState>((set) => ({
  stage: 'idle',
  setStage: (stage) => set({ stage }),
}))
