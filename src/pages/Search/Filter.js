import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import OrderBy from "./OrderBy";
import Category from "./Category";
import GoBack from "../../components/goBack";
export default function Filter() {
    //TODO: Transformar o filtro, ou num modal ou num picker
    //TODO: Ajustar espaço entre botão de voltar e texto
    return (
        <ScrollView style={styles.container}>
            <GoBack/>
            <View style={{alignItems: "center",}}>
            <Text style={[styles.text, {marginTop: 70}]}>Ordenar por:</Text>
            <OrderBy/>
            </View>
            <View style={{alignItems: "center"}} >
                <Text style={[styles.text, {marginTop: 20}]}>Filtrar por:</Text>
                <Category/>
            </View>
            <View style={{alignItems: "center", marginTop: 20}}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Filtrar</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 20,
        fontFamily: "K2D_700Bold",
        color: "797979",
    },
    btn: {
        backgroundColor: "#26919B",
        width: 150,
        height: 40,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    textBtn: {
        fontSize: 17,
        color: "white",
        fontFamily: "K2D_700Bold",
    }
});