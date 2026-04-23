'use client';

import { useState } from 'react';
import type { Product, Sorting } from '@/types';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

interface ProductGridProps {
  products: Product[];
  sorting: Sorting;
}

export default function ProductGrid({ products, sorting }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sorted = [...products].sort((a, b) => {
    if (sorting.field === 'price') {
      return sorting.direction === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    }
    return sorting.direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg font-medium">Nenhum produto encontrado</p>
        <p className="text-sm mt-1">Tente buscar por outro nome ou código</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sorted.map((product) => (
          <ProductCard
            key={product.code}
            product={product}
            onConfirm={setSelectedProduct}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}