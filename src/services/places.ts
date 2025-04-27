import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Тип Place, соответствующий структуре таблицы в базе данных
export type Place = {
  id: number;
  name: string;
  categoryId: number;
  cityId: number;
  description: string;
  imageUrl: string;
  dateFounded: string | null;
  averagePrice: string | null;
  rating: number | null;
  googleMapsUrl: string | null;
};

// Функция для получения мест из базы данных
export async function getPlaces(city: string, category: string): Promise<Place[]> {
  try {
    // Получаем все места из базы данных
    const places = await prisma.place.findMany({
      where: {
        // Фильтрация по городу (через связь с таблицей City)
        city: {
          name: {
            equals: city,
            mode: 'insensitive', // Игнорируем регистр
          },
        },
        // Фильтрация по категории (через связь с таблицей Category)
        category: {
          name: {
            equals: category,
            mode: 'insensitive', // Игнорируем регистр
          },
        },
      },
      include: {
        city: true, // Включаем данные о городе
        category: true, // Включаем данные о категории
      },
    });

    // Приводим данные к типу Place
    return places.map((place) => ({
      id: place.id,
      name: place.name,
      categoryId: place.categoryId,
      cityId: place.cityId,
      description: place.description,
      imageUrl: place.imageUrl,
      dateFounded: place.dateFounded,
      averagePrice: place.averagePrice,
      rating: place.rating,
      googleMapsUrl: place.googleMapsUrl,
    }));
  } catch (error) {
    console.error('Ошибка при получении мест из базы данных:', error);
    throw new Error('Не удалось загрузить места из базы данных');
  } finally {
    await prisma.$disconnect();
  }
}