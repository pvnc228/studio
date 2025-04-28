"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Place } from '@/services/places';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  searchHistory: Place[];
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  token: string | null;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  addToSearchHistory: (place: Place) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isFirstLogin: boolean; // Новый флаг
  setIsFirstLogin: (value: boolean) => void; // Метод для управления флагом
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false); // Инициализируем флаг

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error('Не удалось загрузить профиль');
      const user = await response.json();
      setUserProfile(user);
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error);
      setToken(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Ошибка входа');
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
      await fetchUserProfile(data.token);
      setIsFirstLogin(true); // Устанавливаем флаг после успешного логина
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error;
    }
  };

  const logout = () => {
    setUserProfile(null);
    setToken(null);
    localStorage.removeItem('token');
    setIsFirstLogin(false); // Сбрасываем флаг при выходе
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!token) throw new Error('Пользователь не авторизован');
    try {
      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) throw new Error('Не удалось обновить профиль');
      const updatedUser = await response.json();
      setUserProfile(prev => ({ ...prev, ...updatedUser.user }));
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      throw error;
    }
  };

  const addToSearchHistory = async (place: Place) => {
    if (!token) throw new Error('Пользователь не авторизован');
    try {
      const response = await fetch('/api/auth/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(place),
      });
      if (!response.ok) throw new Error('Не удалось добавить в историю');
      setUserProfile(prev => {
        if (!prev) return prev;
        const history = [place, ...(prev.searchHistory || [])].slice(0, 20);
        return { ...prev, searchHistory: history };
      });
    } catch (error) {
      console.error('Ошибка при добавлении в историю:', error);
      throw error;
    }
  };

  const clearSearchHistory = async () => {
    if (!token) throw new Error('Пользователь не авторизован');
    try {
      const response = await fetch('/api/auth/history', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Не удалось очистить историю');
      setUserProfile(prev => (prev ? { ...prev, searchHistory: [] } : prev));
    } catch (error) {
      console.error('Ошибка при очистке истории:', error);
      throw error;
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        token,
        updateUserProfile,
        addToSearchHistory,
        clearSearchHistory,
        login,
        logout,
        loading,
        isFirstLogin,
        setIsFirstLogin,
      }}
    >
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