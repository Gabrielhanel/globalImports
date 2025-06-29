import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import OnlyLoggedUsers from "../Profile/OnlyLoggedUsers";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  
  const { user } = useAuth();
  const navigation = useNavigation();
  const { cart, removeFromCart } = useContext(CartContext);
  const totalValue = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleRemoveItem = (id) => {
    Alert.alert("Remover", "Tem certeza que deseja remover este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => removeFromCart(id),
      },
    ]);
  };

  // Checa se o usuário é inválido para o carrinho
  if (!user || user.userType !== "user" || user.userType !== "admin") {
    return <OnlyLoggedUsers />;
  }

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
                <Text style={styles.totalValue}>
                  R$ {parseFloat(totalValue).toLocaleString("pt-BR")}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigation.navigate("Checkout", {
                    cart: cart,
                    totalValue: totalValue,
                  })
                }
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
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        maxWidth: 160,
                        marginRight: 20,
                      }}
                    >
                      <Text style={styles.title}>{item.model}</Text>
                      <Text style={styles.brand}>{item.brand}</Text>
                    </View>
                    <View>
                      <Text style={styles.price}>
                        US$ {item.price.toLocaleString("pt-BR")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                  <Image
                    source={require("../../media/components/Trash.png")}
                    style={{ width: 30, height: 30, marginLeft: 70, marginTop: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
    paddingTop: 60,
  },
  item: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
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
    fontFamily: "K2D_300Light",
  },
  price: {
    fontSize: 20,
    marginLeft: 30,
    fontFamily: "K2D_800ExtraBold",
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
    fontFamily: "K2D_800ExtraBold",
    color: "#26919B",
    justifyContent: "center",
  },
});
