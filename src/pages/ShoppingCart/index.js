import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CardProductContext } from "../../contexts/cardProduct";
//TODO: Corrigir bug: ao ter 2 itens no carrinho, o botão de finalizar compra some
//TODO: Adicionar funcionalidade: botão de finalizar compra e botão de remover do carrinho
export default function Cart() {
  const { products } = useContext(CardProductContext);
  const { cart, addProduct } = useContext(CartContext);
  return (
    <View>

    <View style={styles.container}>
      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 200,
              }}
            >
              Nenhum item no carrinho
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.brand}>{item.brand}</Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={require("../../media/components/Trash.png")}
                  style={{ width: 30, height: 30, marginLeft: 280 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>R$ {item.price}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      { cart.length > 0 && (
                <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.textBtn}>Finalizar Compra</Text>
          </View>
        </TouchableOpacity>
      )

      }
          </View>
        </View>
  );
}

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
