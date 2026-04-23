import ProductsClient from '@/components/products/ProductsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produtos | Innovation Brindes',
  description: 'Catálogo de produtos Innovation Brindes',
};

export default function ProductsPage() {
  return <ProductsClient />;
}