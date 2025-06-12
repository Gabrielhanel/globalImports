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
import { BaseRouter } from "@react-navigation/native";
//TODO: Corrigir bug: ao ter 2 itens no carrinho, o botão de finalizar compra some
//TODO: Adicionar funcionalidade: botão de finalizar compra e botão de remover do carrinho
// TODO: Na parte em que usarmos os produtos, fazer o useEffect ao inves de usar o useContext
// TODO: Ao clicar no botão de adicionar ao carrinho, exibir um modal de confirmação
export default function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum item no carrinho</Text>
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
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {cart.length > 0 && (
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.textBtn}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    position: "relative", // importante para o botão absoluto funcionar
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
});