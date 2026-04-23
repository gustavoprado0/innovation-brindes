import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/auth-token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
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
      token: getTokenFromCookie(),
      user: null,
      keepLoggedIn: false,

      setAuth: (token, user, keepLoggedIn) => {
        const days = keepLoggedIn ? 7 : 1;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `auth-token=${token}; path=/; expires=${date.toUTCString()}`;
        set({ token, user, keepLoggedIn });
      },

      logout: () => {
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        set({ token: null, user: null, keepLoggedIn: false });
      },
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