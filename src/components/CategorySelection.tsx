"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export const CategorySelection = () => {
  const [category, setCategory] = useState('');

  const categories = [
    'Ресторан',
    'Кафе',
    'Бар',
    'Кинотеатр',
    'Театр',
    'Отель',
    'Парк',
  ];

  return (
    <Card className="w-full">
      <CardContent>
        <Label htmlFor="category">Выберите Категорию</Label>
        <Select onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase()}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {category && <p className="mt-2">Выбранная категория: {category}</p>}
      </CardContent>
    </Card>
  );
};