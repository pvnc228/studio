// hooks/useUserReviews.ts
import { useEffect, useState } from "react";
import { getReviewsByUserId } from "@/services/reviews";
import { Review } from "@/services/reviews";

export function useUserReviews(userId: number | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) return;

      try {
        const fetchedReviews = await getReviewsByUserId(userId);
        setReviews(fetchedReviews);
      } catch (error) {
        setError("Не удалось загрузить отзывы");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  return { reviews, loading, error };
}