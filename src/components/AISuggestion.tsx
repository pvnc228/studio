"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { suggestPlace } from "@/ai/flows/AISuggestionFlow";
import { Place } from "@/services/places";

export const AISuggestion = () => {
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [suggestedPlaces, setSuggestedPlaces] = useState<Place[]>([]);

  const cities = [
    'Moscow',
    'St. Petersburg',
    'Suzdal',
    'Vladimir',
    'Yaroslavl',
    'Kostroma',
    'Rostov Veliky',
    'Sergiev Posad'
  ];

  const categories = [
    'Restaurant',
    'Cafe',
    'Bar',
    'Movie Theater',
    'Theater',
    'Hotel',
    'Park',
  ];

  const handleSuggestion = async () => {
    if (!city || !description || !category) {
      alert('Please select a city, enter a description, and select a category.');
      return;
    }

    try {
      const places = await suggestPlace({ city: city.toLowerCase(), description, category: category.toLowerCase() });
      setSuggestedPlaces(places);
    } catch (error) {
      console.error("Error suggesting places:", error);
      alert('Failed to get place suggestions. Please try again.');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">AI Place Suggestion</h2>

        <Label htmlFor="city">City</Label>
        <Select onValueChange={setCity}>
          <SelectTrigger id="city">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((ct) => (
              <SelectItem key={ct} value={ct.toLowerCase()}>
                {ct}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase()}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Describe the place you're looking for"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleSuggestion}>Suggest Places</Button>

        {suggestedPlaces.length > 0 && (
          <div className="mt-4">
            <h3>Suggested Places:</h3>
            <ul>
              {suggestedPlaces.map((place) => (
                <li key={place.name}>
                  {place.name} ({place.category}) - {place.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

    