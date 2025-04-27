import { PrismaClient } from '@prisma/client';
import { mockDatabase } from './services/mockPlaces';

const prisma = new PrismaClient();

async function seed() {
  // Insert cities
  for (const cityName in mockDatabase) {
    await prisma.city.create({
      data: { name: cityName }
    });
  }

  // Insert categories
  const allCategories = new Set<string>();
  for (const city in mockDatabase) {
    for (const category in mockDatabase[city]) {
      allCategories.add(category);
    }
  }
  for (const categoryName of allCategories) {
    await prisma.category.create({
      data: { name: categoryName }
    });
  }

  // Insert places
  for (const cityName in mockDatabase) {
    for (const categoryName in mockDatabase[cityName]) {
      for (const place of mockDatabase[cityName][categoryName]) {
        await prisma.place.create({
          data: {
            name: place.name,
            category: { connect: { name: categoryName } },
            city: { connect: { name: cityName } },
            lat: place.location.lat,
            lng: place.location.lng,
            description: place.description,
            imageUrl: place.imageUrl,
            dateFounded: place.dateFounded,
            averagePrice: place.averagePrice,
            rating: place.rating,
            googleMapsUrl: place.googleMapsUrl,
          }
        });
      }
    }
  }

  console.log('Database seeded successfully!');
}

seed()
  .catch(e => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });