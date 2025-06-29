import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ButtonEditProfile from "../../components/ButtonEditProfile";
import ButtonAddress from "../../components/ButtonAddress";
import { useNavigation } from "@react-navigation/native";
import {useAuth} from "../../contexts/AuthContext";
export default function UserProfile() {

  const { logout } = useAuth();

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../media/profile/visitor.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Usuário</Text>
          <ButtonEditProfile />
        </View>
      </View>
      <ButtonAddress />
      <TouchableOpacity onPress={() => navigation.navigate("MyOrders")}>
        <View style={[styles.card, { flexDirection: "row" }]}>
          <Image
            source={require("../../media/profile/car.png")}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.textCard}>Meus Pedidos</Text>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
  style={{ alignItems: "center" }}
  onPress={() => {
    logout(); // limpa o contexto
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }}
>
          <View
            style={[
              styles.logout,
              {
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 270,
              },
            ]}
          >
            <Image
              source={require("../../media/profile/login.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.textLogout} onPress={logout}>Sair da conta</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 40,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(218, 216, 216, 0.61)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  textContainer: {
    marginLeft: 20,
  },
  text: {
    fontSize: 25,
    color: "black",
    fontFamily: "K2D_700Bold",
  },
  btn: {
    backgroundColor: "#26919B",
    width: 150,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  textBtn: {
    fontSize: 17,
    color: "white",
    fontFamily: "K2D_700Bold",
  },
  card: {
    marginTop: 10,
    width: 300,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  textCard: {
    maxWidth: 100,
    fontSize: 20,
    color: "#797979",
    fontFamily: "K2D_700Bold",
  },
  logout: {
    backgroundColor: "red",
    maxWidth: 165,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  textLogout: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
    fontFamily: "K2D_700Bold",
  },
});
