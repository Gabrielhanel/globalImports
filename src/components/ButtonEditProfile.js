import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ButtonEditProfile() {

    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("EditProfile")}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={require("../media/profile/pen.png")}
                        style={{ marginTop: 5, marginRight: 10 }}
                    />
                    <Text style={styles.textBtn}>Editar perfil</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    textBtn: {
        fontSize: 17,
        color: "white",
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
})