import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Включаем режим standalone для поддержки SSR и API маршрутов на Firebase
  output: 'standalone',

  // Игнорировать ошибки TypeScript при сборке
  typescript: {
    ignoreBuildErrors: true,
  },

  // Игнорировать ошибки ESLint при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Настройка для загрузки удалённых изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Переменные окружения для клиента
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },


};

export default nextConfig;