import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import QuickFilter from "./quickFilter";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/Api";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [imageBrands, setImageBrands] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("/products");
          const productsData = response.data.products;

          setProducts(productsData);

          // Agora, filtra e adiciona as imagens das marcas
          filterBrands(productsData);
        } catch (error) {
          console.error("Erro ao buscar os produtos:", error);
        }
      };

      fetchData();
    }, [])
  );
function filterBrands(productsList) {
    const brands = {
      "Calvin Klein": require("../../media/home/calvin-klein.png"),
      "Gucci": require("../../media/home/Gucci.png"),
      "Chanel": require("../../media/home/chanel.png"),
      "Dior": require("../../media/home/dior.png"),
      "Dolce Gabbana": require("../../media/home/dolce-gabbana.png"),
    };

    const productsWithImages = productsList.map((item) => {
      return {
        ...item,
        image: brands[item.brand],
      };
    });

    setImageBrands(productsWithImages);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={imageBrands}
        keyExtractor={(item) => item.id?.toString() || item.name}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Image
              source={require("../../media/logo.png")}
              style={{
                width: 80,
                height: 70,
                marginBottom: 30,
                alignSelf: "center",
              }}
            />
            <QuickFilter />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Product", {
                product: item,
                images: item.images,
                imageBrand: item.image,
              })
            }
          >
            <View style={styles.card}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={[
                    styles.item,
                    {
                      color: "#000000",
                      fontFamily: "K2D_500Medium",
                      maxWidth: 130,
                    },
                  ]}
                >
                  {item.title}
                </Text>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={[
                    styles.item,
                    {
                      fontSize: 18,
                      marginTop: 8,
                      color: "#009999",
                      fontFamily: "K2D_700Bold",
                    },
                  ]}
                >
                  R$ {item.price}
                </Text>
                <Text
                  style={[
                    styles.item,
                    {
                      fontSize: 14,
                      color: "#666666",
                      fontFamily: "K2D_300Light",
                    },
                  ]}
                >
                  {item.year || "2020"}
                </Text>
                <Image source={item.image} style={styles.img} />
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
    paddingTop: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "K2D_700Bold",
    maxWidth: 200,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginLeft: 60,
  },
  card: {
    width: 330,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 3,
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
    borderColor: "#BDBDBD",
    borderWidth: 1,
  },
  img: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
