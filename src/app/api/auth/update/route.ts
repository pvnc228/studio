//auth/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function PUT(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ message: 'Токен не предоставлен' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    const { firstName, lastName, phone, email, birthDate } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        firstName,
        lastName,
        phone,
        email,
        birthDate,
      },
    });
  
    const formattedUser = {
      ...updatedUser,
      searchHistory: updatedUser.searchHistory ? JSON.parse(updatedUser.searchHistory) : [],
    };

    return NextResponse.json({ message: 'Профиль обновлён', user: formattedUser  }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    return NextResponse.json({ message: 'Ошибка сервера при обновлении профиля' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}