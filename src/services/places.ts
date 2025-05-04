'use server';

import { prisma } from '@/lib/prisma';

export type Place = {
  id: number;
  name: string;
  category: string;
  city: string;
  cityId: number;
  description: string;
  extendedDescription: string;
  imageUrl: string;
  dateFounded: string | null;
  averagePrice: string | null;
  rating: number | null;
  mapsUrl: string | null;
};

function mapPlace(place: any): Place {
  return {
    id: place.id,
    name: place.name,
    category: place.category?.name || 'Без категории',
    city: place.city?.name || 'Неизвестный город',
    cityId: place.cityId,
    description: place.description,
    extendedDescription: place.extendedDescription,
    imageUrl: place.imageUrl,
    dateFounded: place.dateFounded,
    averagePrice: place.averagePrice,
    rating: place.rating,
    mapsUrl: place.mapsUrl,
  };
}

// Остальные функции остаются без изменений
export async function getPlacesByCityAndCategory(city: string, category: string): Promise<Place[]> {
  try {
    const places = await prisma.place.findMany({
      where: {
        city: { name: { equals: city, mode: 'insensitive' } },
        category: { name: { equals: category, mode: 'insensitive' } },
      },
      include: { category: true, city: true },
    });
    return places.map(mapPlace);
  } catch (error) {
    console.error('Error fetching places:', error);
    throw new Error('Failed to fetch places');
  }
}

export async function getPlacesByCity(city: string): Promise<Place[]> {
  try {
    const places = await prisma.place.findMany({
      where: { city: { name: { equals: city, mode: 'insensitive' } } },
      include: { category: true, city: true },
    });
    return places.map(mapPlace);
  } catch (error) {
    console.error('Error fetching places:', error);
    throw new Error('Failed to fetch places');
  }
}

export async function getPlaceById(id: number): Promise<Place> {
  try {
    const place = await prisma.place.findUnique({
      where: { id },
      include: { category: true, city: true },
    });
    if (!place) throw new Error('Place not found');
    return mapPlace(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    throw new Error('Failed to fetch place');
  }
}