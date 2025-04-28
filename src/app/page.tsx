"use client";

import { CategorySelection } from '@/components/CategorySelection';
import { CitySelection } from '@/components/CitySelection';
import { RouteDisplay } from '@/components/RouteDisplay';
import { AISuggestion } from '@/components/AISuggestion';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { UserProfilePage } from '@/components/UserProfilePage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect, useCallback } from 'react';
import { Place } from '@/services/places';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';
import { UserProfileProvider, useUserProfile } from '@/context/UserProfileContext';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme === 'dark' ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
      className="transition-transform duration-300 ease-in-out hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}

function ProfileMenu() {
  const { userProfile } = useUserProfile();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getInitials = () => {
    const firstInitial = userProfile?.firstName?.[0] ?? '';
    const lastInitial = userProfile?.lastName?.[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '??';
  };

  return (
    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Профиль пользователя</DialogTitle>
        </DialogHeader>
        <UserProfilePage />
      </DialogContent>
    </Dialog>
  );
}

function MainPageContent() {
  const { userProfile, isFirstLogin, setIsFirstLogin } = useUserProfile();
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeTab, setActiveTab] = useState('manual');

  const handlePlacesUpdate = (newPlaces: Place[]) => {
    setPlaces(newPlaces);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsFirstLogin(false); // Сбрасываем флаг после выбора вкладки
  };

  // Показываем WelcomeScreen, если это первый вход после логина
  if (isFirstLogin) {
    return <WelcomeScreen onTabChange={handleTabChange} />;
  }

  // Если пользователь не авторизован или у него нет имени, также показываем WelcomeScreen
  const isNewUser = !userProfile?.firstName;

  if (isNewUser) {
    return <WelcomeScreen onTabChange={handleTabChange} />;
  }

  return (
    <div className="container mx-auto p-4 transition-all duration-500 ease-in-out">
      <Card className="w-full max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden border border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 bg-card border-b border-border">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              ✨ RouteWise: Ваше Путешествие ✨
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Здравствуйте, {userProfile?.firstName}! Готовы к новым открытиям?
            </CardDescription>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <ProfileMenu />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="relative"
          >
            <div className="flex justify-center mb-4">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-muted p-1.5 text-muted-foreground">
                <TabsTrigger
                  value="manual"
                  className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md'
                  )}
                >
                  Ручной Подбор
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md'
                  )}
                >
                  AI Подбор
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="overflow-hidden relative min-h-[300px]">
              <TabsContent
                value="manual"
                className={cn(
                  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 absolute w-full transition-transform duration-500 ease-in-out',
                  activeTab === 'manual' ? 'translate-x-0' : '-translate-x-full'
                )}
              >
                <CitySelection onPlacesUpdate={handlePlacesUpdate} />
              </TabsContent>
              <TabsContent
                value="ai"
                className={cn(
                  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 absolute w-full transition-transform duration-500 ease-in-out',
                  activeTab === 'ai' ? 'translate-x-0' : 'translate-x-full'
                )}
              >
                <AISuggestion onPlacesUpdate={handlePlacesUpdate} />
              </TabsContent>
            </div>
          </Tabs>
          <RouteDisplay places={places} />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <UserProfileProvider>
      <MainPageContent />
    </UserProfileProvider>
  );
}