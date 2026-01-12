import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import supabase from '@/lib/supabase'

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
        user: null,

        setUser: (user: User) => set({user: user}),
        resetAuth: async () => {
          await supabase.auth.signOut()
          // 이게 왜 그런지 모르겠는데...필요없어보이는 이 코드가 없으면 로그아웃 후 화면 갱신이 안된다...
          set({user: null})
          localStorage.removeItem("AuthStore")
        },
      }
    ), {name: "AuthStore"}
  )
);