// services/reviews.ts
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Review = {
    id: number;
    text: string;
    rating: number;
    createdAt: Date;
    user: {
      id: number;
      firstName: string | null;
      lastName: string | null;
    };
  };
export async function createReview(userId: number, placeId: number, data: { text: string; rating: number }) {
  return prisma.review.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
      place: { connect: { id: placeId } },
    },
  });
}

export async function getReviewsByPlaceId(placeId: number) {
  return prisma.review.findMany({
    where: { placeId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
}
export async function getReviewsByUserId(userId: number) {
    const reviews = await prisma.review.findMany({
      where: { userId },
      include: { place: true },
      orderBy: { createdAt: "desc" },
    });
  
    return reviews.map(review => ({
      id: review.id,
      text: review.text,
      rating: review.rating,
      placeId: review.placeId,
      placeName: review.place.name,
      createdAt: review.createdAt,
    }));
  }