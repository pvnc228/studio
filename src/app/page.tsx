
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
            ✨ RouteWise: Plan Your Perfect Trip ✨
          </CardTitle>
          <CardDescription className="text-center">
            Discover personalized routes in Russia's most beautiful cities.
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


    