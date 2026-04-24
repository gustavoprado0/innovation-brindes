'use client';

import { useAuthStore } from '@/stores/authStore';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <header className="w-full bg-[#5cb85c] px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-[#5cb85c] text-lg">
          i
        </div>
        <div className="text-white leading-tight">
          <span className="font-bold text-lg">Innovation</span>
          <br />
          <span className="text-xs tracking-widest uppercase">brindes</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-white text-sm font-medium hidden sm:block">
            {user.name}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-2 rounded-full transition"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Sair</span>
        </button>
      </div>
    </header>
  );
}