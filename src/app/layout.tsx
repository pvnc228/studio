import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { UserProfileProvider } from '@/context/UserProfileContext';
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from '@/components/NavBar'; // Импортируем NavBar

// Настройка шрифтов
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RouteWise',
  description: 'Your personalized travel route planner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProfileProvider>
          <NavBar /> {/* Используем NavBar */}
          <main className="container mx-auto p-4">{children}</main>
          <Toaster />
        </UserProfileProvider>
      </body>
    </html>
  );
}