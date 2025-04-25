'use server';
/**
 * @fileOverview An AI agent that suggests places based on a textual description.
 *
 * - suggestPlaceFromDescription - A function that handles the place suggestion process.
 * - SuggestPlaceFromDescriptionInput - The input type for the suggestPlaceFromDescription function.
 * - SuggestPlaceFromDescriptionOutput - The return type for the suggestPlaceFromDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getPlaces, Place} from '@/services/places';

const SuggestPlaceFromDescriptionInputSchema = z.object({
  city: z.string().describe('The city to search for places in.'),
  description: z.string().describe('The description of the desired place.'),
  category: z.string().describe('The category of the place (e.g., restaurant, cafe, hotel).'),
});
export type SuggestPlaceFromDescriptionInput = z.infer<typeof SuggestPlaceFromDescriptionInputSchema>;

const SuggestPlaceFromDescriptionOutputSchema = z.array(z.object({
  name: z.string().describe('The name of the place.'),
  category: z.string().describe('The category of the place (e.g., restaurant, cafe, hotel).'),
  location: z.object({
    lat: z.number().describe('The latitude of the location.'),
    lng: z.number().describe('The longitude of the location.'),
  }).describe('The location of the place.'),
  description: z.string().describe('A short description of the place.'),
  imageUrl: z.string().describe('URL of an image for the place'),
})).describe('A list of suggested places.');


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
      places: z.array(z.object({
        name: z.string().describe('The name of the place.'),
        category: z.string().describe('The category of the place (e.g., restaurant, cafe, hotel).'),
        location: z.object({
          lat: z.number().describe('The latitude of the location.'),
          lng: z.number().describe('The longitude of the location.'),
        }).describe('The location of the place.'),
        description: z.string().describe('A short description of the place.'),
        imageUrl: z.string().describe('URL of an image for the place'),
      })).describe('A list of places to consider.'),
    }),
  },
  output: {
    schema: z.array(z.object({
      name: z.string().describe('The name of the place.'),
      category: z.string().describe('The category of the place (e.g., restaurant, cafe, hotel).'),
      location: z.object({
        lat: z.number().describe('The latitude of the location.'),
        lng: z.number().describe('The longitude of the location.'),
      }).describe('The location of the place.'),
      description: z.string().describe('A short description of the place.'),
      imageUrl: z.string().describe('URL of an image for the place'),
    })).describe('A list of suggested places.'),
  },
  prompt: `You are a helpful AI assistant that suggests places based on a user's description.

The user is looking for a place in {{city}} with the following description: {{description}}.
The category of the place is {{category}}.

Here is a list of places in that city and category:

{{#each places}}
- Name: {{name}}, Description: {{description}}
{{/each}}

Based on the user's description, suggest the places that best match their needs.

Return a JSON array of places that match the description.  Do not include any other text in your response.
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
  const {output} = await prompt({...input, places});
  return output!;
});
