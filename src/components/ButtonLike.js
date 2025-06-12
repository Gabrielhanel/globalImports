import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/favoriteContext';

export default function ButtonLike({ product }) {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const liked = isFavorite(product.id);

  return (
    <View>
      <TouchableOpacity style={styles.favorite} onPress={() => toggleFavorite(product.id)}
        >
        <Image
          source={liked ? 
            require("../media/home/favoriteactive.png") : 
            require("../media/home/favorite.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  favorite: {

    width: 45,
    height: 45,
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    backgroundColor: "#ea1d25",
    borderRadius: 15,
  },
});