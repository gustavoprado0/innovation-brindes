'use client';

import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { loginApi } from '@/lib/api';
import { mapUser } from '@/lib/mappers';
import { useAuthStore } from '@/stores/authStore';
import { loginSchema } from '@/lib/validations';
import type { LoginFormData } from '@/lib/validations';

export default function LoginForm() {
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginApi({ email, senha: password });

      if (response.status === 0) {
        setError(response.message || 'Usuário ou senha inválidos.');
        return;
      }

      const user = mapUser(response);
      setAuth(response.token_de_acesso, user, keepLoggedIn);

      await new Promise((resolve) => setTimeout(resolve, 100));
      window.location.href = '/products';
    } catch {
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#5cb85c] p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <div className={`flex items-center gap-3 rounded-full bg-white px-4 py-3 ${fieldErrors.email ? 'ring-2 ring-red-400' : ''}`}>
            <User className="text-gray-400" size={20} />
            <input
              id="email"
              type="text"
              placeholder="Usuário"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
              className="flex-1 bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
          {fieldErrors.email && (
            <p className="text-xs text-red-600 font-medium px-4">{fieldErrors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className={`flex items-center gap-3 rounded-full bg-white px-4 py-3 ${fieldErrors.password ? 'ring-2 ring-red-400' : ''}`}>
            <Lock className="text-gray-400" size={20} />
            <input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
              className="flex-1 bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
          {fieldErrors.password && (
            <p className="text-xs text-red-600 font-medium px-4">{fieldErrors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between px-1 text-sm text-white">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="h-4 w-4 accent-white cursor-pointer"
            />
            Manter logado
          </label>
          <a href="#" className="hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        {error && (
          <p className="rounded-lg bg-red-100 px-4 py-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded-full bg-white py-3 font-semibold text-gray-700 shadow transition hover:bg-gray-100 disabled:opacity-60"
        >
          {isLoading ? 'Entrando...' : 'Login'}
        </button>
      </form>
    </div>
  );
}