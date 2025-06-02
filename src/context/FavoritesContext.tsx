import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Favorite {
  id: number;
  name: string;
}

interface FavoritesContextData {
  favorites: Favorite[];
  toggleFavorite: (pokemon: Favorite) => void;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then((data) => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon: Favorite) => {
    setFavorites((prev) =>
      prev.find((pokemon) => pokemon.id === pokemon.id)
        ? prev.filter((pokemon) => pokemon.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
  }
  return context;
};
