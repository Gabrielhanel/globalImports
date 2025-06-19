import React, { useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FavoritesContext } from "../../contexts/favoriteContext";
import api from "../../services/Api";
import { CartContext } from "../../contexts/CartContext";

export default function Favorite() {
  const { cart, removeFromCart, addProduct } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );
  const { removeFavorite } = useContext(FavoritesContext);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("/products");
          setProducts(response.data.products);
        } catch (error) {
          console.error("Erro ao buscar os produtos:", error);
        }
      };

      fetchData();
    }, [])
  );

  const handleRemoveItem = (id) => {
    Alert.alert("Remover", "Tem certeza que deseja remover este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => removeFromCart(id), // ✅ Só executa depois que o usuário clicar!
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum item curtido</Text>
          </View>
        )}
        renderItem={({ item }) => {
          // Verifica se o item atual já está no carrinho comparando os IDs
          const isInCart = cart.some((c) => c.id === item.id);
          const handleToggleCartItem = (item) => {
            if (isInCart) {
              handleRemoveItem(item.id);
            } else {
              addProduct(item);
            }
          };
          return (
            <View style={styles.item}>
              <View style={{ justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.brand}>{item.brand}</Text>
                  </View>
                  <View style={{ marginLeft: 85, marginTop: 30 }}>
                    <View style={{ marginBottom: 30 }}>
                      <TouchableOpacity
                        onPress={() => handleToggleCartItem(item)}
                      >
                        <Image
                          source={
                            isInCart
                              ? require("../../media/home/shopping_cart_off.png")
                              : require("../../media/home/shopping_cart-gray.png")
                          }
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View>
                      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                        <Image
                          source={require("../../media/home/favoriteactive.png")}
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.price}>R$ {item.price}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
  },
});
