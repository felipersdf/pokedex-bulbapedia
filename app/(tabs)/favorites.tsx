// app/(tabs)/favorites.tsx
import React from 'react';
import { FlatList, StatusBar, Text, View, StyleSheet } from 'react-native';
import PokemonCard from '../../src/components/PokemonCard';
import { useFavoritesViewModel } from '../../src/viewmodels/useFavorites';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/components/Themed';

export default function Favorites() {
  const { favorites } = useFavoritesViewModel();
  const router = useRouter();

  if (favorites.length === 0)
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhum pokémon favoritado ainda.</Text>
      </View>
    );

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.title}>Meus favoritos</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;

            return (
              <PokemonCard
                id={item.id}
                name={item.name}
                imageUrl={imageUrl}
                onPress={() => router.push(`/pokemon/${item.id}`)}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  listContent: {
    paddingBottom: 16,
  },
});
