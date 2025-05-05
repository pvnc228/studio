// app/api/reviews/route.ts (создание отзыва)
import { createReview } from "@/services/reviews";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const review = await createReview(data.userId, data.placeId, data);
    return new Response(JSON.stringify(review), { status: 201 });
  } catch (error) {
    return new Response("Ошибка при создании отзыва", { status: 500 });
  }
}


import { getReviewsByPlaceId } from "@/services/reviews";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const placeId = parseInt(params.id);
  try {
    const reviews = await getReviewsByPlaceId(placeId);
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    return new Response("Не найдено", { status: 404 });
  }
}