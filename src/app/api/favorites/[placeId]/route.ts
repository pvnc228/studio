//api/[placeId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserId } from '@/lib/auth'

// В DELETE-роуте
export async function DELETE(req: Request, { params }: { params: { placeId: string } }) {
  let userId: number;
  try {
    userId = await getUserId(req as any);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }

  const placeId = parseInt(params.placeId, 10);
  try {
    await prisma.favorite.deleteMany({
      where: { userId, placeId },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Не удалось удалить из избранного" },
      { status: 500 }
    );
  }
}