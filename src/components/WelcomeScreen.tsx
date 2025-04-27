"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, BrainCircuit } from 'lucide-react';
import { useUserProfile } from '@/context/UserProfileContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WelcomeScreenProps {
  onTabChange: (tab: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onTabChange }) => {
  const { updateUserProfile } = useUserProfile();
  const [tempName, setTempName] = useState('');

  const handleSetupProfile = () => {
    if (tempName.trim()) {
      updateUserProfile({ firstName: tempName });
    } else {
      updateUserProfile({ firstName: "Путешественник" });
    }
  };

  const handleAiSelection = () => {
    if (tempName.trim()) {
      updateUserProfile({ firstName: tempName });
    } else {
      updateUserProfile({ firstName: "Исследователь" });
    }
    onTabChange('ai'); // Переключаем вкладку на AI
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-xl border border-border animate-fade-in">
        <CardHeader className="text-center p-8 bg-primary rounded-t-xl">
          <CardTitle className="text-4xl font-extrabold tracking-tight text-primary-foreground">
            Добро пожаловать в RouteWise!
          </CardTitle>
          <CardDescription className="text-lg text-primary-foreground/90 mt-2">
            Ваш персональный гид по городам России.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6 text-center">
          <div className="space-y-4">
            <Label htmlFor="welcome-name" className="text-lg text-foreground">Как вас зовут?</Label>
            <Input
              id="welcome-name"
              placeholder="Введите ваше имя"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="max-w-sm mx-auto"
            />
          </div>
          <p className="text-foreground text-lg leading-relaxed">
            Готовы открыть для себя удивительные места? Настройте свой профиль или доверьтесь нашему AI для мгновенных рекомендаций!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg flex-1"
              onClick={handleSetupProfile}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Настроить Профиль
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg flex-1"
              onClick={handleAiSelection}
            >
              <BrainCircuit className="mr-2 h-5 w-5" />
              AI Подбор Мест
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};