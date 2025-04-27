import type { NextApiRequest, NextApiResponse } from 'next';
import { getCategories } from '@/constants/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Ошибка в API /categories:', error);
    res.status(500).json({ error: 'Не удалось загрузить категории' });
  }
}