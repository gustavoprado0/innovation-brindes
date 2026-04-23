'use client';

import { useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const { isFavorite, toggleFavorite } = useFavoritesStore();

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [product]);

    if (!product) return null;

    const favorite = isFavorite(product.code);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes de ${product.name}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
                <div className="bg-[#5cb85c] px-6 py-4 flex items-center justify-between">
                    <h2 className="text-white font-bold text-lg">{product.name}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Fechar modal"
                        className="text-white hover:bg-white/20 rounded-full p-1 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-52 object-contain bg-gray-50 rounded-xl"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/300x200?text=Sem+Imagem';
                        }}
                    />

                    <div className="flex flex-col gap-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Código</span>
                            <span className="font-semibold">{product.code}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Referência</span>
                            <span className="font-semibold">{product.reference}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Preço</span>
                            <span className="font-bold text-[#5cb85c] text-base">
                                {formatCurrency(product.price)}
                            </span>
                        </div>
                        {product.description && (
                            <div className="flex flex-col gap-1 mt-1">
                                <span className="text-gray-500">Descrição</span>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={() => toggleFavorite(product.code)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition ${favorite
                                    ? 'border-red-400 text-red-500 bg-red-50'
                                    : 'border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500'
                                }`}
                        >
                            <Heart size={16} className={favorite ? 'fill-red-500' : ''} />
                            {favorite ? 'Favoritado' : 'Favoritar'}
                        </button>

                        <button
                            onClick={onClose}
                            className="flex-1 bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-bold py-2 rounded-full transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}