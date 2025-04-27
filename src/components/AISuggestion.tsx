"use client";

import { useState, useEffect } from 'react';
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
import { Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

// Функция для преобразования строки: первая буква заглавная, остальное без изменений
const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface AISuggestionProps {
  onPlacesUpdate: (places: Place[]) => void;
}

export const AISuggestion: React.FC<AISuggestionProps> = ({ onPlacesUpdate }) => {
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleSuggestion = async () => {
    setError(null);
    if (!city || !description || !category) {
      setError('Пожалуйста, выберите город, введите описание и выберите категорию.');
      return;
    }

    setIsLoading(true);
    try {
      const places = await suggestPlaceFromDescription({ city: city.toLowerCase(), description, category: category.toLowerCase() });
      onPlacesUpdate(places);
    } catch (error) {
      console.error("Ошибка при предложении мест:", error);
      setError('Не удалось получить предложения мест. Пожалуйста, попробуйте еще раз.');
      onPlacesUpdate([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border border-border bg-card shadow-md rounded-lg">
      <CardContent className="p-5 grid gap-2">
        <h2 className="text-xl font-semibold text-foreground">AI Подбор Мест</h2>
        <p className="text-muted-foreground text-sm">
          Опишите желаемое место, и наш AI подберет лучшие варианты для вас.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ai-city" className="mb-2 block font-medium text-foreground">Город</Label>
            {dataLoading ? (
              <Skeleton className="h-11 w-full" />
            ) : (
              <Select onValueChange={setCity} value={city}>
                <SelectTrigger id="ai-city" className="h-11 text-base">
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((ct) => (
                    <SelectItem key={ct} value={ct.toLowerCase()} className="text-base">
                      {ct} {/* Отображаем с большой буквы */}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <Label htmlFor="ai-category" className="mb-2 block font-medium text-foreground">Категория</Label>
            {dataLoading ? (
              <Skeleton className="h-11 w-full" />
            ) : (
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger id="ai-category" className="h-11 text-base">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()} className="text-base">
                      {cat} {/* Отображаем с большой буквы */}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="ai-description" className="mb-2 block font-medium text-foreground">Описание</Label>
          <Input
            id="ai-description"
            placeholder="Например: Уютное кафе с видом на реку и веганскими опциями"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-11 text-base"
          />
        </div>

        {error && <p className="text-sm text-destructive font-medium">{error}</p>}

        <Button
          onClick={handleSuggestion}
          disabled={isLoading}
          size="lg"
          className="w-full flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:scale-[1.02]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Подбираем...
            </>
          ) : (
            'Предложить Места'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};