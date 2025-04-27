import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Функции для получения городов и категорий из базы данных
export async function getCities(): Promise<string[]> {
  try {
    const cities = await prisma.city.findMany();
    return cities.map(city => city.name);
  } catch (error) {
    console.error('Ошибка при получении городов:', error);
    return [
      'Москва',
      'Санкт-Петербург',
      'Суздаль',
      'Владимир',
      'Ярославль',
      'Кострома',
      'Ростов Великий',
      'Сергиев Посад',
    ]; // Фallback на статические данные в случае ошибки
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const categories = await prisma.category.findMany();
    return categories.map(category => category.name);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    return [
      'Ресторан',
      'Кафе',
      'Бар',
      'Кинотеатр',
      'Театр',
      'Отель',
      'Парк',
    ]; // Fallback на статические данные в случае ошибки
  } finally {
    await prisma.$disconnect();
  }
}