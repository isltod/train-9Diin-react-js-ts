import {create} from 'zustand/react'

interface AuthStore {
  id: string;
  email: string;
  role: string;

  setId: (id: string) => void;
  setEmail: (email: string) => void;
  setRole: (email: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  id: "",
  email: "",
  role: "",

  setId: (value) => set({ id: value }),
  setEmail: (value) => set({ email: value }),
  setRole: (value) => set({ role: value }),
  resetAuth: () => set({ id: "", email: "", role: "" }),
}));