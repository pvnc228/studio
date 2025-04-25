"use client";

import { CategorySelection } from '@/components/CategorySelection';
import { CitySelection } from '@/components/CitySelection';
import { RouteDisplay } from '@/components/RouteDisplay';
import { AISuggestion } from '@/components/AISuggestion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
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
          <CitySelection />
          <CategorySelection />
          <AISuggestion />
          <RouteDisplay />
        </CardContent>
      </Card>
    </div>
  );
}
