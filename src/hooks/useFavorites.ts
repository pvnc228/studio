import { useEffect, useState, useCallback } from "react";
import { Place } from "@/services/places";
import { useUserProfile } from "@/context/UserProfileContext";

export function useFavorites(userId: number | undefined) {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userProfile, token } = useUserProfile(); // Используем ваш реальный контекст

  // 1. Исправленный fetchFavorites с проверкой токена и зависимостями
  const fetchFavorites = useCallback(async () => {
    if (!userId || !token) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch("/api/favorites", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!res.ok) {
        throw new Error("Ошибка загрузки избранного");
      }
  
      const data = await res.json();
  
      // Фильтруем данные: оставляем только объекты с place и place.id
      const places = data
        .filter(favorite => favorite.place && favorite.place.id !== undefined)
        .map(favorite => favorite.place);
  
      setFavorites(places);
    } catch (err: any) {
      console.error("Ошибка загрузки избранного:", err.message);
      setError(err.message || "Не удалось загрузить избранное");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [userId, token]); // Добавили зависимость от token

  // 2. Исправленный addFavorite
  const addFavorite = useCallback(
    async (place: Place) => {
      if (!userId || !token) return;
  
      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ placeId: place.id }),
        });
  
        if (res.status === 409) {
          const errorData = await res.json();
          setError(errorData.message || "Место уже в избранном");
          return;
        }
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Ошибка добавления");
        }
  
        await fetchFavorites();
      } catch (err: any) {
        console.error("Ошибка добавления в избранное:", err?.message);
        setError(err?.message || "Не удалось добавить в избранное");
      }
    },
    [userId, token, fetchFavorites]
  );
  // 3. Исправленный removeFavorite (правильный URL)
  const removeFavorite = useCallback(
    async (placeId: string) => {
      if (!userId || !token) return;

      try {
        const res = await fetch(`/api/favorites/${placeId}`, { // Исправленный URL
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}` // Добавили токен
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Ошибка удаления");
        }

        await fetchFavorites();
      } catch (err: any) {
        console.error("Ошибка удаления из избранного:", err?.message);
        setError(err?.message || "Не удалось удалить из избранного");
      }
    },
    [userId, token, fetchFavorites]
  );

  // 4. Исправленный useEffect
  useEffect(() => {
    if (userId && token) {
      fetchFavorites();
    }
  }, [userId, token, fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    refetch: fetchFavorites
  };
}