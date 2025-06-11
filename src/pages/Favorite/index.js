import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { FavoritesContext } from '../../contexts/favoriteContext';
import { CardProductContext } from '../../contexts/cardProduct';

const Favorite = () => {
  const { favorites } = useContext(FavoritesContext);
 const { products } = useContext(CardProductContext);

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <View>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.title}</Text>
        )}
      />
    </View>
  );
};

export default Favorite;