import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
//TODO: Adicionar funcionalidade: botão de finalizar compra e botão de remover do carrinho
// TODO: Remover item do carrinho apos a compra

import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  const navigation = useNavigation();
  const { cart } = useContext(CartContext);
  const totalValue = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={{ paddingBottom: 200 }}
        ListFooterComponent={
          cart.length > 0 ? (
            <View style={{ marginVertical: 20, alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.totalText}>Total: </Text>
                <Text style={styles.totalValue}>R$ {totalValue}</Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Checkout", { cart: cart, totalValue: totalValue })}
              >
                <Text style={styles.textBtn}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum item no carrinho</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ justifyContent: "space-between" }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.brand}>{item.brand}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity>
                  <Image
                    source={require("../../media/components/Trash.png")}
                    style={{ width: 30, height: 30, marginLeft: 280 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.price}>R$ {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    position: "relative",
    marginTop: 60,
  },
  item: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
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
  btnWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#26919B",
    width: 250,
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
  totalText: {
    fontSize: 20,
    fontFamily: "K2D_200Thin",
    color: "#26919B",
  },
  totalValue: {
    fontSize: 20,
    fontFamily: "K2D_700Bold",
    color: "#26919B",
    justifyContent: "center",
  },
});
