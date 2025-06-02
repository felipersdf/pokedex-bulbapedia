import React from "react"
import { FlatList, View, ActivityIndicator, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { useRouter } from "expo-router"
import PokemonCard from "../../src/components/PokemonCard"
import { usePokemonList } from "../../src/hooks/usePokemonList"
import { Colors } from "../../src/components/Themed"
import { StatusBar } from "expo-status-bar"
import { FontAwesome } from "@expo/vector-icons"

export default function Home() {
  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError,} = usePokemonList()

  const [search, setSearch] = React.useState("")

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.text}>Carregando pokémons...</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Erro ao carregar os pokémons.</Text>
      </View>
    )
  }

  const pokemons = data?.pages.flatMap((page) => page.results) || []

  function getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean)
    return Number(parts[parts.length - 1])
  }

 const term = search.toLowerCase();

 const filteredPokemons = pokemons.filter((pokemon) => {
  const id = getIdFromUrl(pokemon.url).toString();
  return (
    pokemon.name.toLowerCase().includes(term) ||
    id.includes(search)
  );
});

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            placeholder="Buscar por nome ou número"
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/favorites")}
          style={styles.floatingButton}
        >
          <Ionicons name="heart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>

        <FlatList
          contentContainerStyle={styles.list}
          data={filteredPokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            const id = getIdFromUrl(item.url)
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return (
              <PokemonCard
                id={id}
                name={item.name}
                imageUrl={imageUrl}
                onPress={() => router.push(`/pokemon/${id}`)}
              />
            )
          }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : null
          }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 8,
  },
  text: {
    marginTop: 12,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f0e6",
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#16a34a",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 8,
  },
})
