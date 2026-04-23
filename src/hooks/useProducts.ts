import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { fetchProductsApi, fetchProductsWithFiltersApi } from '@/lib/api';
import { mapProducts } from '@/lib/mappers';
import type { ProductFilters } from '@/types';

export function useProducts(filters?: ProductFilters) {
    const token = useAuthStore((state) => state.token);

    const hasFilters = !!(filters?.name || filters?.code);

    return useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            if (!token) throw new Error('No token');

            if (hasFilters) {
                const data = await fetchProductsWithFiltersApi(token, {
                    nome_produto: filters?.name ?? '',
                    codigo_produto: filters?.code ?? '',
                });
                return mapProducts(data);
            }

            const data = await fetchProductsApi(token);
            return mapProducts(data);
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
    });
}