import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ButtonEditProfile from "../../components/ButtonEditProfile";
import ButtonAddress from "../../components/ButtonAddress";
import { useAuth } from "../../contexts/AuthContext";
export default function UserProfile() {

  const { logout } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Image
            source={require("../../media/profile/visitor.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Anunciante</Text>
          <ButtonEditProfile/>
        </View>
      </View>
      <ButtonAddress/>
        <TouchableOpacity onPress={() => navigation.navigate("ProductRegister")}>
          <View style={[styles.card, { flexDirection: "row" }]}>
            <Image
            source={require("../../media/profile/store.png")}
            style={{ marginTop: 5, marginRight: 10 }}
            />
            <Text style={styles.textCard}>Cadastrar item</Text>
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
            <View style={[styles.logout, {flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 160}]}>
                <Image
                source={require("../../media/profile/login.png")}
                style={{width: 30, height: 30}}
                />
                <Text style={styles.textLogout} >Sair da conta</Text>
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
    backgroundColor: "#fff", // só pra contraste
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // alinha imagem e texto na mesma altura
  },
  image: {
    width: 100,
    height: 100,
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
    flexDirection: 'row',
        backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  textCard: {
      maxWidth: 100,
      fontSize: 18,
      color: "#797979",
      fontFamily: "K2D_700Bold",
  },
  logout: {
      backgroundColor: 'red',
      maxWidth: 165,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
  },
  textLogout: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'white',
      fontFamily: 'K2D_700Bold',
  }
});
