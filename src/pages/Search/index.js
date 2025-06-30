import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import api from "../../services/Api";
export default function SearchScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [imageBrands, setImageBrands] = useState([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("/dados");
          const data = response.data;

          const enrichedCars = data.cars.map((car) => {
            const brand = data.brands.find((b) => b.id === car.brand);
            const store = data.stores.find((s) => s.id === car.store);
            const images = data.car_images.filter((img) => img.car === car.id);
            return {
              ...car,
              brand,
              store,
              images,
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

  function filterBrands(productsList) {
    const brands = {
      "Mustang": require("../../media/home/mustang-logo.png"),
    };

    const productsWithImages = productsList.map((item) => {
      return {
        ...item,
        image: brands[item.brand?.name],
      };
    });
    setImageBrands(productsWithImages);
  }

  const filteredData = imageBrands.filter((item) =>
    item.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="Procure algo..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => navigation.navigate("Filter")}
        >
          <Image
            source={require("../../media/filter/filter.png")}
            style={styles.filter}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => `${item.model}-${item.year}`}
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
                <Text style={[styles.item, { color: "#000", maxWidth: 130 }]}>
                  {item.model}
                </Text>
                <Image
                  source={{ uri: item?.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={[
                    styles.item,
                    { fontSize: 18, marginTop: 8, color: "#009999" },
                  ]}
                >
                  US$ {item.price.toLocaleString("pt-BR")}
                </Text>
                <Text style={[styles.item, { fontSize: 14, color: "#666" }]}>
                  {item.year || "2020"}
                </Text>
                {item.image && <Image source={item.image} style={styles.img} />}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum item encontrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 40, flex: 1 },
  input: {
    width: "85%",
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#D0D0D0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
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
  },
  filter: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  btnFilter: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#BFBFBF",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 50,
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
});
