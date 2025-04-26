
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

const mockDatabase: { [city: string]: { [category: string]: Place[] } } = {
  'москва': {
    'ресторан': [
      {
        name: 'Ресторан "Пушкинъ"',
        category: 'ресторан',
        location: { lat: 55.7592, lng: 37.6092 },
        description: 'Элегантный ресторан с русской дворянской кухней, расположенный в историческом особняке.',
        imageUrl: 'https://pushkin-cafe.ru/wp-content/uploads/2020/12/DSC_5397-HDR-%D0%9A%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-1.jpg',
        dateFounded: '1999',
        averagePrice: '3500-7000 ₽',
        rating: 4.7,
        googleMapsUrl: 'https://maps.app.goo.gl/jF1hL6k3sP9rN8oF7'
      },
      {
        name: 'White Rabbit',
        category: 'ресторан',
        location: { lat: 55.7490, lng: 37.5800 },
        description: 'Ресторан современной русской кухни с панорамным видом на Москву.',
        imageUrl: 'https://whiterabbitmoscow.ru/images/background/about-main.jpg',
        dateFounded: '2011',
        averagePrice: '4000-8000 ₽',
        rating: 4.6,
        googleMapsUrl: 'https://maps.app.goo.gl/yGjV7XkF6L8R9bC9'
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
    ],
    'кафе': [
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
    ],
     'бар': [
        {
          name: 'Бар "Клава"',
          category: 'бар',
          location: { lat: 55.7650, lng: 37.6000 },
          description: 'Популярный бар с авторскими коктейлями и непринужденной атмосферой.',
          imageUrl: 'https://static.tildacdn.com/tild3334-3464-4038-a661-323263306538/18.jpg',
          dateFounded: '2010',
          averagePrice: '1000-2000 ₽',
          rating: 4.4,
          googleMapsUrl: 'https://maps.app.goo.gl/wE5F6g7H8i9JkL0m' // Replace with actual URL if available
        },
        {
          name: 'Бар " Noor Bar"',
          category: 'бар',
          location: { lat: 55.7630, lng: 37.6120 },
          description: 'Стильный бар с классическими коктейлями и DJ-сетами по выходным.',
          imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/07/87/24/43/noor-bar.jpg',
          dateFounded: '2009',
          averagePrice: '1200-2500 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/N1oP2q3R4s5T6u7V' // Replace with actual URL if available
        },
      ],
      'кинотеатр': [
        {
          name: 'Кинотеатр "Октябрь"',
          category: 'кинотеатр',
          location: { lat: 55.7525, lng: 37.5855 },
          description: 'Крупный кинотеатр на Новом Арбате с множеством залов и премьерными показами.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Kino_Oktyabr_Moscow.jpg/1200px-Kino_Oktyabr_Moscow.jpg',
          dateFounded: '1967',
          averagePrice: '300-800 ₽',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/X7yZ0aB1c2D3e4F5' // Replace with actual URL if available
        },
        {
          name: 'Кинотеатр "Пионер"',
          category: 'кинотеатр',
          location: { lat: 55.7340, lng: 37.5610 },
          description: 'Исторический кинотеатр с акцентом на авторское и фестивальное кино.',
          imageUrl: 'https://pioner-cinema.ru/wp-content/uploads/2017/11/pioner-1.jpg',
          dateFounded: '1953',
          averagePrice: '400-900 ₽',
          rating: 4.6,
          googleMapsUrl: 'https://maps.app.goo.gl/H8i9JkL0mN1oP2q3' // Replace with actual URL if available
        },
      ],
       'театр': [
        {
          name: 'Большой театр',
          category: 'театр',
          location: { lat: 55.7601, lng: 37.6187 },
          description: 'Главный театр оперы и балета России, всемирно известный символ русской культуры.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Bolshoi_Theatre_Moscow_2015.jpg/1024px-Bolshoi_Theatre_Moscow_2015.jpg',
          dateFounded: '1776',
          averagePrice: '2000-15000 ₽',
          rating: 4.8,
          googleMapsUrl: 'https://maps.app.goo.gl/R4s5T6u7V8w9XyZ0' // Replace with actual URL if available
        },
        {
          name: 'Малый театр',
          category: 'театр',
          location: { lat: 55.7596, lng: 37.6198 },
          description: 'Один из старейших драматических театров России, известный своими классическими постановками.',
          imageUrl: 'https://www.maly.ru/upload/medialibrary/c7c/c7cfb3c6ab37287152f970b633ed347f.jpg',
          dateFounded: '1756',
          averagePrice: '1000-5000 ₽',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/aB1c2D3e4F5g6H7i' // Replace with actual URL if available
        },
      ],
    'отель': [
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
    ],
    'парк': [
        {
          name: 'Парк Горького',
          category: 'парк',
          location: { lat: 55.7300, lng: 37.6000 },
          description: 'Центральный парк культуры и отдыха с набережной, велодорожками, музеями и кафе.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Gorky_Park_in_Moscow_01.jpg/1200px-Gorky_Park_in_Moscow_01.jpg',
          dateFounded: '1928',
          averagePrice: 'Бесплатно',
          rating: 4.8,
          googleMapsUrl: 'https://maps.app.goo.gl/K7l8M9n0oP1qR2s3' // Replace with actual URL if available
        },
        {
          name: 'Парк "Зарядье"',
          category: 'парк',
          location: { lat: 55.7510, lng: 37.6280 },
          description: 'Современный парк рядом с Кремлем с уникальным ландшафтным дизайном и парящим мостом.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Zaryadye_Park_Floating_Bridge_2021.jpg/1200px-Zaryadye_Park_Floating_Bridge_2021.jpg',
          dateFounded: '2017',
          averagePrice: 'Бесплатно',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/T4uV5w6X7yZ8aB0c' // Replace with actual URL if available
        },
      ],
  },
  'санкт-петербург': {
      'ресторан': [
        {
          name: 'Ресторан "Палкинъ"',
          category: 'ресторан',
          location: { lat: 59.9340, lng: 30.3390 },
          description: 'Исторический ресторан русской кухни с роскошными интерьерами.',
          imageUrl: 'https://palkin.ru/wp-content/uploads/interer-restorana-palkin-spb-bolshoj-zal-4.jpg',
          dateFounded: '1785',
          averagePrice: '3000-6000 ₽',
          rating: 4.6,
          googleMapsUrl: 'https://maps.app.goo.gl/D3e4F5g6H7i8J9kL' // Replace with actual URL if available
        },
        {
          name: 'Ресторан "КоКоКо"',
          category: 'ресторан',
          location: { lat: 59.9400, lng: 30.3200 },
          description: 'Ресторан современной русской кухни, использующий местные фермерские продукты.',
          imageUrl: 'https://kokoko.spb.ru/wp-content/uploads/2020/01/KOKOKO_0011-scaled.jpg',
          dateFounded: '2012',
          averagePrice: '2500-4500 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/oP1qR2s3T4uV5w6X' // Replace with actual URL if available
        },
      ],
    'кафе': [
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
    ],
    'бар': [
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
    ],
     'кинотеатр': [
        {
          name: 'Кинотеатр "Аврора"',
          category: 'кинотеатр',
          location: { lat: 59.9352, lng: 30.3418 },
          description: 'Один из старейших кинотеатров города с историческим интерьером.',
          imageUrl: 'https://www.kinoafisha.info/upload/iblock/a3a/a3af5e23574b23134b97d8b59f92492d.jpg',
          dateFounded: '1913',
          averagePrice: '300-700 ₽',
          rating: 4.2,
          googleMapsUrl: 'https://maps.app.goo.gl/B0cD1eFg2h3I4j5K' // Replace with actual URL if available
        },
        {
          name: 'Кинотеатр "Дом Кино"',
          category: 'кинотеатр',
          location: { lat: 59.9315, lng: 30.3470 },
          description: 'Культурный центр и кинотеатр, показывающий артхаусное и классическое кино.',
          imageUrl: 'https://peterburg2.ru/uploads/22/03/30/ga0e56f088c514c6.jpg',
          dateFounded: '1948',
          averagePrice: '350-800 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/j5K6l7M8n9N0oP1q' // Replace with actual URL if available
        },
      ],
       'театр': [
        {
          name: 'Мариинский театр',
          category: 'театр',
          location: { lat: 59.9253, lng: 30.2956 },
          description: 'Всемирно известный театр оперы и балета с богатой историей и репертуаром.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mariinsky_Theatre_Saint_Petersburg_2.jpg/1200px-Mariinsky_Theatre_Saint_Petersburg_2.jpg',
          dateFounded: '1783',
          averagePrice: '1500-10000 ₽',
          rating: 4.8,
          googleMapsUrl: 'https://maps.app.goo.gl/R2s3T4uV5w6X7yZ8' // Replace with actual URL if available
        },
        {
          name: 'Александринский театр',
          category: 'театр',
          location: { lat: 59.9325, lng: 30.3378 },
          description: 'Старейший драматический театр России, известный своими классическими постановками.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Alexandrinsky_Theatre_2017.jpg/1200px-Alexandrinsky_Theatre_2017.jpg',
          dateFounded: '1756',
          averagePrice: '1000-7000 ₽',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/eFg1h2I3j4K5l6M7' // Replace with actual URL if available
        },
      ],
    'отель': [
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
    ],
      'парк': [
        {
          name: 'Летний сад',
          category: 'парк',
          location: { lat: 59.9430, lng: 30.3370 },
          description: 'Старейший парк Санкт-Петербурга с фонтанами, скульптурами и Летним дворцом Петра I.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Summer_Garden_in_St._Petersburg_02.jpg/1200px-Summer_Garden_in_St._Petersburg_02.jpg',
          dateFounded: '1704',
          averagePrice: 'Платно (вход)',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/l6M7n8N9oP1qR2s3' // Replace with actual URL if available
        },
        {
          name: 'Елагин остров (ЦПКиО им. Кирова)',
          category: 'парк',
          location: { lat: 59.9680, lng: 30.2500 },
          description: 'Большой парк на острове с дворцово-парковым ансамблем, прудами и аттракционами.',
          imageUrl: 'https://elaginpark.org/upload/iblock/861/8613c091c56eb2053a3ed8e0bbd551bb.jpg',
          dateFounded: '1932',
          averagePrice: 'Платно (вход)',
          rating: 4.8,
          googleMapsUrl: 'https://maps.app.goo.gl/uV5w6X7yZ8aB0cD1' // Replace with actual URL if available
        },
      ],
  },
  'суздаль': {
      'ресторан': [
        {
          name: 'Ресторан "Гостиный двор"',
          category: 'ресторан',
          location: { lat: 56.4190, lng: 40.4480 },
          description: 'Ресторан русской кухни в историческом здании Гостиного двора.',
          imageUrl: 'https://www.tripadvisor.ru/Restaurant_Review-g445049-d2345678-Reviews-Gostiny_Dvor_Restaurant-Suzdal_Suzdalsky_District_Vladimir_Oblast_Central_Russia.html', // Replace with actual image URL
          dateFounded: '2005',
          averagePrice: '1500-3000 ₽',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/mN1oP2q3R4s5T6u7' // Replace with actual URL if available
        },
        {
          name: 'Ресторан "Улей"',
          category: 'ресторан',
          location: { lat: 56.4200, lng: 40.4450 },
          description: 'Уютный ресторан с домашней русской кухней и медовухой.',
          imageUrl: 'https://uley-suzdal.ru/wp-content/uploads/2019/11/zal1-1.jpg',
          dateFounded: '2010',
          averagePrice: '1200-2500 ₽',
          rating: 4.4,
          googleMapsUrl: 'https://maps.app.goo.gl/X7yZ8aB0cD1eFg2' // Replace with actual URL if available
        },
      ],
      'кафе': [
        {
          name: 'Кафе "Русское подворье"',
          category: 'кафе',
          location: { lat: 56.4185, lng: 40.4475 },
          description: 'Кафе с традиционной русской кухней и блинами.',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/208986688.jpg?k=7c5e4a3d5f8b1c9a9a0d7e1f4e6d8c9b0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d&o=&hp=1',
          dateFounded: '2008',
          averagePrice: '500-1000 ₽',
          rating: 4.1,
          googleMapsUrl: 'https://maps.app.goo.gl/g2H3i4J5k6L7m8N9' // Replace with actual URL if available
        },
        {
          name: 'Кафе "Графин"',
          category: 'кафе',
          location: { lat: 56.4210, lng: 40.4460 },
          description: 'Стильное кафе с европейской кухней и кофейными напитками.',
          imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/c7/9e/d4/caption.jpg',
          dateFounded: '2015',
          averagePrice: '800-1500 ₽',
          rating: 4.2,
          googleMapsUrl: 'https://maps.app.goo.gl/P1qR2s3T4uV5w6X7' // Replace with actual URL if available
        },
      ],
       'отель': [
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
        {
          name: 'Арт-отель "Николаевский Посад"',
          category: 'отель',
          location: { lat: 56.4160, lng: 40.4400 },
          description: 'Отель с большой территорией, ресторанами, спа-центром и развлекательными программами.',
          imageUrl: 'https://nikolaevskyposad.ru/images/offers/offer-1/image-1.jpg',
          dateFounded: '2004',
          averagePrice: '7000-14000 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/Z8aB0cD1eFg2h3I4' // Replace with actual URL if available
        },
      ],
        'парк': [
         {
          name: 'Парк 950-летия Суздаля',
          category: 'парк',
          location: { lat: 56.4170, lng: 40.4490 },
          description: 'Городской парк с прогулочными аллеями и памятником.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Suzdal_-_Park_of_the_950th_Anniversary_-_Lenin_Monument.jpg/1200px-Suzdal_-_Park_of_the_950th_Anniversary_-_Lenin_Monument.jpg',
          dateFounded: '1974',
          averagePrice: 'Бесплатно',
          rating: 4.0,
          googleMapsUrl: 'https://maps.app.goo.gl/J5k6L7m8n9N0oP1q' // Replace with actual URL if available
        },
         {
          name: 'Ильинский луг',
          category: 'парк',
          location: { lat: 56.4150, lng: 40.4350 },
          description: 'Живописный луг на берегу реки Каменки с видом на Кремль.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Suzdal_-_Ilyinsky_Lug.jpg',
          dateFounded: 'Историческое место',
          averagePrice: 'Бесплатно',
          rating: 4.6,
          googleMapsUrl: 'https://maps.app.goo.gl/R2s3T4uV5w6X7yZ8' // Replace with actual URL if available
        },
      ],
  },
   'владимир': {
      'ресторан': [
        {
          name: 'Ресторан "Черная Утка"',
          category: 'ресторан',
          location: { lat: 56.1280, lng: 40.4050 },
          description: 'Ресторан с панорамным видом на город и европейской кухней.',
          imageUrl: 'https://blackduck33.ru/wp-content/uploads/2021/12/czernaya_utka_018.jpg',
          dateFounded: '2015',
          averagePrice: '1500-3000 ₽',
          rating: 4.4,
          googleMapsUrl: 'https://maps.app.goo.gl/k6L7m8N9oP1qR2s3' // Replace with actual URL if available
        },
        {
          name: 'Ресторан "Круча"',
          category: 'ресторан',
          location: { lat: 56.1350, lng: 40.4100 },
          description: 'Ресторан русской кухни с видом на Клязьму.',
          imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/a3/5f/c3/caption.jpg',
          dateFounded: '2018',
          averagePrice: '1200-2500 ₽',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/w6X7yZ8aB0cD1eFg' // Replace with actual URL if available
        },
      ],
      'кафе': [
        {
          name: 'Кафе "Блинчики"',
          category: 'кафе',
          location: { lat: 56.1290, lng: 40.4070 },
          description: 'Популярное кафе с большим выбором блинов и напитков.',
          imageUrl: 'https://avatars.mds.yandex.net/get-altay/402969/2a0000015b3495627c2c33e0750b19c752c0/XXL',
          dateFounded: '2005',
          averagePrice: '300-700 ₽',
          rating: 4.2,
          googleMapsUrl: 'https://maps.app.goo.gl/h3I4j5K6l7M8n9N0' // Replace with actual URL if available
        },
        {
          name: 'Кафе "Лосось и Кофе"',
          category: 'кафе',
          location: { lat: 56.1300, lng: 40.4080 },
          description: 'Современное кафе с акцентом на блюда из лосося и хороший кофе.',
          imageUrl: 'https://lososikofe.ru/upload/iblock/169/1696e4b44c19498983f18b09fa52a0e0.jpg',
          dateFounded: '2017',
          averagePrice: '800-1500 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/q1R2s3T4uV5w6X7y' // Replace with actual URL if available
        },
      ],
       'отель': [
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
        {
          name: 'Гостиница "Владимир"',
          category: 'отель',
          location: { lat: 56.1270, lng: 40.4060 },
          description: 'Крупная гостиница в центре города с различными категориями номеров.',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/53868271.jpg?k=1c1b9d4e4f5d1e5c7d0a9e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b&o=&hp=1',
          dateFounded: '1956',
          averagePrice: '4000-8000 ₽',
          rating: 3.8,
          googleMapsUrl: 'https://maps.app.goo.gl/Fg2h3I4j5K6l7M8n' // Replace with actual URL if available
        },
      ],
        'парк': [
         {
          name: 'Парк имени Пушкина',
          category: 'парк',
          location: { lat: 56.1285, lng: 40.4000 },
          description: 'Центральный городской парк с аттракционами, фонтаном и памятником Пушкину.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Vladimir_-_Pushkin_Park_-_Pushkin_Monument.jpg/1024px-Vladimir_-_Pushkin_Park_-_Pushkin_Monument.jpg',
          dateFounded: '1937',
          averagePrice: 'Бесплатно',
          rating: 4.4,
          googleMapsUrl: 'https://maps.app.goo.gl/N0oP1qR2s3T4uV5w' // Replace with actual URL if available
        },
         {
          name: 'Парк "Дружба"',
          category: 'парк',
          location: { lat: 56.1450, lng: 40.3800 },
          description: 'Большой парк с лесными массивами, прудом и спортивными площадками.',
          imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/1718877/pub_5e9ef86d4382aa14849d5d02_5e9ef8a0c028d70e304d7b25/scale_1200',
          dateFounded: '1959',
          averagePrice: 'Бесплатно',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/X7yZ8aB0cD1eFg2h' // Replace with actual URL if available
        },
      ],
  },
   'ярославль': {
      'ресторан': [
        {
          name: 'Ресторан "Собрание"',
          category: 'ресторан',
          location: { lat: 57.6200, lng: 39.8800 },
          description: 'Ресторан русской и европейской кухни в центре города.',
          imageUrl: 'https://sobranie-rest.ru/wp-content/uploads/2018/11/slider-4.jpg',
          dateFounded: '2010',
          averagePrice: '1500-3000 ₽',
          rating: 4.5,
          googleMapsUrl: 'https://maps.app.goo.gl/p1qR2s3T4uV5w6X7' // Replace with actual URL if available
        },
        {
          name: 'Ресторан "Ванильное небо"',
          category: 'ресторан',
          location: { lat: 57.6250, lng: 39.8900 },
          description: 'Ресторан с панорамным видом на Волгу и авторской кухней.',
          imageUrl: 'https://vanilnoenebo.ru/images/restoran/resto3.jpg',
          dateFounded: '2012',
          averagePrice: '2000-4000 ₽',
          rating: 4.6,
          googleMapsUrl: 'https://maps.app.goo.gl/yZ8aB0cD1eFg2h3I' // Replace with actual URL if available
        },
      ],
      'кафе': [
        {
          name: 'Кафе "АндерСон"',
          category: 'кафе',
          location: { lat: 57.6280, lng: 39.8850 },
          description: 'Семейное кафе сети "АндерСон" с детской комнатой и вкусными десертами.',
          imageUrl: 'https://avatars.mds.yandex.net/get-altay/1546427/2a00000169edf61d562e10e342ab824c254d/XXL',
          dateFounded: '2015',
          averagePrice: '800-1500 ₽',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/J5k6L7m8n9N0oP1q' // Replace with actual URL if available
        },
        {
          name: 'Кафе "Рога и копыта"',
          category: 'кафе',
          location: { lat: 57.6220, lng: 39.8820 },
          description: 'Кафе с тематическим интерьером по мотивам "Золотого теленка".',
          imageUrl: 'https://avatars.mds.yandex.net/get-altay/1871299/2a0000016a28e1e1a7a4f3a0e1a2a3e4c5d6/XXL',
          dateFounded: '2011',
          averagePrice: '700-1300 ₽',
          rating: 4.1,
          googleMapsUrl: 'https://maps.app.goo.gl/K6l7M8n9oP1qR2s3' // Replace with actual URL if available
        },
      ],
        'отель': [
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
        {
          name: 'Ринг Премьер Отель',
          category: 'отель',
          location: { lat: 57.6300, lng: 39.8600 },
          description: 'Отель бизнес-класса с конференц-залами, рестораном и спа-центром.',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/43483507.jpg?k=0f8e1c5d7b9a0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b&o=&hp=1',
          dateFounded: '2009',
          averagePrice: '7000-13000 ₽',
          rating: 4.4,
          googleMapsUrl: 'https://maps.app.goo.gl/w6X7yZ8aB0cD1eFg' // Replace with actual URL if available
        },
      ],
        'парк': [
         {
          name: 'Парк на Стрелке',
          category: 'парк',
          location: { lat: 57.6190, lng: 39.8980 },
          description: 'Парк на месте слияния Волги и Которосли с памятником 1000-летия Ярославля.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Yaroslavl_-_Strelka_Park_-_1000th_Anniversary_Monument.jpg/1024px-Yaroslavl_-_Strelka_Park_-_1000th_Anniversary_Monument.jpg',
          dateFounded: '2010',
          averagePrice: 'Бесплатно',
          rating: 4.7,
          googleMapsUrl: 'https://maps.app.goo.gl/h3I4j5K6l7M8n9N0' // Replace with actual URL if available
        },
         {
          name: 'Даманский остров',
          category: 'парк',
          location: { lat: 57.6270, lng: 39.8930 },
          description: 'Парк аттракционов и отдыха на острове в центре города.',
          imageUrl: 'https://xn--76aakico7bu.xn--p1ai/media/kfgd/ver/fill-1920x1080/0/damansky-park-yaroslavl-6.jpg',
          dateFounded: '1960-е',
          averagePrice: 'Бесплатно (аттракционы платно)',
          rating: 4.3,
          googleMapsUrl: 'https://maps.app.goo.gl/q1R2s3T4uV5w6X7y' // Replace with actual URL if available
        },
      ],
  },
  'кострома': {
        'ресторан': [
        {
            name: 'Ресторан "Старая пристань"',
            category: 'ресторан',
            location: { lat: 57.7620, lng: 40.9250 },
            description: 'Ресторан на берегу Волги с рыбными блюдами и летней верандой.',
            imageUrl: 'https://oldpier.ru/wp-content/uploads/2019/03/IMG_0959.jpg',
            dateFounded: '2008',
            averagePrice: '1500-3000 ₽',
            rating: 4.4,
            googleMapsUrl: 'https://maps.app.goo.gl/M8n9N0oP1qR2s3T4' // Replace with actual URL if available
        },
        {
            name: 'Ресторан "Сыровар"',
            category: 'ресторан',
            location: { lat: 57.7670, lng: 40.9270 },
            description: 'Ресторан при сыроварне, предлагающий блюда с местными сырами.',
            imageUrl: 'https://syrovar.com/wp-content/uploads/2020/07/01-scaled.jpg',
            dateFounded: '2016',
            averagePrice: '1200-2500 ₽',
            rating: 4.5,
            googleMapsUrl: 'https://maps.app.goo.gl/w6X7yZ8aB0cD1eFg' // Replace with actual URL if available
        },
        ],
        'кафе': [
        {
            name: 'Кафе "Самовар"',
            category: 'кафе',
            location: { lat: 57.7680, lng: 40.9280 },
            description: 'Уютное кафе с традиционной русской кухней и самоваром.',
            imageUrl: 'https://avatars.mds.yandex.net/get-altay/1680676/2a0000016df29f8f8b0c4e3f5e6f7a8b9a0c/XXL',
            dateFounded: '2010',
            averagePrice: '500-1000 ₽',
            rating: 4.2,
            googleMapsUrl: 'https://maps.app.goo.gl/h3I4j5K6l7M8n9N0' // Replace with actual URL if available
        },
        {
            name: 'Кафе "Рога и копыта"',
            category: 'кафе',
            location: { lat: 57.7665, lng: 40.9265 },
            description: 'Кафе с тематическим интерьером по мотивам "Золотого теленка".',
            imageUrl: 'https://avatars.mds.yandex.net/get-altay/1871299/2a0000016a28e1e1a7a4f3a0e1a2a3e4c5d6/XXL', // Same as Yaroslavl for example
            dateFounded: '2012',
            averagePrice: '700-1300 ₽',
            rating: 4.1,
            googleMapsUrl: 'https://maps.app.goo.gl/q1R2s3T4uV5w6X7y' // Replace with actual URL if available
        },
        ],
        'отель': [
        {
            name: 'Отель "Островский причал"',
            category: 'отель',
            location: { lat: 57.7630, lng: 40.9240 },
            description: 'Современный отель на набережной Волги.',
            imageUrl: 'https://ostrovskyprichal.ru/wp-content/uploads/2022/01/photo_2021-10-06_12-50-13-1024x768.jpg',
            dateFounded: '2015',
            averagePrice: '5000-9000 ₽',
            rating: 4.3,
            googleMapsUrl: 'https://maps.app.goo.gl/Fg2h3I4j5K6l7M8n' // Replace with actual URL if available
        },
        {
            name: 'Гостиница "Волга"',
            category: 'отель',
            location: { lat: 57.7690, lng: 40.9300 },
            description: 'Крупная гостиница в центре города с видом на Волгу.',
            imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/64109187.jpg?k=e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9&o=&hp=1',
            dateFounded: '1965',
            averagePrice: '3000-6000 ₽',
            rating: 3.7,
            googleMapsUrl: 'https://maps.app.goo.gl/N0oP1qR2s3T4uV5w' // Replace with actual URL if available
        },
        ],
         'парк': [
         {
            name: 'Центральный парк',
            category: 'парк',
            location: { lat: 57.7675, lng: 40.9290 },
            description: 'Главный парк Костромы с аттракционами и фонтаном.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Kostroma_-_Central_Park_-_Lenin_Monument.jpg/1024px-Kostroma_-_Central_Park_-_Lenin_Monument.jpg',
            dateFounded: '19 век',
            averagePrice: 'Бесплатно',
            rating: 4.1,
            googleMapsUrl: 'https://maps.app.goo.gl/X7yZ8aB0cD1eFg2h' // Replace with actual URL if available
        },
         {
            name: 'Парк "Берендеевка"',
            category: 'парк',
            location: { lat: 57.7850, lng: 40.9500 },
            description: 'Лесопарк с прудами, зоопарком и дендрарием.',
            imageUrl: 'https://kostromka.ru/photo/zontikov/kostroma/berendeika/01.jpg',
            dateFounded: '1970-е',
            averagePrice: 'Бесплатно',
            rating: 4.4,
            googleMapsUrl: 'https://maps.app.goo.gl/yZ8aB0cD1eFg2h3I' // Replace with actual URL if available
        },
      ],
    },
     'ростов великий': {
        'ресторан': [
        {
            name: 'Ресторан "Щучий двор"',
            category: 'ресторан',
            location: { lat: 57.1840, lng: 39.4150 },
            description: 'Ресторан при гостинице с блюдами из местной рыбы.',
            imageUrl: 'https://shuchiy-dvor.ru/wp-content/uploads/2022/08/shuchij-dvor-restoran-rostov-velikij-01-scaled.jpg',
            dateFounded: '2005',
            averagePrice: '1000-2000 ₽',
            rating: 4.2,
            googleMapsUrl: 'https://maps.app.goo.gl/k6L7m8N9oP1qR2s3' // Replace with actual URL if available
        },
        {
            name: 'Трактир "Алеша Попович"',
            category: 'ресторан',
            location: { lat: 57.1850, lng: 39.4160 },
            description: 'Ресторан русской кухни с тематическим интерьером.',
            imageUrl: 'https://rostov-kremlin.ru/wp-content/uploads/2019/06/DSC_0488.jpg',
            dateFounded: '2008',
            averagePrice: '800-1500 ₽',
            rating: 4.0,
            googleMapsUrl: 'https://maps.app.goo.gl/w6X7yZ8aB0cD1eFg' // Replace with actual URL if available
        },
        ],
        'кафе': [
        {
            name: 'Кафе "Погребок"',
            category: 'кафе',
            location: { lat: 57.1860, lng: 39.4170 },
            description: 'Небольшое кафе с домашней кухней в центре города.',
            imageUrl: 'https://avatars.mds.yandex.net/get-altay/4465478/2a000001789c079a0c9d1e2f3a4b5c6d/XXL',
            dateFounded: '2010',
            averagePrice: '400-800 ₽',
            rating: 3.9,
            googleMapsUrl: 'https://maps.app.goo.gl/h3I4j5K6l7M8n9N0' // Replace with actual URL if available
        },
        {
            name: 'Кафе "Лукова слобода"',
            category: 'кафе',
            location: { lat: 57.1900, lng: 39.4200 },
            description: 'Кафе с блюдами из ростовского лука.',
            imageUrl: 'https://lukovasloboda.ru/wp-content/uploads/2021/01/lukova-sloboda-kafe-1.jpg',
            dateFounded: '2012',
            averagePrice: '500-1000 ₽',
            rating: 4.1,
            googleMapsUrl: 'https://maps.app.goo.gl/q1R2s3T4uV5w6X7y' // Replace with actual URL if available
        },
        ],
         'отель': [
        {
            name: 'Гостиница "Московский тракт"',
            category: 'отель',
            location: { lat: 57.1830, lng: 39.4140 },
            description: 'Гостиница в историческом здании недалеко от Кремля.',
            imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/179857385.jpg?k=8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b&o=&hp=1',
            dateFounded: '19 век (здание)',
            averagePrice: '3000-6000 ₽',
            rating: 3.8,
            googleMapsUrl: 'https://maps.app.goo.gl/Fg2h3I4j5K6l7M8n' // Replace with actual URL if available
        },
        {
            name: 'Гостевой дом "Русское подворье"',
            category: 'отель',
            location: { lat: 57.1870, lng: 39.4180 },
            description: 'Уютный гостевой дом в традиционном русском стиле.',
            imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/208986688.jpg?k=7c5e4a3d5f8b1c9a9a0d7e1f4e6d8c9b0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d&o=&hp=1', // Same as cafe for example
            dateFounded: '2008',
            averagePrice: '4000-7000 ₽',
            rating: 4.0,
            googleMapsUrl: 'https://maps.app.goo.gl/N0oP1qR2s3T4uV5w' // Replace with actual URL if available
        },
        ],
         'парк': [
         {
            name: 'Городской сад',
            category: 'парк',
            location: { lat: 57.1855, lng: 39.4165 },
            description: 'Небольшой парк в центре города с видом на озеро Неро.',
            imageUrl: 'https://rostov-gorod.ru/upload/iblock/8e7/8e7f9a0b1c2d3e4f5a6b7c8d9e0f1a2b.jpg',
            dateFounded: '19 век',
            averagePrice: 'Бесплатно',
            rating: 4.0,
            googleMapsUrl: 'https://maps.app.goo.gl/X7yZ8aB0cD1eFg2h' // Replace with actual URL if available
        },
         {
            name: 'Набережная озера Неро',
            category: 'парк',
            location: { lat: 57.1820, lng: 39.4100 },
            description: 'Прогулочная зона вдоль берега озера Неро.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rostov_-_Lake_Nero_embankment.jpg/1200px-Rostov_-_Lake_Nero_embankment.jpg',
            dateFounded: 'Неприменимо',
            averagePrice: 'Бесплатно',
            rating: 4.3,
            googleMapsUrl: 'https://maps.app.goo.gl/yZ8aB0cD1eFg2h3I' // Replace with actual URL if available
        },
      ],
    },
     'сергиев посад': {
        'ресторан': [
        {
            name: 'Ресторан "Русский дворик"',
            category: 'ресторан',
            location: { lat: 56.3090, lng: 38.1310 },
            description: 'Ресторан русской кухни рядом с Троице-Сергиевой Лаврой.',
            imageUrl: 'https://russky-dvorik.ru/wp-content/uploads/2021/10/rd_resto_0003.jpg',
            dateFounded: '2000-е',
            averagePrice: '1500-3000 ₽',
            rating: 4.3,
            googleMapsUrl: 'https://maps.app.goo.gl/k6L7m8N9oP1qR2s3' // Replace with actual URL if available
        },
        {
            name: 'Ресторан "Гостевая изба"',
            category: 'ресторан',
            location: { lat: 56.3100, lng: 38.1320 },
            description: 'Ресторан с традиционным русским интерьером и кухней.',
            imageUrl: 'https://gostevaya-izba.ru/wp-content/uploads/2019/04/gostevaya-izba-restoran-01.jpg',
            dateFounded: '2010-е',
            averagePrice: '1200-2500 ₽',
            rating: 4.2,
            googleMapsUrl: 'https://maps.app.goo.gl/w6X7yZ8aB0cD1eFg' // Replace with actual URL if available
        },
        ],
        'кафе': [
        {
            name: 'Кафе "Сергиев Канон"',
            category: 'кафе',
            location: { lat: 56.3110, lng: 38.1330 },
            description: 'Кафе-трапезная при Лавре с постными и скоромными блюдами.',
            imageUrl: 'https://sergievkanon.ru/images/interiors/P5214198.JPG',
            dateFounded: 'Неизвестно',
            averagePrice: '400-800 ₽',
            rating: 4.0,
            googleMapsUrl: 'https://maps.app.goo.gl/h3I4j5K6l7M8n9N0' // Replace with actual URL if available
        },
        {
            name: 'Кафе "Ландау"',
            category: 'кафе',
            location: { lat: 56.3120, lng: 38.1340 },
            description: 'Современное кафе с европейской кухней и десертами.',
            imageUrl: 'https://landaucafe.ru/wp-content/uploads/2022/04/landau_interier_003.jpg',
            dateFounded: '2018',
            averagePrice: '700-1400 ₽',
            rating: 4.4,
            googleMapsUrl: 'https://maps.app.goo.gl/q1R2s3T4uV5w6X7y' // Replace with actual URL if available
        },
        ],
         'отель': [
        {
            name: 'Гостиница "Царская деревня"',
            category: 'отель',
            location: { lat: 56.3080, lng: 38.1300 },
            description: 'Гостиничный комплекс в русском стиле рядом с Лаврой.',
            imageUrl: 'https://tsarskayaderevnya.ru/wp-content/uploads/2020/01/Czarskaya-derevnya-001-scaled.jpg',
            dateFounded: '2000-е',
            averagePrice: '5000-9000 ₽',
            rating: 4.1,
            googleMapsUrl: 'https://maps.app.goo.gl/Fg2h3I4j5K6l7M8n' // Replace with actual URL if available
        },
        {
            name: 'Отель "Посадский"',
            category: 'отель',
            location: { lat: 56.3130, lng: 38.1350 },
            description: 'Современный отель в центре города.',
            imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/206311456.jpg?k=f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1&o=&hp=1',
            dateFounded: '2015',
            averagePrice: '4000-7000 ₽',
            rating: 4.0,
            googleMapsUrl: 'https://maps.app.goo.gl/N0oP1qR2s3T4uV5w' // Replace with actual URL if available
        },
        ],
         'парк': [
         {
            name: 'Парк "Скитские пруды"',
            category: 'парк',
            location: { lat: 56.2950, lng: 38.1450 },
            description: 'Живописный парк с прудами, набережной и зонами отдыха.',
            imageUrl: 'https://media.vdnh.ru/images/content/1b3/021/1b30211979ae8b173fa7219649370586.jpg',
            dateFounded: 'Неизвестно',
            averagePrice: 'Бесплатно',
            rating: 4.5,
            googleMapsUrl: 'https://maps.app.goo.gl/X7yZ8aB0cD1eFg2h' // Replace with actual URL if available
        },
         {
            name: 'Келарский пруд',
            category: 'парк',
            location: { lat: 56.3115, lng: 38.1290 },
            description: 'Пруд рядом с Лаврой, популярное место для прогулок.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sergiyev_Posad_-_Kelarsky_Pond.jpg/1200px-Sergiyev_Posad_-_Kelarsky_Pond.jpg',
            dateFounded: 'Историческое место',
            averagePrice: 'Бесплатно',
            rating: 4.2,
            googleMapsUrl: 'https://maps.app.goo.gl/yZ8aB0cD1eFg2h3I' // Replace with actual URL if available
        },
      ],
    },

};

/**
 * Асинхронно извлекает список мест для данного города и категории.
 *
 * @param city Город для поиска мест.
 * @param category Категория мест для извлечения.
 * @returns Promise, который разрешается в массив объектов Place.
 */
export async function getPlaces(city: string, category: string): Promise<Place[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const cityData = mockDatabase[city.toLowerCase()];
  if (cityData) {
    const categoryData = cityData[category.toLowerCase()];
    if (categoryData) {
      return categoryData;
    }
  }

  // Return empty array if city or category not found
  return [];
}

