import { useFavorites } from '../context/FavoritesContext';

export const useFavoritesViewModel = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorited = (id: number) => favorites.some((f) => f.id === id);

  return { favorites, toggleFavorite, isFavorited };
};