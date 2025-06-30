import React, { useCallback, useState, useMemo } from "react";
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
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [imageBrands, setImageBrands] = useState([]);
  const navigation = useNavigation();

useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dados");
        const data = response.data;

        const enrichedCars = data.cars.map(car => {
          const brand = data.brands.find(b => b.id === car.brand); //esperar o pabo colocar a api com o get que contenha o id da table brand 
          const store = data.stores.find(s => s.id === car.store);
          const images = data.car_images.filter(img => img.car === car.id);
          return {
            ...car,
            brand,
            store,
            images
          };
        });

        setProducts(enrichedCars); 
        filterBrands(enrichedCars); 

      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchData();
  }, [])
);
 // Filtra produtos conforme marca selecionada
  const filteredProducts = useMemo(() => {
    if (!selectedBrand) return products;
    return products.filter(product => product.brand?.name === selectedBrand);
  }, [products, selectedBrand]);

  // Passa as marcas para o filtro (extrair as marcas únicas)
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand?.name).filter(Boolean));
    return Array.from(brandsSet);
  }, [products]);

function filterBrands(productsList) {
    const brands = {
      "Mustang": require("../../media/home/mustang-logo.png"),
    };

    const productsWithImages = productsList.map((item) => {
      return {
        ...item,
        image: brands[item.brand?.name]
      };
    });
    setImageBrands(productsWithImages);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => `${item.id}`}
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
            <QuickFilter
                  brands={availableBrands}
      selectedBrand={selectedBrand}
      onSelectBrand={setSelectedBrand}
            />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Product", {
                product: item,
                images: item.images, /* Imagens dos produtos */
                imageBrand: item.brand?.logo, /* Logos das marcas */
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
                  {item.model}
                </Text>
                <Image
                  source={{ uri: item.brand?.logo }}
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
                  US$ {item.price.toLocaleString("pt-BR")}
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
                  {item.year || "Sem ano especificado"}
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
