import { useEffect, useState, useCallback } from "react";
import { Place } from "@/services/places";
import { useUserProfile } from "@/context/UserProfileContext";

export function useFavorites(userId: number | undefined) {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUserProfile();

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

      // Обработка данных с проверкой наличия связанных полей
      const places = data
        .filter((favorite: any) => 
          favorite.place?.city && 
          favorite.place?.category
        )
        .map((favorite: any) => ({
          ...favorite.place,
          city: favorite.place.city.name,
          category: favorite.place.category.name,
          cityId: favorite.place.cityId,
        }));

      setFavorites(places);
    } catch (err: any) {
      console.error("Ошибка загрузки избранного:", err.message);
      setError(err.message || "Не удалось загрузить избранное");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

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

  const removeFavorite = useCallback(
    async (placeId: string) => {
      if (!userId || !token) return;

      try {
        const res = await fetch(`/api/favorites/${placeId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
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