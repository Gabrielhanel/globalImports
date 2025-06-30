import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import GoBack from "../../components/goBack";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { OrderContext } from "../../contexts/orderContext";
import api from "../../services/Api";
export default function Checkout({ route }) {
    const navigation = useNavigation();
  const { cart, clearCart } = useContext(CartContext);
  const { totalValue } = route.params;
const [methodPayment, setMethodPayment] = useState("Transferência Bancária");

async function handleAddOrder() {
  try {
    await api.post("/orders", {
      userId: user.id,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.amount
      })),
      methodPayment,
      totalValue
    });
    clearCart();
    navigation.navigate("PurchaseConfirmated");
  } catch (err) {
    console.error("Erro ao finalizar compra", err);
  }
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
            showsVerticalScrollIndicator={false}
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
                <View style={{alignItems: "center"}}>
                <Image
                source={{ uri: item.thumbnail}
              }
                style={styles.image}
                />                  
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.brand}>{item.brand}</Text>                  
                </View>

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
    backgroundColor: "#FFF",
  },
  area: {
    alignItems: "center",
    height: "80%",
  },
  text: {
    fontSize: 20,
    fontFamily: "K2D_600SemiBold",
    color: "#797979",   
    marginTop: -60,

  },
  card: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    borderWidth: 0.5,
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
  year: {
    fontSize: 20,
    fontFamily: "K2D_300Light",
    color: "#797979",
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    marginLeft: 30,
    fontFamily: "K2D_800ExtraBold",
    textAlign: "center",
    color: "#26919B",
  },
  textPayment: {
    marginBottom: -20,
    marginTop: 20,
        fontSize: 20,
    fontFamily: "K2D_600SemiBold",
    color: "#797979",  
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
    fontFamily: "K2D_600SemiBold",
    color: "#797979",  
    marginBottom: -20,
    marginTop: 20,
  },
  addressArea: {
        backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    borderWidth: 0.5,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  address: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_600SemiBold",
    textAlign: "center",
  },
  editAreaAddress: {
    backgroundColor: "#FF6666",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 15,
  },
  editAddressText: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_600SemiBold",
    textAlign: "center",
    color: "#fff",
  },
  btn: {
    backgroundColor: "#007F7F",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
    width: 300,
    height: 50,
    borderRadius: 14,
  },
  textBtn: {
    fontSize: 22,
    fontFamily: "K2D_600SemiBold",
    textAlign: "center",
    color: "#fff",
  },
  image: {
    width: 100,
    height: 100,
  }
});
