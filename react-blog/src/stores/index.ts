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
  setUser: (user: User | null) => void;
  // 이게 비동기 방식 void 함수 형식이라고...
  resetAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
        user: null,
        setUser: (user: User | null) => set({user: user}),

        resetAuth: async () => {
          await supabase.auth.signOut()
          // 이게 왜 그런지 모르겠는데...필요없어보이는 이 코드가 없으면 로그아웃 후 화면 갱신이 안된다...
          set({user: null})
          localStorage.removeItem("AuthStore")
        },
      }
    //   아래 partialize는 AuthStore 키로 state 안에 있는 여러 값들 중 user만 담겠다는 얘기라고...
    ), {name: "AuthStore", partialize: state => ({user: state.user})}
  )
);