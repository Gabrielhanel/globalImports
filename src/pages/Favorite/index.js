import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
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
          <View style={styles.item}>
            <View style={{ justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.brand}>{item.brand}</Text>
              </View>
            </View>
            <Text style={styles.price}>R$ {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: "#fff",
    marginTop: 60,
    marginBottom: -30,
    marginLeft: 20,
    padding: 20,
    borderRadius: 10,
    maxWidth: 350,
  },
  title: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_700Bold",
  },
  brand: {
    fontSize: 20,
    maxWidth: 100,
    marginLeft: 10,
    fontFamily: "K2D_100Thin",
  },
  price: {
    fontSize: 20,
    marginLeft: 30,
    fontFamily: "K2D_700Bold",
    color: "#26919B",
  },
  btn: {
    backgroundColor: "#26919B",
    width: 250,
    marginTop: 400,
    marginLeft: 80,
    height: 60,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontSize: 17,
    color: "white",
    fontFamily: "K2D_700Bold",
  },
});

export default Favorite;