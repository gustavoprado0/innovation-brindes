import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  keepLoggedIn: boolean;
  setAuth: (token: string, user: User, keepLoggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      keepLoggedIn: false,

      setAuth: (token, user, keepLoggedIn) =>
        set({ token, user, keepLoggedIn }),

      logout: () =>
        set({ token: null, user: null, keepLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) =>
        state.keepLoggedIn
          ? { token: state.token, user: state.user, keepLoggedIn: state.keepLoggedIn }
          : { keepLoggedIn: false },
    }
  )
);