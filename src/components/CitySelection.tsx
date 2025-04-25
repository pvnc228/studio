
"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CitySelection = () => {
  const [city, setCity] = useState('');

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

  return (
    <div>
      <Label htmlFor="city">Select City</Label>
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
      {city && <p className="mt-2">Selected city: {city}</p>}
    </div>
  );
};
