'use server'; 

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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
    ]; 
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
    ]; 
  } finally {
    await prisma.$disconnect();
  }
}