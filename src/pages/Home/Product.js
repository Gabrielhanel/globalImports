import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import GoBack from "../../components/goBack";
import ButtonLike from "../../components/ButtonLike";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function Home({ route }) {
  const { cart, addProduct } = useContext(CartContext);

  function handleAddProduct(product) {
    addProduct(product);
  }

  const { product, images } = route.params;
  return (
    <ScrollView>
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
          <TouchableOpacity style={styles.cart} onPress={() => handleAddProduct(product)} >
            <Text style={styles.textCondition}>Adicionar ao carrinho</Text>
            <Image
              source={require("../../media/home/shopping_cart.png")}
              style={{ width: 30, height: 30, marginRight: 55 }}
            />
          </TouchableOpacity>
          <ButtonLike product={product} />
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
              <Image
                source={{ uri: item }}
                style={{ width: 300, height: 270 }}
              />
            </View>
          )}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.brand}>{product.brand?.toUpperCase()}</Text>
          <Text style={styles.title}>{product.title}</Text>
        </View>
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View>
          <Text style={styles.price}>R${product.price}</Text>
          <Text style={styles.priceWorld}>US${product.price}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../media/home/brasil.png")}
              style={{ width: 35, height: 35 }}
            />
            <Text style={styles.textStock}>
              {product.stock} unidades no Brasil
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../media/home/world.png")}
              style={{ width: 35, height: 35 }}
            />
            <Text style={styles.textStock}>
              {product.stock} unidades no mundo
            </Text>
          </View>
        </View>
        <Text style={styles.fichatitle}>Ficha Técnica:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <View>
            <Text style={styles.specTitle}>Marca</Text>
            <Text style={styles.specValue}>Ferrari</Text>

            <Text style={styles.specTitle}>Modelo</Text>
            <Text style={styles.specValue}>LaFerrari</Text>

            <Text style={styles.specTitle}>Ano</Text>
            <Text style={styles.specValue}>2015</Text>

            <Text style={styles.specTitle}>Motorização</Text>
            <Text style={styles.specValue}>V12 6.3L</Text>
          </View>

          <View>
            <Text style={styles.specTitle}>Potência</Text>
            <Text style={styles.specValue}>963cv</Text>

            <Text style={styles.specTitle}>Torque</Text>
            <Text style={styles.specValue}>71,4kg/fm</Text>

            <Text style={styles.specTitle}>Tração</Text>
            <Text style={styles.specValue}>Traseira</Text>

            <Text style={styles.specTitle}>Propulsão</Text>
            <Text style={styles.specValue}>Híbrida</Text>
          </View>

          <View style={{ paddingBottom: 50 }}>
            <Text style={styles.specTitle}>Portas</Text>
            <Text style={styles.specValue}>2</Text>

            <Text style={styles.specTitle}>Configuração</Text>
            <Text style={styles.specValue}>Coupé</Text>

            <Text style={styles.specTitle}>Câmbio</Text>
            <Text style={styles.specValue}>Automático</Text>

            <Text style={styles.specTitle}>0–100km/h</Text>
            <Text style={styles.specValue}>2,5s</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  brand: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
    marginRight: 8,
    fontFamily: "K2D_700Bold",
  },
  title: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "600",
    maxWidth: 150,
    textAlign: "center",
    fontFamily: "K2D_100Thin",
  },
  description: {
    fontSize: 13,
    maxWidth: 340,
    textAlign: "left",
    justifyContent: "flex-start",
    color: "#797979",
    fontFamily: "K2D_100Thin",
  },
  price: {
    fontFamily: "K2D_700Bold",
    fontSize: 30,
    marginLeft: 30,
    color: "#26919B",
    fontWeight: "bold",
  },
  priceWorld: {
    fontFamily: "K2D_700Bold",
    fontSize: 24,
    marginLeft: 30,
    color: "red",
    fontWeight: "bold",
  },
  textStock: {
    fontFamily: "K2D_100Thin",
    fontSize: 15,
    marginLeft: 12,
    color: "#797979",
    maxWidth: 130,
    textAlign: "center",
  },
  fichatitle: {
    fontFamily: "K2D_700Bold",
    marginTop: 20,
    textAlign: "center",
    fontSize: 22,
    marginLeft: 30,
    color: "#00000",
    fontWeight: "bold",
  },
  specTitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#797979",
    marginTop: 8,
    fontFamily: "K2D_100Thin",
  },
  specValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "K2D_700Bold",
  },
});
