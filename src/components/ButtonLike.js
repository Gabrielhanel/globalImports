import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavoritesContext } from '../contexts/favoriteContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ButtonLike({ product }) {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const liked = isFavorite(product.id);
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
  style={styles.favorite}
  onPress={() => {
    if (!user || (user.userType !== "user" && user.userType !== "admin")) {
      navigation.navigate("OnlyLoggedAction");
    } else {
      toggleFavorite(product.id);
    }
  }}
>
  <Image
    source={
      liked
        ? require("../media/home/favoriteactive.png")
        : require("../media/home/favorite.png")
    }
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