"use client"; // Добавляем директиву "use client", так как используем хуки

import Link from 'next/link';
import { useUserProfile } from '@/context/UserProfileContext';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const { userProfile, logout } = useUserProfile();
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          RouteWise
        </Link>
        <div className="space-x-4">
          {userProfile ? (
            <>
              <Link href="/profile" className={pathname === '/profile' ? 'underline' : ''}>
                Профиль
              </Link>
              <button onClick={logout} className="hover:underline">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={pathname === '/login' ? 'underline' : ''}>
                Вход
              </Link>
              <Link href="/register" className={pathname === '/register' ? 'underline' : ''}>
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}