import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import GoBack from "../../components/goBack";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { OrderContext } from "../../contexts/orderContext";

export default function Checkout({ route }) {
    const navigation = useNavigation();
    const {addOrder} = useContext(OrderContext);
  const { cart } = useContext(CartContext);
  const { totalValue } = route.params;
const [methodPayment, setMethodPayment] = useState("Transferência Bancária");

function handleAddOrder(cart) {
  const newOrder = {
    id: Date.now(),                      // ✅ Só cria o id aqui!
    items: cart,
    methodPayment: methodPayment,
    totalValue: totalValue
  };


  addOrder(newOrder);

  navigation.navigate("PurchaseConfirmated");
}
  return (
    <View style={styles.container}>
      <GoBack />
      <View style={styles.area}>
        <Text style={styles.text}>Resumo do pedido:</Text>
        <View>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id?.toString()}
            ListFooterComponent={
              <View style={{ alignItems: "center" }}>
                <View>
                <Text style={styles.textPayment}>Metodo de Pagamento:</Text>
                <Picker
                  selectedValue={methodPayment}
                  onValueChange={(itemValue) => setMethodPayment(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#26919B" // Cor do ícone da seta (Android)
                >
                  <Picker.Item
                    label="Transferência Bancária"
                    value="Transferência Bancária"
                  />
                  <Picker.Item 
                  label="PIX" 
                  value="PIX" 
                  />
                </Picker>
                </View>

                    <Text style={styles.textAddress}>Confirme seu endereço:</Text>
                    <View style={styles.addressArea}>
                        <Text style={styles.address}>Rua Marechal Castelo Branco, 69, Centro, Tupanci do Sul, RS</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Address")} style={styles.editAreaAddress}>
                            <Text style={styles.editAddressText} >Alterar</Text>
                        </TouchableOpacity>

                </View>
                                        <TouchableOpacity style={styles.btn} onPress={() => handleAddOrder(cart)}>
                            <Text style={styles.textBtn}>Finalizar Compra</Text>
                        </TouchableOpacity>

              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.year}>2025 - Italia</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    alignItems: "center",
    height: "80%",
  },
  text: {
    fontSize: 20,
    fontFamily: "K2D_700Bold",
    marginTop: -60,
  },
  card: {
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
  year: {
    fontSize: 20,
  },
  price: {
    fontSize: 20,
    marginLeft: 30,
    fontFamily: "K2D_700Bold",
    color: "#26919B",
  },
  textPayment: {
    fontSize: 20,
    marginBottom: -20,
    marginTop: 20,
    fontFamily: "K2D_700Bold",
  },
  picker: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "#26919B",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 30,
    fontFamily: "K2D_400Regular",
    color: "#333",
    backgroundColor: "#F8F8F8",
  },
  textAddress: {
    fontSize: 20,
    marginBottom: -20,
    marginTop: 20,
    fontFamily: "K2D_700Bold",
  },
  addressArea: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  address: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_400Regular",
  },
  editAreaAddress: {
    backgroundColor: "#26919B",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  editAddressText: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_400Regular",
    textAlign: "center",
    color: "#fff",
  },
  btn: {
    backgroundColor: "#26919B",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_400Regular",
    textAlign: "center",
    color: "#fff",
  },
});
