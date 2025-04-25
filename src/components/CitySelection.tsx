"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export const CitySelection = () => {
  const [city, setCity] = useState('');

  const cities = [
    'Москва',
    'Санкт-Петербург',
    'Суздаль',
    'Владимир',
    'Ярославль',
    'Кострома',
    'Ростов Великий',
    'Сергиев Посад'
  ];

  return (
    <Card className="w-full">
      <CardContent>
        <Label htmlFor="city">Выберите Город</Label>
        <Select onValueChange={setCity}>
          <SelectTrigger id="city">
            <SelectValue placeholder="Выберите город" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((ct) => (
              <SelectItem key={ct} value={ct.toLowerCase()}>
                {ct}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {city && <p className="mt-2">Выбранный город: {city}</p>}
      </CardContent>
    </Card>
  );
};
