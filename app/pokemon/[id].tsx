import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  StatusBar,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { fetchPokemonDetails } from "../../src/services/pokeApi"
import { Colors } from "../../src/components/Themed"
import { useFavoritesViewModel } from "../../src/viewmodels/useFavorites"
import { PokemonDetails } from "../../src/models/pokemon.model"

export default function PokemonDetail() {
  const { id } = useLocalSearchParams()
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const { toggleFavorite, isFavorited } = useFavoritesViewModel()

  useEffect(() => {
    if (!id) return

    setLoading(true)
    fetchPokemonDetails(id as string)
      .then(setPokemon)
      .finally(() => setLoading(false))
  }, [id])

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ flex: 1 }}
      />
    )

  if (!pokemon) return <Text>Pokémon não encontrado.</Text>

  const favorited = isFavorited(pokemon.id)

  return (
    <>
      <StatusBar hidden />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
        <Image
          source={{
            uri: pokemon.sprites.other["official-artwork"].front_default,
          }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>
          Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}
        </Text>
        <Text style={styles.subtitle}>Altura: {pokemon.height}</Text>
        <Text style={styles.subtitle}>Peso: {pokemon.weight}</Text>
        <Text style={styles.subtitle}>
          Habilidades: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </Text>

        <Button
          title={
            favorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"
          }
          color={favorited ? Colors.danger : Colors.primary}
          onPress={() => toggleFavorite({ id: pokemon.id, name: pokemon.name })}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: Colors.textPrimary,
  },
})
