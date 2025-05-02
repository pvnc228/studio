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
          description: z.string(),
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

Вот список мест в этом городе:

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
  const places = await getPlacesByCity(input.city); // Теперь без категории
  const { output } = await prompt({ ...input, places });
  return output!;
});