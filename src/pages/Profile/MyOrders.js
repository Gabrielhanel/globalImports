import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {OrderContext} from '../../contexts/orderContext';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/Api';
import axios from 'axios';
export default function MyOrders( {route}) {

  const navigation = useNavigation();

  const {order} = useContext(OrderContext);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`/orders/${user.id}/items`);
        setOrder(response.data.items); // ou .order dependendo do retorno da sua API
      } catch (err) {
        console.error("Erro ao buscar pedidos", err);
      }
    }
    fetchOrder();
  }, []);

    function searchDetailsProduct(pedido) {
  navigation.navigate("OrderProducts", { products: pedido.items });
}
return (
    <View style={styles.container}>
      <FlatList
        data={order}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Product", { product: item })}>
            <View style={styles.card}>
              <Text style={styles.item}>{item.title}</Text>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <Text style={styles.price}>R$ {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({

  text: {
    fontSize: 27,
    color: "#26919B",
    textAlign: "center",
    marginLeft: 15,
    marginTop: 30,
    padding: 10,
    fontFamily: "K2D_700Bold",
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },

  pedido: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_700Bold",
  },

  pagamento: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_700Bold",
  },

  total: {
    fontSize: 18,
    maxWidth: 180,
    fontFamily: "K2D_700Bold",
  },

  textEmpty: {
    fontSize: 20,
    color: "#696969",
    textAlign: "center",
    marginLeft: 15,
    marginTop: 300,
    padding: 10,
    fontFamily: "K2D_700Bold",
  },
      image: {
        width: 50,
        height: 50,
        marginTop: 35,
        marginLeft: 60,
        marginRight: -10
    }
})
