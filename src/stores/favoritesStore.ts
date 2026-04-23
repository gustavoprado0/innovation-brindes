import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: string[];
    toggleFavorite: (code: string) => void;
    isFavorite: (code: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],

            toggleFavorite: (code) =>
                set((state) => ({
                    favorites: state.favorites.includes(code)
                        ? state.favorites.filter((c) => c !== code)
                        : [...state.favorites, code],
                })),

            isFavorite: (code) => get().favorites.includes(code),
        }),
        {
            name: 'favorites-storage',
        }
    )
);