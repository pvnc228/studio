'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Place = {
  id: number;
  name: string;
  category: string;
  cityId: number;
  description: string;
  imageUrl: string;
  dateFounded: string | null;
  averagePrice: string | null;
  rating: number | null;
  mapsUrl: string | null; // Заменяем googleMapsUrl на mapsUrl
};

export async function getPlaces(city: string, category: string): Promise<Place[]> {
  try {
    const places = await prisma.place.findMany({
      where: {
        city: {
          name: {
            equals: city,
            mode: 'insensitive',
          },
        },
        category: {
          name: {
            equals: category,
            mode: 'insensitive',
          },
        },
      },
      include: {
        city: true,
        category: true,
      },
    });

    return places.map((place) => ({
      id: place.id,
      name: place.name,
      category: place.category.name,
      cityId: place.cityId,
      description: place.description,
      imageUrl: place.imageUrl,
      dateFounded: place.dateFounded,
      averagePrice: place.averagePrice,
      rating: place.rating,
      mapsUrl: place.mapsUrl, // Заменяем googleMapsUrl на mapsUrl
    }));
  } catch (error) {
    console.error('Ошибка при получении мест из базы данных:', error);
    throw new Error('Не удалось загрузить места из базы данных');
  } finally {
    await prisma.$disconnect();
  }
}