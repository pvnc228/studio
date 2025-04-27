import type { NextApiRequest, NextApiResponse } from 'next';
import { getCities } from '@/constants/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cities = await getCities();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Ошибка в API /cities:', error);
    res.status(500).json({ error: 'Не удалось загрузить города' });
  }
}