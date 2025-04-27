"use client";

import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaces, Place } from "@/services/places";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Функция для преобразования строки: первая буква заглавная, остальное без изменений
const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface CitySelectionProps {
  onPlacesUpdate: (places: Place[]) => void;
}

export const CitySelection = ({ onPlacesUpdate }: CitySelectionProps) => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const citiesResponse = await fetch('/api/cities');
        if (!citiesResponse.ok) throw new Error('Не удалось загрузить города');
        const fetchedCities = await citiesResponse.json();

        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) throw new Error('Не удалось загрузить категории');
        const fetchedCategories = await categoriesResponse.json();

        // Преобразуем города и категории для отображения с большой буквы
        setCities(fetchedCities.map((city: string) => capitalize(city)));
        setCategories(fetchedCategories.map((cat: string) => capitalize(cat)));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setCities([]);
        setCategories([]);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

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
      const response = await fetch(`/api/places?city=${city.toLowerCase()}&category=${category.toLowerCase()}`);
      console.log('Отправка запроса с city:', city, 'и category:', category);
      if (!response.ok) {
        throw new Error('Не удалось получить данные');
      }
      const places = await response.json();
      onPlacesUpdate(places);
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
        {dataLoading ? (
          <Skeleton className="h-11 w-full" />
        ) : (
          <Select onValueChange={handleCityChange}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((ct) => (
                <SelectItem key={ct} value={ct.toLowerCase()}>
                  {ct} {/* Отображаем с большой буквы */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Label htmlFor="category">Категория</Label>
        {dataLoading ? (
          <Skeleton className="h-11 w-full" />
        ) : (
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat} {/* Отображаем с большой буквы */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button onClick={handleShowPlaces} disabled={isLoading || dataLoading}>
          {isLoading ? 'Загрузка...' : 'Посмотреть Места'}
        </Button>
      </CardContent>
    </Card>
  );
};