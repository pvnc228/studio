"use client";

import { CategorySelection } from '@/components/CategorySelection';
import { CitySelection } from '@/components/CitySelection';
import { RouteDisplay } from '@/components/RouteDisplay';
import { AISuggestion } from '@/components/AISuggestion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Place } from '@/services/places';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);

  const handlePlacesUpdate = (newPlaces: Place[]) => {
    setPlaces(newPlaces);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="space-y-0.5">
            <CardTitle className="text-2xl font-semibold text-center md:text-left">
              ✨ RouteWise: Планируйте Своё Идеальное Путешествие ✨
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center md:text-left">
              Откройте для себя персонализированные маршруты по самым красивым городам России.
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Настройки</DropdownMenuItem>
              <DropdownMenuItem>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="manual" className="space-y-4">
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
