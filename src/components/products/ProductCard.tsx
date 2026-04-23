'use client';

import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onConfirm: (product: Product) => void;
}

export default function ProductCard({ product, onConfirm }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.code);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition flex flex-col overflow-hidden border border-gray-100">

      <div className="flex items-center justify-between px-3 pt-2">
        <span className="text-[#5cb85c] text-xs font-bold tracking-wide">
          EXCLUSIVO!
        </span>
        <button
          onClick={() => toggleFavorite(product.code)}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="p-1 rounded-full bg-white hover:bg-gray-100 transition"
        >
          <Heart
            size={18}
            className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      <div className="bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-44 object-contain p-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/300x200?text=Sem+Imagem';
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1">
        <h3 className="font-bold text-sm text-gray-800 leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">{product.code}</p>
        <p className="text-sm font-semibold text-gray-700 mt-1">
          a partir de{' '}
          <span className="text-[#5cb85c] font-bold">
            {formatCurrency(product.price)}
          </span>
        </p>
      </div>

      <button
        onClick={() => onConfirm(product)}
        className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white text-sm font-bold py-2 tracking-widest transition"
      >
        CONFIRA
      </button>
    </div>
  );
}