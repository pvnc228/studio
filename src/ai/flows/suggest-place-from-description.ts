'use server';
import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import { getPlacesByCity } from '@/services/places';

const SuggestPlaceFromDescriptionInputSchema = z.object({
  city: z.string().describe('The city to search for places in.'),
  description: z.string().describe('The description of the desired place.'),
});
export type SuggestPlaceFromDescriptionInput = z.infer<typeof SuggestPlaceFromDescriptionInputSchema>;

const SuggestPlaceFromDescriptionOutputSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    cityId: z.number(),
    description: z.string(),
    extendedDescription: z.string(),
    imageUrl: z.string(),
    dateFounded: z.string().nullable(),
    averagePrice: z.string().nullable(),
    rating: z.number().nullable(),
    mapsUrl: z.string().nullable(),
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
      city: z.string(),
      description: z.string(),
      places: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          category: z.string(),
          cityId: z.number(),
          description: z.string(),
          extendedDescription: z.string(),
          imageUrl: z.string(),
          dateFounded: z.string().nullable(),
          averagePrice: z.string().nullable(),
          rating: z.number().nullable(),
          mapsUrl: z.string().nullable(),
        })
      ),
    }),
  },
  output: {
    schema: SuggestPlaceFromDescriptionOutputSchema,
  },
  prompt: `Ты - полезный AI-помощник, который предлагает места на основе описания пользователя.

Пользователь ищет место в городе {{city}} со следующим описанием: "{{description}}".

Вот список мест в этом городе с их расширенными описаниями:

{{#each places}}
- Название: {{name}}, Категория: {{category}}, Расширенное описание: {{extendedDescription}}, Средняя цена: {{averagePrice}}, Рейтинг: {{rating}}
{{/each}}

Основываясь на описании пользователя, предложи **массив мест**, которые лучше всего соответствуют их потребностям. Учитывай **только расширенное описание (extendedDescription)** при выборе.

Верни JSON-массив объектов с данными этих мест, включая все поля: id, name, category, cityId, description, extendedDescription, imageUrl, dateFounded, averagePrice, rating, mapsUrl.

Не включай никакой другой текст в свой ответ.
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
  const places = await getPlacesByCity(input.city);
  const mappedPlaces = places.map(place => ({
    id: place.id,
    name: place.name,
    category: place.category,
    cityId: place.cityId,
    description: place.description,
    extendedDescription: place.extendedDescription || 'No extended description available',
    imageUrl: place.imageUrl,
    dateFounded: place.dateFounded,
    averagePrice: place.averagePrice,
    rating: place.rating,
    mapsUrl: place.mapsUrl,
  }));
  const { output } = await prompt({ ...input, places: mappedPlaces });
  return output!;
});