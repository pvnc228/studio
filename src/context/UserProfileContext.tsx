
"use client";

import type { Place } from '@/services/places';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  searchHistory: Place[];
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (profileData: Partial<UserProfile>) => void;
  addToSearchHistory: (place: Place) => void;
  loading: boolean; // Add loading state
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Load profile from localStorage on initial mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch (error) {
        console.error("Failed to parse user profile from localStorage", error);
        // Optionally clear invalid data
        localStorage.removeItem('userProfile');
      }
    }
    setLoading(false); // Set loading to false after attempting to load
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } else {
        // If profile is null (e.g., cleared), remove it from storage
        localStorage.removeItem('userProfile');
    }
  }, [userProfile]);

  const updateUserProfile = (profileData: Partial<UserProfile>) => {
    setUserProfile(prevProfile => ({
      ...(prevProfile ?? { firstName: '', lastName: '', phone: '', email: '', birthDate: '', searchHistory: [] }), // Provide default structure if null
      ...profileData,
    }));
  };

  const addToSearchHistory = (place: Place) => {
    setUserProfile(prevProfile => {
        if (!prevProfile) return null; // Should not happen if user exists, but safety check
        const newHistory = [place, ...(prevProfile.searchHistory || [])];
        // Optional: Limit history size
        // const limitedHistory = newHistory.slice(0, 20); // Keep last 20 items
        return {
            ...prevProfile,
            searchHistory: newHistory, // or limitedHistory
        };
    });
  };


  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile, addToSearchHistory, loading }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
