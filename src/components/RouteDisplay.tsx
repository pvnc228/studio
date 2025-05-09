"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, HeartOff } from "lucide-react";
import { Place } from "@/services/places";
import { useUserProfile } from "@/context/UserProfileContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useCallback } from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createReview, getReviewsByPlaceId, Review } from "@/services/reviews";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
interface RouteDisplayProps {
  places: Place[];
}

export const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = (rating % 1) >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center" aria-label={`Рейтинг: ${rating} из 5 звезд`}>
      {Array(fullStars).fill(0).map((_, index) => (
        <svg
          key={`full-${index}`}
          className="w-5 h-5 text-yellow-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}

      {hasHalf && (
        <svg
          key="half"
          className="w-5 h-5 text-yellow-400 fill-current"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%)',
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )}

      {Array(emptyStars).fill(0).map((_, index) => (
        <svg
          key={`empty-${index}`}
          className="w-5 h-5 text-gray-300 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ places }) => {
  const { userProfile, addToSearchHistory } = useUserProfile();
  const userId = userProfile?.id;
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const {
    favorites,
    addFavorite,
    removeFavorite,
  } = useFavorites(userId);

  const reviewSchema = z.object({
    text: z.string().min(1, "Текст отзыва обязателен"),
    rating: z.number().min(1, "Оценка от 1 до 5").max(5, "Оценка от 1 до 5").default(5),
  });

  const reviewForm = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
      rating: 5,
    },
  });

  const handleReviewSubmit = async (data: z.infer<typeof reviewSchema>) => {
    if (!userId || !selectedPlace) return;

    const existingReview = reviews.find(r => r.user.id === userId);
if (existingReview) {
  setReviewError("Вы уже оставляли отзыв на это место");
  return;
}
    try {
      await createReview(userId, selectedPlace.id, data);

      const newReviews = await getReviewsByPlaceId(selectedPlace.id);
      setReviews(newReviews);
      reviewForm.reset();
      setReviewError(null);
    } catch (error) {
      setReviewError("Ошибка при отправке отзыва");
    }

  };


  useEffect(() => {
    if (selectedPlace?.id) {
      const fetchReviews = async () => {
        try {
          const fetchedReviews = await getReviewsByPlaceId(selectedPlace.id);
          setReviews(fetchedReviews);
        } catch (error) {
          setReviewError("Не удалось загрузить отзывы");
        } finally {
          setIsLoadingReviews(false);
        }
      };
      fetchReviews();
    }
  }, [selectedPlace]);

  const handleMapLinkClick = useCallback((place: Place) => {
    addToSearchHistory(place);
  }, [addToSearchHistory]);

  const isFavorite = useCallback(
    (id: number) => 
      favorites.some(fav => fav?.id === id), 
    [favorites]
  );

  const toggleFavorite = useCallback(
    (place: Place) => {
      if (!userId) return;

      if (isFavorite(place.id)) {
        removeFavorite(place.id.toString());
      } else {
        addFavorite(place);
      }
    },
    [userId, isFavorite, addFavorite, removeFavorite]
  );



  return (
    <Card className="w-full shadow-lg rounded-xl border border-border bg-card mt-6">
      <CardContent className="p-6 grid gap-6">
        <h2 className="text-xl font-semibold text-foreground">Выбранные Места:</h2>

        <div>
          {places.length > 0 ? (
            <ul className="space-y-6">
              {places.map((place) => (
              <li 
              key={place.id} 
              className="relative p-5 border border-border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-background cursor-pointer"
              onClick={() => {
                setSelectedPlace(place);
                setIsModalOpen(true);
              }}
            >
                  
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
                  
                </li>
              
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-6">Места еще не выбраны. Воспользуйтесь подбором выше!</p>
          )}
        </div>
        
        {isModalOpen && (
          <div 
  className="fixed inset-0 bg-black bg-opacity-50" 
  onClick={(e) => {
    if (e.target === e.currentTarget) setIsModalOpen(false);
  }}
>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <button 
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6L18 18" />
                </svg>
              </button>

              {selectedPlace && (
                <div className="space-y-6">
                  <img 
                    src={selectedPlace.imageUrl || 'https://picsum.photos/600/400'} 
                    alt={selectedPlace.name} 
                    className="w-full h-64 object-cover rounded-lg mb-4" 
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedPlace.name}</h2>
                    <p className="text-gray-500 mb-2">{selectedPlace.category}</p>
                    <div className="flex items-center mb-4">
                      <StarRating rating={selectedPlace.rating || 0} />
                      <span className="ml-2 text-sm text-gray-500">
                        {selectedPlace.rating || "Нет оценок"}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedPlace.extendedDescription}</p>
                    <div className="flex items-center gap-4 mb-4">
                     
                      
                      {selectedPlace?.mapsUrl && (
                        <Link 
                        href={selectedPlace.mapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleMapLinkClick(selectedPlace)}
                      >
                        <Button 
                          variant="default" 
                          className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-lg"
                            >
                            <MapPin className="h-5 w-5" />
                              Посмотреть на карте
                        </Button>
                        </Link>
                          )}
                    </div>
                    <div className="text-sm text-gray-500">
                      <p><strong>Дата основания:</strong> {selectedPlace.dateFounded}</p>
                      <p><strong>Средний чек:</strong> {selectedPlace.averagePrice}</p>
                    </div>
                  </div>
                </div>
              )}
               <div className="mt-8">
  <h3 className="text-2xl font-bold mb-4">Отзывы</h3>

  {/* Форма для отзыва */}
  {userProfile && (
    <div className="p-4 border rounded-lg bg-gray-50 mb-4">
      <form onSubmit={reviewForm.handleSubmit(handleReviewSubmit)}>
        <div className="flex items-center mb-4">
          <StarRating 
            rating={reviewForm.watch("rating")}
            
          />
          <input 
            type="range" 
            min={1} 
            max={5} 
            step={1} 
            value={reviewForm.watch("rating")}
            onChange={(e) => 
              reviewForm.setValue("rating", parseInt(e.target.value))
            }
            className="w-full"
          />
        </div>
        <textarea 
          {...reviewForm.register("text")} 
          placeholder="Напишите ваш отзыв..."
          className="w-full p-2 border rounded-md mb-4"
        />
        <Button type="submit" className="bg-primary text-white">
          Отправить отзыв
        </Button>
      </form>
    </div>
  )}

  {isLoadingReviews ? (
    <div>Загрузка...</div>
  ) : reviews.length > 0 ? (
    reviews.map(review => (
      <div 
        key={review.id}
        className="p-4 border rounded-md bg-gray-100 mb-2"
      >
        <div className="flex justify-between items-center">
          <div>
            <strong>{review.user.firstName || "Аноним"}</strong>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="mt-2 text-gray-700">{review.text}</p>
      </div>
    ))
  ) : (
    <p>Пока нет отзывов</p>
  )}
</div>
            </div>
          </div>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};
