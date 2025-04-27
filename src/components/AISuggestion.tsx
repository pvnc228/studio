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
import { getCities, getCategories } from "@/constants/data"; // Импортируем функции

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
            <Select onValueChange={setCity} value={city}>
              <SelectTrigger id="ai-city" className="h-11 text-base">
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((ct) => (
                  <SelectItem key={ct} value={ct.toLowerCase()} className="text-base">
                    {ct}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="ai-category" className="mb-2 block font-medium text-foreground">Категория</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger id="ai-category" className="h-11 text-base">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()} className="text-base">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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