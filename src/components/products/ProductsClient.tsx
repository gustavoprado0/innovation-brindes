'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useAuthStore } from '@/stores/authStore';
import { debounce } from '@/lib/utils';
import Header from '@/components/layout/Header';
import ProductsToolbar from '@/components/products/ProductsToolbar';
import ProductGrid from '@/components/products/ProductGrid';
import type { Sorting, ProductFilters } from '@/types';

const PAGE_SIZE = 20;

export default function ProductsClient() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { favorites } = useFavoritesStore();

  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedFilters, setDebouncedFilters] = useState<ProductFilters>({});
  const [sorting, setSorting] = useState<Sorting>({ field: 'name', direction: 'asc' });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [page, setPage] = useState(1);

  const { data: allProducts = [], isLoading, isError, refetch } = useProducts(debouncedFilters);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleLogout() {
      logout();
      router.push('/login');
    }
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [logout, router]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const isCode = /^\d+$/.test(value.trim());
      setDebouncedFilters(
        value.trim()
          ? isCode
            ? { code: value.trim() }
            : { name: value.trim() }
          : {}
      );
      setPage(1);
    }, 400),
    []
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    debouncedSearch(value);
  }

  if (!mounted) return null;

  const filteredProducts = showFavoritesOnly
    ? allProducts.filter((p) => favorites.includes(p.code))
    : allProducts;

  const paginatedProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedProducts.length < filteredProducts.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow animate-pulse">
                <div className="h-44 bg-gray-200 rounded-t-xl" />
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="h-8 bg-gray-200 rounded-b-xl" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-center gap-4 mt-20">
          <p className="text-gray-600 text-lg">Erro ao carregar produtos.</p>
          <button
            onClick={() => refetch()}
            className="bg-[#5cb85c] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#4cae4c] transition"
          >
            Tentar novamente
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <ProductsToolbar
          search={search}
          onSearchChange={handleSearchChange}
          sorting={sorting}
          onSortingChange={setSorting}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly((v) => !v)}
          totalProducts={filteredProducts.length}
        />

        <ProductGrid products={paginatedProducts} sorting={sorting} />

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="bg-[#5cb85c] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4cae4c] transition"
            >
              Carregar mais
            </button>
          </div>
        )}
      </main>
    </div>
  );
}