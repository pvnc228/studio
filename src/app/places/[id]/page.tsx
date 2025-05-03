"use client";


import { useEffect, useState } from "react";
import { Place } from "@/services/places";
import { getPlaceById } from "@/services/places"; // Создайте функцию
import { useFavorites } from "@/hooks/useFavorites";
import { useUserProfile } from "@/context/UserProfileContext";
import { StarRating } from "@/components/RouteDisplay"; // Импортируйте ваш компонент рейтинга
import { useParams } from "next/navigation";
import { MapPin, Heart, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaceDetail() {
  const { id } = useParams(); // Используем useParams
  const placeId = parseInt(id as string);
  const { userProfile } = useUserProfile();
  const userId = userProfile?.id;
  const { favorites, addFavorite, removeFavorite } = useFavorites(userId);
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) return;

      try {
        const fetchedPlace = await getPlaceById(placeId);
        setPlace(fetchedPlace);
      } catch (error) {
        setError("Место не найдено");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const isFavorite = favorites.some(fav => fav.id === place?.id);

  return (
    <div className="p-6">
      {isLoading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}
      {place && (
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            <img
              src={place.imageUrl || 'https://picsum.photos/600/400'}
              alt={place.name}
              className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg mb-4 md:mb-0"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
              <p className="text-lg text-muted-foreground mb-2">{place.category}</p>
              <div className="flex items-center mb-4">
                <StarRating rating={place.rating || 0} />
                <span className="ml-2 text-sm text-muted-foreground">
                  {place.rating || "Нет оценок"}
                </span>
              </div>
              <p className="text-foreground mb-4">{place.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => {
                    if (!userId) return;
                    isFavorite 
                      ? removeFavorite(place.id.toString())
                      : addFavorite(place);
                  }}
                >
                  {isFavorite ? (
                    <Heart className="text-red-500 w-6 h-6" />
                  ) : (
                    <HeartOff className="text-gray-400 w-6 h-6" />
                  )}
                </button>
                <Button 
                  asChild 
                  variant="default" 
                  className="bg-primary text-primary-foreground"
                >
                  <a 
                    href={place.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Посмотреть на карте
                  </a>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p><strong>Дата основания:</strong> {place.dateFounded}</p>
                <p><strong>Средний чек:</strong> {place.averagePrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}