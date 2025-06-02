import { View, TouchableOpacity, Image, Text, TextInput } from "react-native";
import { styles } from "../pages/Profile/UserProfile";
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
