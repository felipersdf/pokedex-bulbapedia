
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './Themed';
import { useFavorites } from "../context/FavoritesContext";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  onPress: () => void;
}

export default function PokemonCard({ id, name, imageUrl, onPress }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
         <TouchableOpacity onPress={() => toggleFavorite({ id, name })}>
          <FontAwesome name={isFavorite(id) ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.id}>#{id.toString().padStart(3, '0')}</Text>
        <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 10,
    elevation: 2,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  image: {
    width: 72,
    height: 72,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  id: {
    fontSize: 12,
    color: Colors.gray,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  favorite: {
    fontSize: 20,
  }
});
