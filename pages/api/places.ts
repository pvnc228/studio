import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlacesByCityAndCategory, Place } from '@/services/places';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city, category } = req.query;

  if (!city || !category || typeof city !== 'string' || typeof category !== 'string') {
    return res.status(400).json({ error: 'Город и категория обязательны' });
  }

  try {
    const places = await getPlacesByCityAndCategory(city.toLowerCase(), category.toLowerCase());
    res.status(200).json(places);
  } catch (error) {
    console.error('Ошибка в API /places:', error);
    res.status(500).json({ error: 'Не удалось загрузить места' });
  }
}