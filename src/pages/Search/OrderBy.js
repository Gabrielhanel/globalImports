import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, {useContext, useState} from "react";
import { CardAnimationContext } from "@react-navigation/stack";
import { CardProductContext } from "../../contexts/cardProduct";
import { Picker } from "@react-native-picker/picker";

export default function OrderBy() {
  const [brands, setBrands] = useState(0);

  const [orderOption, setOrderOption] = useState("Recomendados");
      const { products } = useContext(CardProductContext);

{ /*      const FilteredData = products
      .filter(filter(item =>
    item.title.toLowerCase()))
    .sort((a, b) => {
    switch (orderOption) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }})
*/}

  return (
    <View>
      <View style={styles.box}>
        <TouchableOpacity>
          <Text style={styles.text}>Nome (A-Z)</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Nome (Z-A)</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Preço (maior)</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Preço (menor)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    box: {
      marginTop: 20,
            backgroundColor: "#F5F5F5",
    borderColor: "#D0D0D0",
    borderWidth: 1,
        borderRadius: 10,
        width: "300",
        height: "200",
        justifyContent: "space-around",
    },
    text: {
        fontSize: 18,
        color: "#797979",
        textAlign: "left",
        marginLeft: 15,
        padding: 6,
        fontFamily: "K2D_300Light",
    }
});