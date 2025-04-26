"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import Button component
import { MapPin } from "lucide-react";
import { Place } from "@/services/places";

interface RouteDisplayProps {
  places: Place[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={`full-${index}`} className="text-yellow-500">★</span>
      ))}
      {halfStar && <span className="text-yellow-500">★</span>} {/* Display half star as full for simplicity or use a half star icon */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={`empty-${index}`} className="text-gray-300">★</span>
      ))}
    </div>
  );
};

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ places }) => {

  return (
    <Card className="w-full shadow-md">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">Выбранные Места:</h2>

        <div>
          {places.length > 0 ? (
            <ul className="space-y-4">
              {places.map((place) => (
                <li key={place.name} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                    <img
                      src={place.imageUrl || 'https://picsum.photos/200/200'} // Use placeholder if no image
                      alt={place.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-md mr-0 sm:mr-4 mb-2 sm:mb-0 flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h4 className="text-xl font-semibold">{place.name}</h4>
                      <p className="text-sm text-muted-foreground">{place.category}</p>
                    </div>
                  </div>
                  <p className="mb-2">{place.description}</p>
                  {place.dateFounded && <p className="text-sm text-muted-foreground">Дата основания: {place.dateFounded}</p>}
                  {place.averagePrice && <p className="text-sm text-muted-foreground">Средний чек: {place.averagePrice}</p>}
                  {place.rating && (
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-muted-foreground mr-1">Рейтинг:</span> <StarRating rating={place.rating} />
                    </div>
                  )}
                  {place.googleMapsUrl && (
                     <Button
                      asChild
                      variant="outline"
                      className="mt-2 inline-flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    >
                      <a
                        href={place.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="h-4 w-4" />
                        Посмотреть на карте
                      </a>
                    </Button>
                  )}
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
