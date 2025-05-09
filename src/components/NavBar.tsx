"use client";

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