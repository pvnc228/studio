import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email и пароль обязательны' }, { status: 400 });
  }

  try {
    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Пользователь с таким email уже существует' }, { status: 400 });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        searchHistory: JSON.stringify([]),
      },
    });

    return NextResponse.json({ message: 'Пользователь успешно зарегистрирован', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json({ message: 'Ошибка сервера при регистрации' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}