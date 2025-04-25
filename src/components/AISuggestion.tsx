"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { suggestPlaceFromDescription } from "@/ai/flows/suggest-place-from-description";
import { Place } from "@/services/places";

interface AISuggestionProps {
  onPlacesUpdate: (places: Place[]) => void;
}

export const AISuggestion: React.FC<AISuggestionProps> = ({ onPlacesUpdate }) => {
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [suggestedPlaces, setSuggestedPlaces] = useState<Place[]>([]);

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

  const categories = [
    'Ресторан',
    'Кафе',
    'Бар',
    'Кинотеатр',
    'Театр',
    'Отель',
    'Парк',
  ];

  const handleSuggestion = async () => {
    if (!city || !description || !category) {
      alert('Пожалуйста, выберите город, введите описание и выберите категорию.');
      return;
    }

    try {
      const places = await suggestPlaceFromDescription({ city: city.toLowerCase(), description, category: category.toLowerCase() });
      setSuggestedPlaces(places);
      onPlacesUpdate(places); // Notify the parent component about the new places
    } catch (error) {
      console.error("Ошибка при предложении мест:", error);
      alert('Не удалось получить предложения мест. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">AI Подбор Мест</h2>

        <Label htmlFor="city">Город</Label>
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

        <Label htmlFor="category">Категория</Label>
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

        <Label htmlFor="description">Описание</Label>
        <Input
          id="description"
          placeholder="Опишите место, которое вы ищете"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleSuggestion}>Предложить Места</Button>

        {suggestedPlaces.length > 0 && (
          <div className="mt-4">
            <h3>Предложенные Места:</h3>
            <ul>
              {suggestedPlaces.map((place) => (
                <li key={place.name}>
                  {place.name} ({place.category}) - {place.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
