// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Предотвращаем множественные экземпляры клиента в dev
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'], // Можно убрать 'query' в проде
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
