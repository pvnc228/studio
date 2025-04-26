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

  /**
   * Дата основания места
   */
  dateFounded?: string;

  /**
   * Средняя цена за услуги
   */
  averagePrice?: string;

  /**
   * Рейтинг места
   */
  rating?: number;

  /**
   * URL на Google Maps для места
   */
  googleMapsUrl?: string;
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
          description: 'Элегантный ресторан с русской кухней, расположенный в историческом здании.',
          imageUrl: 'https://www.restoranpushkin.ru/upload/iblock/e8a/e8aa94997313f436d18718f9941bf423.jpg',
          dateFounded: '1999',
          averagePrice: '3000-5000 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/jF1hL6k3sP9rN8oF7'
        },
        {
          name: 'Кафе "Dr. Живаго"',
          category: 'ресторан',
          location: { lat: 55.7595, lng: 37.6122 },
          description: 'Ресторан с панорамным видом на Кремль, предлагающий современную русскую кухню.',
          imageUrl: 'https://avatars.mds.yandex.net/get-altay/238714/2a0000016723c818e4a57487a8013e33c108/XXL_height',
          dateFounded: '2012',
          averagePrice: '2500-4000 ₽',
          rating: 4.2,
          googleMapsUrl: 'https://maps.app.goo.gl/a1B2c3d4e5F6g7H8' // Replace with actual URL if available
        },
      ];
    } else if (category === 'кафе') {
      return [
        {
          name: 'Кафе "Кофемания"',
          category: 'кафе',
          location: { lat: 55.7600, lng: 37.6150 },
          description: 'Популярная сеть кофеен с широким выбором кофейных напитков и десертов.',
          imageUrl: 'https://top10.travel/wp-content/uploads/2022/12/kofemaniya-v-moskve.jpg',
          dateFounded: '2001',
          averagePrice: '800-1500 ₽',
          rating: 4.0,
          googleMapsUrl: 'https://maps.app.goo.gl/i9JkL0mN1oP2q3R4' // Replace with actual URL if available
        },
        {
          name: 'Кафе "АндерСон"',
          category: 'кафе',
          location: { lat: 55.7580, lng: 37.6100 },
          description: 'Семейное кафе с уютной атмосферой и вкусными десертами для детей и взрослых.',
          imageUrl: 'https://www.gastronom.ru/binfiles/images/20170203/b8d2b45a-f905-4593-a531-540889c7c0a4.jpg',
          dateFounded: '2009',
          averagePrice: '1000-2000 ₽',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/s5T6u7V8w9XyZ0aB' // Replace with actual URL if available
        },
      ];
    } else if (category === 'отель') {
      return [
        {
          name: 'Отель "Метрополь"',
          category: 'отель',
          location: { lat: 55.7550, lng: 37.6200 },
          description: 'Исторический отель в центре Москвы с роскошными номерами и изысканными ресторанами.',
          imageUrl: 'https://r-cf.bstatic.com/images/hotel/max1024x768/276/276290558.jpg',
          dateFounded: '1905',
          averagePrice: '15000-30000 ₽',
          rating: 4.6,
          googleMapsUrl: 'https://maps.app.goo.gl/c1D2e3F4g5H6i7J8' // Replace with actual URL if available
        },
        {
          name: 'Отель "The Ritz-Carlton"',
          category: 'отель',
          location: { lat: 55.7560, lng: 37.6180 },
          description: 'Роскошный отель рядом с Красной площадью, предлагающий высочайший уровень сервиса и комфорта.',
          imageUrl: 'https://media.cntraveler.com/photos/64fa523ccb995a428444436e/16:9/w_3840,h_2160,c_limit/The%20Ritz-Carlton%20Moscow-Pool-5.jpg',
          dateFounded: '2007',
          averagePrice: '20000-40000 ₽',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/k9L0mN1oP2q3R4sT' // Replace with actual URL if available
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
          description: 'Историческое кафе на Невском проспекте с видом на Казанский собор.',
          imageUrl: 'https://kudago.com/media/images/news/main_news/820x470_08_cafe_singer_1.jpg',
          dateFounded: '1904',
          averagePrice: '1200-2500 ₽',
          rating: 4.4,
          googleMapsUrl: 'https://maps.app.goo.gl/GzJo9Q6dfgi8a3AB8'
        },
        {
          name: 'Кафе "Пышечная"',
          category: 'кафе',
          location: { lat: 59.9375, lng: 30.3233 },
          description: 'Знаменитое место с пышками, популярное среди местных жителей и туристов.',
          imageUrl: 'https://static.ngs.ru/news/99/preview_861a1c4f2543564338f5ba5e9ca2a64e.jpg',
          dateFounded: '1958',
          averagePrice: '200-500 ₽',
          rating: 4.1,
          googleMapsUrl: 'https://maps.app.goo.gl/u5V6w7X8y9ZaB0cD' // Replace with actual URL if available
        },
      ];
    } else if (category === 'бар') {
      return [
        {
          name: 'Бар "Apotheke"',
          category: 'бар',
          location: { lat: 59.9350, lng: 30.3200 },
          description: 'Коктейльный бар с уникальной атмосферой старинной аптеки.',
          imageUrl: 'https://scontent-hel3-1.cdninstagram.com/v/t39.30808-6/302979191_444446384379843_7349941254701475151_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybF9zZWN1cmUiLCJwcm9kdWN0X3R5cGUiOiJzaGFyZV90byJ9&_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=JQkJ_lG0o8QAX-KP-tQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfC-m-9J_etQXxytSa-O-s9HlS9nC-1R-6t-wKYyrhYQGQ&oe=6670B80A&_nc_sid=10d13b',
          dateFounded: '2014',
          averagePrice: '1500-3000 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/e1F2g3H4i5J6k7L8' // Replace with actual URL if available
        },
        {
          name: 'Бар "El Copitas"',
          category: 'бар',
          location: { lat: 59.9360, lng: 30.3220 },
          description: 'Мексиканский бар с большим выбором текилы и мескаля.',
          imageUrl: 'https://copitasbar.com/images/slider/slider3.jpg',
           dateFounded: '2015',
          averagePrice: '1800-3500 ₽',
          rating: 4.6,
          googleMapsUrl: 'https://maps.app.goo.gl/m9N0oP1qR2s3T4uV' // Replace with actual URL if available
        },
      ];
    } else if (category === 'отель') {
      return [
        {
          name: 'Отель "Four Seasons Lion Palace"',
          category: 'отель',
          location: { lat: 59.9390, lng: 30.3150 },
          description: 'Роскошный отель в историческом здании с видом на Исаакиевский собор.',
          imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/a9/2a/2c/four-seasons-hotel-lion.jpg?w=700&h=-1&s=1',
           dateFounded: '2013',
          averagePrice: '25000-50000 ₽',
          rating: 4.8,
          googleMapsUrl: 'https://maps.app.goo.gl/w7X8y9ZaB0cD1eFg' // Replace with actual URL if available
        },
        {
          name: 'Отель "Belmond Grand Hotel Europe"',
          category: 'отель',
          location: { lat: 59.9380, lng: 30.3230 },
          description: 'Гранд-отель с богатой историей и элегантными интерьерами.',
          imageUrl: 'https://www.belmond.com/assets/34/BGE_Suite_Winter_1600x900.jpg',
           dateFounded: '1875',
          averagePrice: '20000-40000 ₽',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/h4I5j6K7l8M9n0oP' // Replace with actual URL if available
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
        description: 'Отель в историческом центре Суздаля, предлагающий комфортное размещение и русскую кухню.',
        imageUrl: 'https://www.suzdalhotel.ru/images/numbers/standart-big1.jpg',
         dateFounded: '2007',
          averagePrice: '8000-15000 ₽',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/qR2s3T4uV5w6X7yZ' // Replace with actual URL if available
      },
    ];
  }

    if (city === 'владимир' && category === 'отель') {
    return [
      {
        name: 'Отель "У Золотых ворот"',
        category: 'отель',
        location: { lat: 56.1292, lng: 40.4086 },
        description: 'Отель в историческом центре Владимира, расположенный недалеко от Золотых ворот.',
        imageUrl: 'https://www.otelsuzdal.ru/img/rooms/room18.jpg',
         dateFounded: '2005',
          averagePrice: '7000-12000 ₽',
          rating: 4.2,
          googleMapsUrl: 'https://maps.app.goo.gl/aB0cDeFg1h2I3j4K' // Replace with actual URL if available
      },
    ];
  }

      if (city === 'ярославль' && category === 'отель') {
    return [
      {
        name: 'Отель "Park Inn by Radisson"',
        category: 'отель',
        location: { lat: 57.6235, lng: 39.8728 },
        description: 'Современный отель в Ярославле, предлагающий комфортабельные номера и удобное расположение.',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/149319444.jpg?k=26299f648289336e8ef1804557df4969c580133c44b43f4a8099d77cd9e46b6c&o=&hp=1',
         dateFounded: '2010',
          averagePrice: '6000-10000 ₽',
          rating: 4.1,
          googleMapsUrl: 'https://maps.app.goo.gl/l8M9n0oP1qR2s3T4' // Replace with actual URL if available
      },
    ];
  }

  return [];
}
