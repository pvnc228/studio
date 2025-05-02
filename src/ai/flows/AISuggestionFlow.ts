// AISuggestionFlow.ts
'use server';

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const SuggestPlaceInputSchema = z.object({
  city: z.string().describe('The city to search for places in.'),
  description: z.string().describe('The description of the desired place.'),
});
export type SuggestPlaceInput = z.infer<typeof SuggestPlaceInputSchema>;

const SuggestPlaceOutputSchema = z.array(z.object({
  name: z.string().describe('The name of the place.'),
  category: z.string().describe('The category of the place.'),
  description: z.string().describe('A short description of the place.'),
  imageUrl: z.string().describe('URL of an image for the place'),
})).describe('A list of suggested places.');

export type SuggestPlaceOutput = z.infer<typeof SuggestPlaceOutputSchema>;

export async function suggestPlace(input: SuggestPlaceInput): Promise<SuggestPlaceOutput> {
  return suggestPlaceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPlacePrompt',
  input: {
    schema: z.object({
      city: z.string().describe('The city to search for places in.'),
      description: z.string().describe('The description of the desired place.'),
    }),
  },
  output: {
    schema: SuggestPlaceOutputSchema,
  },
  prompt: `You are a helpful AI assistant that suggests places based on a user's description.

The user is looking for a place in {{city}} with the following description: "{{description}}".

Based on the user's description, suggest places that best match their needs.

Return a JSON array of places that match the description. Do not include any other text in your response.
`,
});

const suggestPlaceFlow = ai.defineFlow<
  typeof SuggestPlaceInputSchema,
  typeof SuggestPlaceOutputSchema
>({
  name: 'suggestPlaceFlow',
  inputSchema: SuggestPlaceInputSchema,
  outputSchema: SuggestPlaceOutputSchema,
}, async (input) => {
  const { output } = await prompt(input);
  return output!;
});
