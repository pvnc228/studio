// services/places.ts
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Place = {
  id: number;
  name: string;
  category: string;
  cityId: number;
  description: string;
  extendedDescription: string; // Добавлено
  imageUrl: string;
  dateFounded: string | null;
  averagePrice: string | null;
  rating: number | null;
  mapsUrl: string | null;
};


// Для обычного поиска (с категорией)
export async function getPlacesByCityAndCategory(city: string, category: string): Promise<Place[]> {
  try {
    const places = await prisma.place.findMany({
      where: {
        city: { name: { equals: city, mode: 'insensitive' } },
        category: { name: { equals: category, mode: 'insensitive' } },
      },
      include: { category: true, city: true },
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
      mapsUrl: place.mapsUrl,
    }));
  } catch (error) {
    console.error('Ошибка при получении мест:', error);
    throw new Error('Не удалось загрузить места');
  } finally {
    await prisma.$disconnect();
  }
}

// Для AI подбора (без категории)
export async function getPlacesByCity(city: string): Promise<Place[]> {
  const places = await prisma.place.findMany({
    where: {
      city: {
        name: { equals: city, mode: 'insensitive' },
      },
    },
    include: { category: true, city: true },
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
    mapsUrl: place.mapsUrl,
  }));
}
export async function getPlaceById(id: number): Promise<Place> {
  const place = await prisma.place.findUnique({
    where: { id },
    include: { category: true, city: true }, // extendedDescription включен в модель
  });

  if (!place) throw new Error("Место не найдено");

  return {
    id: place.id,
    name: place.name,
    category: place.category.name,
    cityId: place.cityId,
    description: place.description,
    extendedDescription: place.extendedDescription, // Добавлено
    imageUrl: place.imageUrl,
    dateFounded: place.dateFounded,
    averagePrice: place.averagePrice,
    rating: place.rating,
    mapsUrl: place.mapsUrl,
  };
}