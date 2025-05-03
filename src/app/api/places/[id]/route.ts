// app/api/places/[id]/route.ts
import { getPlaceById } from "@/services/places";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const place = await getPlaceById(parseInt(params.id));
    return new Response(JSON.stringify(place), { status: 200 });
  } catch (error) {
    return new Response("Место не найдено", { status: 404 });
  }
}