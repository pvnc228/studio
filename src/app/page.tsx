"use client";

import {CategorySelection} from '@/components/CategorySelection';
import {CitySelection} from '@/components/CitySelection';
import {RouteDisplay} from '@/components/RouteDisplay';
import {AISuggestion} from '@/components/AISuggestion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useState, useEffect, useCallback} from 'react';
import {Place} from '@/services/places';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {cn} from '@/lib/utils';
import {Settings} from 'lucide-react';

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handlePlacesUpdate = (newPlaces: Place[]) => {
    setPlaces(newPlaces);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
    } else {
      setTheme('light');
    }

    // Apply the initial theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  useEffect(() => {
    // Update the theme in local storage whenever it changes
    localStorage.setItem('theme', theme);

    // Apply the theme to the document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <div className="container mx-auto p-4 transition-all duration-300">
      <Card className="w-full max-w-4xl mx-auto shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="space-y-0.5">
            <CardTitle className="text-2xl font-semibold text-center md:text-left">
              ✨ RouteWise: Планируйте Своё Идеальное Путешествие ✨
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center md:text-left">
              Откройте для себя персонализированные маршруты по самым красивым
              городам России.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M3 12h1M20 12h1M6.3 6.3l.7-.7M17.7 17.7l.7-.7M12 3v1M12 20v1M17.7 6.3l-.7-.7M6.3 17.7l-.7-.7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon"
                >
                  <path d="M12 3a6.364 6.364 0 0 0-9 9 9 9 0 1 0 9-9Z" />
                </svg>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
