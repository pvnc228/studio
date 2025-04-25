/**
 * Represents a geographical location.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents information about a place, such as a restaurant, cafe, or hotel.
 */
export interface Place {
  /**
   * The name of the place.
   */
  name: string;
  /**
   * The category of the place (e.g., restaurant, cafe, hotel).
   */
  category: string;
  /**
   * The location of the place.
   */
  location: Location;
  /**
   * A short description of the place.
   */
  description: string;
  /**
   * URL of an image for the place
   */
  imageUrl: string;
}

/**
 * Asynchronously retrieves a list of places for a given city and category.
 *
 * @param city The city to search for places in.
 * @param category The category of places to retrieve.
 * @returns A promise that resolves to an array of Place objects.
 */
export async function getPlaces(city: string, category: string): Promise<Place[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Sample Restaurant',
      category: 'restaurant',
      location: { lat: 55.7558, lng: 37.6173 },
      description: 'A great restaurant in Moscow.',
      imageUrl: 'https://example.com/restaurant.jpg'
    },
    {
      name: 'Cozy Cafe',
      category: 'cafe',
      location: { lat: 59.9311, lng: 30.3609 },
      description: 'A cozy cafe in St. Petersburg.',
      imageUrl: 'https://example.com/cafe.jpg'
    },
  ];
}

