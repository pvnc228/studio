"use client";

import { Place } from "@/services/places";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaceListProps {
  places: Place[];
}

export const PlaceList = ({ places }: PlaceListProps) => {
  if (!places || places.length === 0) {
    return <p className="text-muted-foreground">Места не найдены.</p>;
  }

  return (
    <div className="grid gap-4">
      {places.map((place) => (
        <Card key={place.id} className="w-full">
          <CardHeader>
            <CardTitle>{place.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <img src={place.imageUrl} alt={place.name} className="w-full h-48 object-cover rounded-md" />
            <p><strong>Описание:</strong> {place.description}</p>
            <p><strong>Средняя цена:</strong> {place.averagePrice || 'Не указано'}</p>
            <p><strong>Рейтинг:</strong> {place.rating ? place.rating.toFixed(1) : 'Нет рейтинга'}</p>
            {place.googleMapsUrl && (
              <Button asChild>
                <a href={place.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Посмотреть на карте
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};