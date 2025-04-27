"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Place } from "@/services/places";
import { useUserProfile } from "@/context/UserProfileContext";
import { useCallback } from "react";

interface RouteDisplayProps {
  places: Place[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center" aria-label={`Рейтинг: ${rating} из 5 звезд`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <svg key={`full-${index}`} className="w-5 h-5 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <svg key={`empty-${index}`} className="w-5 h-5 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      ))}
    </div>
  );
};

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ places }) => {
  const { addToSearchHistory } = useUserProfile();

  const handleMapLinkClick = useCallback((place: Place) => {
    addToSearchHistory(place);
  }, [addToSearchHistory]);

  return (
    <Card className="w-full shadow-lg rounded-xl border border-border bg-card mt-6">
      <CardContent className="p-6 grid gap-6">
        <h2 className="text-xl font-semibold text-foreground">Выбранные Места:</h2>

        <div>
          {places.length > 0 ? (
            <ul className="space-y-6">
              {places.map((place) => (
                <li key={place.id} className="p-5 border border-border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-background">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-3">
                    <img
                      src={place.imageUrl || 'https://picsum.photos/150/150'}
                      alt={place.name}
                      width={150}
                      height={150}
                      className="w-full md:w-36 h-36 object-cover rounded-lg shadow-md flex-shrink-0"
                      onError={(e) => (e.currentTarget.src = 'https://picsum.photos/150/150')}
                    />
                    <div className="flex-grow">
                      <h4 className="text-2xl font-bold text-foreground mb-1">{place.name}</h4>
                      <p className="text-base text-muted-foreground capitalize">{place.category}</p>
                      {place.rating && (
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-muted-foreground mr-2">Рейтинг:</span>
                          <StarRating rating={place.rating} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mb-3 text-foreground leading-relaxed">{place.description}</p>
                  {place.dateFounded && <p className="text-sm text-muted-foreground mb-1"><strong>Дата основания:</strong> {place.dateFounded}</p>}
                  {place.averagePrice && <p className="text-sm text-muted-foreground mb-1"><strong>Средний чек:</strong> {place.averagePrice}</p>}

                  {place.mapsUrl && ( // Заменяем googleMapsUrl на mapsUrl
                    <Button
                      asChild
                      variant="default"
                      size="lg"
                      className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={() => handleMapLinkClick(place)}
                    >
                      <a
                        href={place.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Посмотреть ${place.name} на карте`}
                      >
                        <MapPin className="h-5 w-5" />
                        Посмотреть на карте
                      </a>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-6">Места еще не выбраны. Воспользуйтесь подбором выше!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};