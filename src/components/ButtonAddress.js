import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ButtonAddress() {
    const navigation = useNavigation();

    return (
          <View>
        <TouchableOpacity onPress={() => navigation.navigate("Address")}>
          <View style={[styles.card, { flexDirection: "row", marginTop: 50 }]}>
            <Image
              source={require("../media/profile/pin.png")}
              style={{ marginTop: 5, marginRight: 10 }}
            />
            <Text style={styles.textCard}>Meu endereço</Text>
            </View>
        </TouchableOpacity>
          </View>
)}
const styles = StyleSheet.create({
    card: {
    marginTop: 10,
    width: 300,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    // Sombras no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  textCard: {
      maxWidth: 100,
      fontSize: 18,
      color: "#797979",
      fontFamily: "K2D_700Bold",
  },
})