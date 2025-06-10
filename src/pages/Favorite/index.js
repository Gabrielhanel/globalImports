import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { FavoritesContext } from '../../contexts/favoriteContext';
import ProductContext from '../../contexts/cardProduct';

const Favorite = () => {
    const favoriteProducts = products.filter(product => favorites.includes(product.id));
  const { favorites } = useContext(FavoritesContext);
  const { products } = useContext(ProductContext);
  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.title}</Text>
        )}
      />
    </View>
  );
};

export default Favorite;