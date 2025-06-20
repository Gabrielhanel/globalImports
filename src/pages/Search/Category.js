import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { CardProductContext } from "../../contexts/cardProduct";
export default function OrderBy() {
  const { products } = useContext(CardProductContext);
  return (
    <View>
      <View style={styles.box}>
        <TouchableOpacity>
          <Text style={[styles.text, { marginTop: 12 }]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Marca</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Esportivo</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Clássico</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Pick-up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Elétrico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#F5F5F5",
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRadius: 10,
    width: "300",
    height: "370"
  },
  text: {
    fontSize: 18,
    color: "#797979",
    textAlign: "left",
    marginLeft: 15,
    padding: 10,
    fontFamily: "K2D_300Light",
  }
});