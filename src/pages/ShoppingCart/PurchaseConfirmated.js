import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PurchaseConfirmated({ route }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedido Confirmado!</Text>
      <Text style={styles.alert}>Confira atualizações do pedido na aba "Meus Pedidos”</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyOrders")}>
          <Text style={styles.textBtn}>Ir para a aba "Meus Pedidos"</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainTabs")}>
          <Text style={styles.textBtn}>Voltar para a tela inicial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#042940",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    marginTop: 100,
    color: "#fff",
    fontFamily: "K2D_700Bold",
    marginBottom: 20,
  },
  alert: {
    fontSize: 20,
    width: 300,
    textAlign: "center",
    fontFamily: "K2D_100Thin",
    color: "#fff",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 150,
  },
  button: {
    backgroundColor: "#033D62",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  textBtn: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "K2D_700Bold",
  },
});