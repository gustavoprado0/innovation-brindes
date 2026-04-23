import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryProvider from '@/components/layout/QueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Innovation Brindes',
  description: 'Plataforma de produtos Innovation Brindes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}