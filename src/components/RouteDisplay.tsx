"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState, useEffect } from 'react';
import { Place } from "@/services/places";

interface RouteDisplayProps {
  places: Place[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"}>
      ★
    </span>
  ));

  return <>{stars}</>;
};


export const RouteDisplay: React.FC<RouteDisplayProps> = ({ places }) => {
  const [apiKey] = useState<string>(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API key not found in environment variables.");
    }
  }, [apiKey]);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 55.7558, // Default to Moscow
    lng: 37.6173,
  };

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place);
  };

    const handleShowMap = () => {
        setShowMap(true);
    };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">Отображение Маршрута</h2>

        <div>
          <h3>Выбранные Места:</h3>
          {places.length > 0 ? (
            <ul>
              {places.map((place) => (
                <li key={place.name} className="mb-4 p-4 border rounded-md">
                  <div className="flex items-center mb-2">
                    <img src={place.imageUrl} alt={place.name} className="w-20 h-20 object-cover rounded mr-4" />
                    <div>
                      <h4 className="text-lg font-semibold">{place.name}</h4>
                      <p className="text-sm text-gray-500">{place.category}</p>
                    </div>
                  </div>
                  <p>{place.description}</p>
                  {place.dateFounded && <p>Дата основания: {place.dateFounded}</p>}
                  {place.averagePrice && <p>Средняя цена: {place.averagePrice}</p>}
                  {place.rating && (
                    <div className="flex items-center">
                      Рейтинг: <StarRating rating={place.rating} />
                    </div>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Посмотреть на карте
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Места еще не выбраны.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
