import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/types';

vi.mock('@/stores/favoritesStore', () => ({
    useFavoritesStore: () => ({
        isFavorite: () => false,
        toggleFavorite: vi.fn(),
    }),
}));

const mockProduct: Product = {
    code: '1234',
    name: 'Copo Plástico 700ml',
    reference: '10151371234',
    categoryCode: '1015137',
    imageUrl: 'https://example.com/image.jpg',
    price: 4.60,
    description: 'Copo plástico 700ml',
};

describe('ProductCard', () => {
    it('renders product name and code', () => {
        render(<ProductCard product={mockProduct} onConfirm={vi.fn()} />);
        expect(screen.getByText('Copo Plástico 700ml')).toBeInTheDocument();
        expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('renders EXCLUSIVO badge', () => {
        render(<ProductCard product={mockProduct} onConfirm={vi.fn()} />);
        expect(screen.getByText('EXCLUSIVO!')).toBeInTheDocument();
    });

    it('renders formatted price', () => {
        render(<ProductCard product={mockProduct} onConfirm={vi.fn()} />);
        expect(screen.getByText('R$ 4,60')).toBeInTheDocument();
    });

    it('calls onConfirm when CONFIRA button is clicked', () => {
        const onConfirm = vi.fn();
        render(<ProductCard product={mockProduct} onConfirm={onConfirm} />);
        fireEvent.click(screen.getByText('CONFIRA'));
        expect(onConfirm).toHaveBeenCalledWith(mockProduct);
    });
});