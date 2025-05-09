//api/favorites/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserId } from '@/lib/auth'

export async function GET(req: Request) {
  let userId: number
  try {
    userId = await getUserId(req as any)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 })
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      place: {
        include: {
          city: true,
          category: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  const places = favorites.map(fav => ({
    ...fav.place,
    city: fav.place.city,
    category: fav.place.category
  }));
  return NextResponse.json(places); 
}

export async function POST(req: Request) {
  let userId: number;
  try {
    userId = await getUserId(req as any);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }

  try {
    const body = await req.json();
    const placeId = parseInt(body.placeId, 10); 
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, placeId },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: "Это место уже добавлено в избранное" },
        { status: 409 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: { userId, placeId },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") { 
      return NextResponse.json(
        { message: "Уникальное ограничение нарушено" },
        { status: 409 }
      );
    }
    console.error("Ошибка создания избранного:", err);
    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    );
  }
}