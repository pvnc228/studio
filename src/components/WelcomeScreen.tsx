
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, BrainCircuit } from 'lucide-react'; // Import icons
import { useUserProfile } from '@/context/UserProfileContext'; // Import context hook

export const WelcomeScreen = () => {
  const { updateUserProfile } = useUserProfile(); // Get the update function

  // Function to simulate navigating to the profile setup
  const handleSetupProfile = () => {
    // In a real app, this might navigate to a profile setup page.
    // For now, let's just set a default first name to trigger the main UI.
    updateUserProfile({ firstName: "Путешественник" }); // Set a default name
  };

  // Function to simulate navigating to the AI suggestion tab
  const handleAiSelection = () => {
    // Set a default name and potentially navigate or set tab state
    updateUserProfile({ firstName: "Исследователь" });
    // You might need a way to communicate the desired tab to the main page
    // e.g., using a shared state or routing parameter.
    console.log("Navigate to AI selection tab (implementation needed)");
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

// Add basic fade-in animation in globals.css if it doesn't exist
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
*/

