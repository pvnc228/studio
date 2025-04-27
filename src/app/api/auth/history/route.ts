import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Place } from '@/services/places';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ message: 'Токен не предоставлен' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    const place: Place = await req.json();
    let searchHistory: Place[] = user.searchHistory ? JSON.parse(user.searchHistory as string) : [];
    const exists = searchHistory.some((item: Place) => item.id === place.id);
    if (!exists) {
      searchHistory = [place, ...searchHistory].slice(0, 20);
    }

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { searchHistory: JSON.stringify(searchHistory) },
    });

    return NextResponse.json({ message: 'История обновлена' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при добавлении в историю:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ message: 'Токен не предоставлен' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { searchHistory: JSON.stringify([]) },
    });

    return NextResponse.json({ message: 'История очищена' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при очистке истории:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}