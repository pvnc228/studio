/**
 * Представляет географическое местоположение.
 */
export interface Location {
  /**
   * Широта местоположения.
   */
  lat: number;
  /**
   * Долгота местоположения.
   */
  lng: number;
}

/**
 * Представляет информацию о месте, таком как ресторан, кафе или отель.
 */
export interface Place {
  /**
   * Название места.
   */
  name: string;
  /**
   * Категория места (например, ресторан, кафе, отель).
   */
  category: string;
  /**
   * Местоположение места.
   */
  location: Location;
  /**
   * Краткое описание места.
   */
  description: string;
  /**
   * URL изображения для места
   */
  imageUrl: string;
}

/**
 * Асинхронно извлекает список мест для данного города и категории.
 *
 * @param city Город для поиска мест.
 * @param category Категория мест для извлечения.
 * @returns Promise, который разрешается в массив объектов Place.
 */
export async function getPlaces(city: string, category: string): Promise<Place[]> {
  // TODO: Implement this by calling an API.

  if (city === 'москва') {
    if (category === 'ресторан') {
      return [
        {
          name: 'Ресторан "Пушкин"',
          category: 'ресторан',
          location: { lat: 55.7592, lng: 37.6092 },
          description: 'Элегантный ресторан с русской кухней.',
          imageUrl: 'https://picsum.photos/400/300'
        },
        {
          name: 'Кафе "Dr. Живаго"',
          category: 'ресторан',
          location: { lat: 55.7595, lng: 37.6122 },
          description: 'Ресторан с видом на Кремль.',
          imageUrl: 'https://picsum.photos/400/301'
        },
      ];
    } else if (category === 'кафе') {
      return [
        {
          name: 'Кафе "Кофемания"',
          category: 'кафе',
          location: { lat: 55.7600, lng: 37.6150 },
          description: 'Популярная сеть кофеен.',
          imageUrl: 'https://picsum.photos/400/307'
        },
        {
          name: 'Кафе "АндерСон"',
          category: 'кафе',
          location: { lat: 55.7580, lng: 37.6100 },
          description: 'Семейное кафе с десертами.',
          imageUrl: 'https://picsum.photos/400/308'
        },
      ];
    } else if (category === 'отель') {
      return [
        {
          name: 'Отель "Метрополь"',
          category: 'отель',
          location: { lat: 55.7550, lng: 37.6200 },
          description: 'Исторический отель в центре Москвы.',
          imageUrl: 'https://picsum.photos/400/309'
        },
        {
          name: 'Отель "The Ritz-Carlton"',
          category: 'отель',
          location: { lat: 55.7560, lng: 37.6180 },
          description: 'Роскошный отель рядом с Красной площадью.',
          imageUrl: 'https://picsum.photos/400/310'
        },
      ];
    }
  }

  if (city === 'санкт-петербург') {
    if (category === 'кафе') {
      return [
        {
          name: 'Кафе "Зингеръ"',
          category: 'кафе',
          location: { lat: 59.9343, lng: 30.3249 },
          description: 'Историческое кафе на Невском проспекте.',
          imageUrl: 'https://picsum.photos/400/302'
        },
        {
          name: 'Кафе "Пышечная"',
          category: 'кафе',
          location: { lat: 59.9375, lng: 30.3233 },
          description: 'Знаменитое место с пышками.',
          imageUrl: 'https://picsum.photos/400/303'
        },
      ];
    } else if (category === 'бар') {
      return [
        {
          name: 'Бар "Apotheke"',
          category: 'бар',
          location: { lat: 59.9350, lng: 30.3200 },
          description: 'Коктейльный бар с атмосферой аптеки.',
          imageUrl: 'https://picsum.photos/400/311'
        },
        {
          name: 'Бар "El Copitas"',
          category: 'бар',
          location: { lat: 59.9360, lng: 30.3220 },
          description: 'Мексиканский бар с текилой и мескалем.',
          imageUrl: 'https://picsum.photos/400/312'
        },
      ];
    } else if (category === 'отель') {
      return [
        {
          name: 'Отель "Four Seasons Lion Palace"',
          category: 'отель',
          location: { lat: 59.9390, lng: 30.3150 },
          description: 'Роскошный отель в историческом здании.',
          imageUrl: 'https://picsum.photos/400/313'
        },
        {
          name: 'Отель "Belmond Grand Hotel Europe"',
          category: 'отель',
          location: { lat: 59.9380, lng: 30.3230 },
          description: 'Гранд-отель с богатой историей.',
          imageUrl: 'https://picsum.photos/400/314'
        },
      ];
    }
  }

  if (city === 'суздаль' && category === 'отель') {
    return [
      {
        name: 'Отель "Кремлевский"',
        category: 'отель',
        location: { lat: 56.4278, lng: 40.4583 },
        description: 'Отель в историческом центре Суздаля.',
        imageUrl: 'https://picsum.photos/400/304'
      },
    ];
  }

    if (city === 'владимир' && category === 'отель') {
    return [
      {
        name: 'Отель "У Золотых ворот"',
        category: 'отель',
        location: { lat: 56.1292, lng: 40.4086 },
        description: 'Отель в историческом центре Владимира.',
        imageUrl: 'https://picsum.photos/400/305'
      },
    ];
  }

      if (city === 'ярославль' && category === 'отель') {
    return [
      {
        name: 'Отель "Park Inn by Radisson"',
        category: 'отель',
        location: { lat: 57.6235, lng: 39.8728 },
        description: 'Современный отель в Ярославле.',
        imageUrl: 'https://picsum.photos/400/306'
      },
    ];
  }

  return [];
}
