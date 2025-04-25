
"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CategorySelection = () => {
  const [category, setCategory] = useState('');

  const categories = [
    'Restaurant',
    'Cafe',
    'Bar',
    'Movie Theater',
    'Theater',
    'Hotel',
    'Park',
  ];

  return (
    <div>
      <Label htmlFor="category">Select Category</Label>
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
      {category && <p className="mt-2">Selected category: {category}</p>}
    </div>
  );
};
