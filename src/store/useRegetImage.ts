import { create } from 'zustand'

type UserState = {
  reget: string
  setReget: (reget: string) => void
}

export const useRegetImage = create<UserState>((set) => ({
  reget: "",
  setReget: (reget) => set({ reget }),
}))