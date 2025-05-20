import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Visitor() {
  const natigation = useNavigation();

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
          <Text style={styles.text}>Visitante</Text>
        </View>
      </View>
      <View style={{alignItems: "center", justifyContent: "center", marginTop: 60}}>
        <TouchableOpacity style={styles.btn} onPress={() => natigation.navigate("Login")}>
          <View style={{flexDirection: "row"}}>
            <Image 
            source={require("../../media/profile/login.png")}
            style={{marginRight: 10}}
            />
            <Text style={styles.textBtn}>Fazer Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => natigation.navigate("Register")}>
          <View style={{flexDirection: "row"}}>
            <Image 
            source={require("../../media/profile/create-acount.png")}
            style={{marginRight: 10}}
            />
            <Text style={styles.textBtn}>Criar uma Conta</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100, // isso move tudo pra baixo
    paddingLeft: 40,
    backgroundColor: "#f2f2f2", // só pra contraste
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // alinha imagem e texto na mesma altura
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
    width: 200,
    height: 55,
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
});
