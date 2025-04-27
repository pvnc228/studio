import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city, category } = req.query;

  // Проверяем, что параметры переданы
  if (!city || !category) {
    return res.status(400).json({ error: 'City and category are required' });
  }

  try {
    // Выполняем запрос к базе данных через Prisma
    const places = await prisma.place.findMany({
      where: {
        city: {
          name: city.toString().toLowerCase(),
        },
        category: {
          name: category.toString().toLowerCase(),
        },
      },
      include: {
        category: true,
      },
    });

    // Форматируем данные для фронтенда
    const formattedPlaces = places.map(place => ({
      name: place.name,
      category: place.category.name,
      location: { lat: place.lat, lng: place.lng },
      description: place.description,
      imageUrl: place.imageUrl,
      dateFounded: place.dateFounded,
      averagePrice: place.averagePrice,
      rating: place.rating,
      googleMapsUrl: place.googleMapsUrl,
    }));

    // Отправляем успешный ответ
    res.status(200).json(formattedPlaces);
  } catch (error) {
    console.error('Ошибка при получении мест:', error);
    res.status(500).json({ error: 'Не удалось получить места' });
  }
}