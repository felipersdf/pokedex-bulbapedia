import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from "../src/context/FavoritesContext";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <FavoritesProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </FavoritesProvider>
  );
}
