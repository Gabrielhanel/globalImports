import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import GoBack from "../../components/goBack";

export default function Home({ route }) {
  const { product, images } = route.params;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TouchableOpacity style={styles.back}>
          <GoBack />
        </TouchableOpacity>
        <TouchableOpacity style={styles.condition}>
          <Text style={styles.textCondition}>Condições de Financiamento</Text>
          <Image
            source={require("../../media/home/santander.png")}
            style={{ width: 30, height: 30, marginRight: 55 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cart}>
          <Text style={styles.textCondition}>Adicionar ao carrinho</Text>
          <Image
            source={require("../../media/home/shopping_cart.png")}
            style={{ width: 30, height: 30, marginRight: 55 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favorite}>
          <Image
            source={require("../../media/home/favorite.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item }} style={{ width: 300, height: 270 }} />
          </View>
        )}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>{product.brand.toUpperCase()}</Text>
        <Text>{product.title}</Text>
      </View>
      <View>
        <Text>{product.description}</Text>
      </View>
      <View>
        <Text>R${product.price}</Text>
      </View>
      <View>
        <View>
        <Text>
          {product.stock} unidades no Brasil
        </Text>
        </View>
        <View>
        <Text>
          {product.stock} unidades no mundo
        </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  condition: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ea1d25",
    borderRadius: 15,
    marginTop: 50,
    width: 150,
    height: 50,
  },
  textCondition: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    fontFamily: "K2D_700Bold",
    maxWidth: 100,
  },
  cart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#26919B",
    borderRadius: 15,
    marginTop: 50,
    width: 150,
    height: 50,
    margin: 10,
  },
  favorite: {
    width: 45,
    height: 45,
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    backgroundColor: "#ea1d25",
    borderRadius: 15,
  },
});
