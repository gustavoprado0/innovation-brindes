'use client';

import { Search, Heart, ArrowUpDown } from 'lucide-react';
import type { Sorting, SortField, SortDirection } from '@/types';

interface ProductsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    sorting: Sorting;
    onSortingChange: (sorting: Sorting) => void;
    showFavoritesOnly: boolean;
    onToggleFavorites: () => void;
    totalProducts: number;
}

export default function ProductsToolbar({
    search,
    onSearchChange,
    sorting,
    onSortingChange,
    showFavoritesOnly,
    onToggleFavorites,
    totalProducts,
}: ProductsToolbarProps) {
    function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const [field, direction] = e.target.value.split('-') as [SortField, SortDirection];
        onSortingChange({ field, direction });
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 w-full sm:w-80 shadow-sm">
                <Search size={16} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou código..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">
                    {totalProducts} produto{totalProducts !== 1 ? 's' : ''}
                </span>

                <button
                    onClick={onToggleFavorites}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${showFavoritesOnly
                            ? 'bg-red-50 border-red-400 text-red-500'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500'
                        }`}
                >
                    <Heart size={14} className={showFavoritesOnly ? 'fill-red-500' : ''} />
                    Favoritos
                </button>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm">
                    <ArrowUpDown size={14} className="text-gray-400" />
                    <select
                        value={`${sorting.field}-${sorting.direction}`}
                        onChange={handleSortChange}
                        className="text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
                    >
                        <option value="name-asc">Nome A→Z</option>
                        <option value="name-desc">Nome Z→A</option>
                        <option value="price-asc">Menor preço</option>
                        <option value="price-desc">Maior preço</option>
                    </select>
                </div>
            </div>
        </div>
    );
}