// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavoritePokemon = {
  id: number;
  name: string;
};

type FavoritesContextType = {
  favorites: FavoritePokemon[];
  toggleFavorite: (pokemon: FavoritePokemon) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem('@favorites');
      if (stored) setFavorites(JSON.parse(stored));
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon: FavoritePokemon) => {
    const exists = favorites.some((fav) => fav.id === pokemon.id);
    if (exists) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== pokemon.id));
    } else {
      setFavorites((prev) => [...prev, pokemon]);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
