import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import api from "../services/Api";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/products");
        //console.log('Dados recebidos:', response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("./../media/logo.png")}
        style={{
          width: 110,
          height: 100,
          marginBottom: 30,
          alignSelf: "center",
        }}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id?.toString() || item.name}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.item}>{item.brand?.toUpperCase()}</Text>
                <Text style={styles.item}>{item.title}</Text>
                <Text style={styles.item}>Ano: 2020</Text>
                <Text style={styles.item}>R$ {item.price}</Text>
              </View>
              <View>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "K2D_700Bold",
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
