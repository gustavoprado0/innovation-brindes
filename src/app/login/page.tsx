import LoginForm from '@/components/layout/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Innovation Brindes',
  description: 'Acesse sua conta Innovation Brindes',
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-3xl font-bold text-white drop-shadow-lg">
          Bem-vindo a Innovation Brindes
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}