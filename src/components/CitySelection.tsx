"use client";

import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaces, Place } from "@/services/places";
import { Button } from "@/components/ui/button";
import { getCities, getCategories } from "@/constants/data"; // Импортируем функции
import { Skeleton } from "@/components/ui/skeleton";

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

  // Загружаем города и категории при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCities = await getCities();
      const fetchedCategories = await getCategories();
      setCities(fetchedCities);
      setCategories(fetchedCategories);
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
      const response = await fetch(`/api/places?city=${city}&category=${category}`);
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
                  {ct}
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
                  {cat}
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