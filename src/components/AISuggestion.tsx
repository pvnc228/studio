
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
import { Loader2 } from 'lucide-react'; // Import loader icon

interface AISuggestionProps {
  onPlacesUpdate: (places: Place[]) => void;
}

export const AISuggestion: React.FC<AISuggestionProps> = ({ onPlacesUpdate }) => {
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

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
    setError(null); // Reset error
    if (!city || !description || !category) {
      setError('Пожалуйста, выберите город, введите описание и выберите категорию.');
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const places = await suggestPlaceFromDescription({ city: city.toLowerCase(), description, category: category.toLowerCase() });
      onPlacesUpdate(places); // Notify the parent component about the new places
    } catch (error) {
      console.error("Ошибка при предложении мест:", error);
      setError('Не удалось получить предложения мест. Пожалуйста, попробуйте еще раз.');
      onPlacesUpdate([]); // Clear places on error
    } finally {
      setIsLoading(false); // Stop loading
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
          size="lg" // Use large button size
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
