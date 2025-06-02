import React from "react"
import { FlatList, View, ActivityIndicator,Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import PokemonCard from "../../src/components/PokemonCard"
import { usePokemonList } from "../../src/hooks/usePokemonList"
import { Colors } from "../../src/components/Themed"
import { StatusBar } from "expo-status-bar"
import { FontAwesome } from "@expo/vector-icons"

export default function Home() {
  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError,} = usePokemonList()

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

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
            const id = index + 1
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


        <TouchableOpacity
          onPress={() => router.push("/(tabs)/favorites")}
          style={styles.floatingButton}
        >
          <FontAwesome name="heart" size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    position: "relative",
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 8,
    paddingBottom: 100,
  },
  text: {
    marginTop: 12,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  floatingButton: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
})
