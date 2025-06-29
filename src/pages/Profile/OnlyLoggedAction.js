import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../../components/goBack";

export default function OnlyLoggedAction() {
  const navigation = useNavigation();

  return (
  <View style={styles.container}>
    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 200}}>
        <GoBack/>
    </View>
    <View style={{ alignItems: "center"}}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Faça login ou cadastre-se para continuar</Text>
    </View>
    <View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textBtn}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.textBtn}>Fazer Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    maxWidth: 300,
    fontSize: 25,
    color: "black",
    fontFamily: "K2D_700Bold",
  },
  areaBtn: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#26919B",
    width: 150,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontSize: 17,
    color: "white",
    fontFamily: "K2D_700Bold",
  },
});