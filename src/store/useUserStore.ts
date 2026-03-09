import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'
import { USERS } from '../constants/users'

type UserStore = {
  currentUser: User | null
  login: (userId: User['id']) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      login: (userId) => {
        const user = USERS.find((u) => u.id === userId)
        if (user) set({ currentUser: user })
      },
      logout: () => set({ currentUser: null }),
    }),
    { name: 'panii-li-user' }
  )
)
