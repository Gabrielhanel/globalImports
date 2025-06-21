import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {OrderContext} from '../../contexts/orderContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
export default function MyOrders( {route}) {

  const navigation = useNavigation();

  const {order} = useContext(OrderContext);

    function searchDetailsProduct(pedido) {
  navigation.navigate("OrderProducts", { products: pedido.items });
}
 return (
   <View style={{flex: 1, backgroundColor: "#fff"}}>
             <TouchableOpacity onPress={() => navigation.popToTop()}>
               <Image source={require('./../../media/components/arrow.png')} style={styles.image}/>
             </TouchableOpacity>
     <Text style={styles.text}>Meus Pedidos:</Text>
<FlatList
  data={order}
  keyExtractor={(item) => item.id.toString()}
  showsVerticalScrollIndicator={false}
  ListEmptyComponent={<Text style={styles.textEmpty}>Nenhum pedido encontrado</Text>}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <View>
      <Text style={styles.pedido}>Pedido: {item.id}</Text>
      <Text style={styles.pagamento}>Pagamento: {item.methodPayment}</Text>
      <Text style={styles.total}>Total: R$ {item.totalValue}</Text>
      </View>
            <View>
      <TouchableOpacity onPress={() => searchDetailsProduct(item)}>
        <Image source={require('../../media/home/document_search.png')} style={styles.image}/>
      </TouchableOpacity>
    </View>

    </View>
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
