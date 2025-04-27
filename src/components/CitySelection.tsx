"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaces, Place } from "@/services/mockPlaces";
import { Button } from "@/components/ui/button";

interface CitySelectionProps {
    onPlacesUpdate: (places: Place[]) => void;
}

export const CitySelection = ({ onPlacesUpdate }: CitySelectionProps) => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

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

  const handleCityChange = (ct: string) => {
    setCity(ct);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
  };

  const handleShowPlaces = async () => {
    if (!city || !category) {
      alert('Пожалуйста, выберите город и категорию.');
      return;
    }
  
    setIsLoading(true);
    try {
      
      const response = await fetch(`/api/places?city=${city}&category=${category}`);
      console.log('Отправка запроса с city:', city, 'и category:', category);
      if (!response.ok) {
        throw new Error('Не удалось получить данные');
      }
      const places = await response.json();
      onPlacesUpdate(places); // Передаем данные в ваш компонент
    } catch (error) {
      console.error('Ошибка при получении мест:', error);
      alert('Не удалось получить места. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Выберите город и категорию:</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Label htmlFor="city">Город</Label>
        <Select onValueChange={handleCityChange}>
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
        <Select onValueChange={handleCategoryChange}>
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

        <Button onClick={handleShowPlaces} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Посмотреть Места'}
        </Button>
      </CardContent>
    </Card>
  );
};