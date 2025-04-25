"use client";

import { CategorySelection } from '@/components/CategorySelection';
import { CitySelection } from '@/components/CitySelection';
import { RouteDisplay } from '@/components/RouteDisplay';
import { AISuggestion } from '@/components/AISuggestion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Place } from '@/services/places';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);

  const handlePlacesUpdate = (newPlaces: Place[]) => {
    setPlaces(newPlaces);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            ✨ RouteWise: Планируйте Своё Идеальное Путешествие ✨
          </CardTitle>
          <CardDescription className="text-center">
            Откройте для себя персонализированные маршруты по самым красивым городам России.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="manual">
            <TabsList>
              <TabsTrigger value="manual">Ручной Подбор</TabsTrigger>
              <TabsTrigger value="ai">AI Подбор</TabsTrigger>
            </TabsList>
            <TabsContent value="manual" className="space-y-4">
              <CitySelection onPlacesUpdate={handlePlacesUpdate} />
            </TabsContent>
            <TabsContent value="ai" className="space-y-4">
              <AISuggestion onPlacesUpdate={handlePlacesUpdate} />
            </TabsContent>
          </Tabs>
          <RouteDisplay places={places} />
        </CardContent>
      </Card>
    </div>
  );
}

