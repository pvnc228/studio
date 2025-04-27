'use server';
import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import { getPlaces, Place } from '@/services/places';

const SuggestPlaceFromDescriptionInputSchema = z.object({
  city: z.string().describe('The city to search for places in.'),
  description: z.string().describe('The description of the desired place.'),
  category: z.string().describe('The category of the place (e.g., restaurant, cafe, hotel).'),
});
export type SuggestPlaceFromDescriptionInput = z.infer<typeof SuggestPlaceFromDescriptionInputSchema>;

const SuggestPlaceFromDescriptionOutputSchema = z.array(
  z.object({
    id: z.number().describe('The ID of the place.'),
    name: z.string().describe('The name of the place.'),
    category: z.string().describe('The category name of the place.'),
    cityId: z.number().describe('The city ID of the place.'),
    description: z.string().describe('A short description of the place.'),
    imageUrl: z.string().describe('URL of an image for the place.'),
    dateFounded: z.string().nullable().describe('The founding date of the place.'),
    averagePrice: z.string().nullable().describe('The average price at the place.'),
    rating: z.number().nullable().describe('The rating of the place.'),
    mapUrl: z.string().nullable().describe('Map URL of the place.'), // Заменяем googleMapsUrl на mapUrl
  })
).describe('A list of suggested places.');

export type SuggestPlaceFromDescriptionOutput = z.infer<typeof SuggestPlaceFromDescriptionOutputSchema>;

export async function suggestPlaceFromDescription(input: SuggestPlaceFromDescriptionInput): Promise<SuggestPlaceFromDescriptionOutput> {
  return suggestPlaceFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPlaceFromDescriptionPrompt',
  input: {
    schema: z.object({
      city: z.string().describe('The city to search for places in.'),
      description: z.string().describe('The description of the desired place.'),
      category: z.string().describe('The category of the place (e.g., restaurant, cafe, hotel).'),
      places: z.array(
        z.object({
          id: z.number().describe('The ID of the place.'),
          name: z.string().describe('The name of the place.'),
          category: z.string().describe('The category name of the place.'),
          cityId: z.number().describe('The city ID of the place.'),
          description: z.string().describe('A short description of the place.'),
          imageUrl: z.string().describe('URL of an image for the place.'),
          dateFounded: z.string().nullable().describe('The founding date of the place.'),
          averagePrice: z.string().nullable().describe('The average price at the place.'),
          rating: z.number().nullable().describe('The rating of the place.'),
          mapUrl: z.string().nullable().describe('Map URL of the place.'), // Заменяем googleMapsUrl на mapUrl
        })
      ).describe('A list of places to consider.'),
    }),
  },
  output: {
    schema: SuggestPlaceFromDescriptionOutputSchema,
  },
  prompt: `Ты - полезный AI-помощник, который предлагает места на основе описания пользователя.

Пользователь ищет место в городе {{city}} со следующим описанием: {{description}}.
Категория места - {{category}}.

Вот список мест в этом городе и категории:

{{#each places}}
- Название: {{name}}, Описание: {{description}}, Средняя цена: {{averagePrice}}, Рейтинг: {{rating}}
{{/each}}

Основываясь на описании пользователя, предложите места, которые лучше всего соответствуют их потребностям.

Верните JSON-массив мест, которые соответствуют описанию. Не включайте никакой другой текст в свой ответ.
`,
});

const suggestPlaceFromDescriptionFlow = ai.defineFlow<
  typeof SuggestPlaceFromDescriptionInputSchema,
  typeof SuggestPlaceFromDescriptionOutputSchema
>({
  name: 'suggestPlaceFromDescriptionFlow',
  inputSchema: SuggestPlaceFromDescriptionInputSchema,
  outputSchema: SuggestPlaceFromDescriptionOutputSchema,
}, async (input) => {
  const places = await getPlaces(input.city, input.category);
  const { output } = await prompt({ ...input, places });
  return output!;
});