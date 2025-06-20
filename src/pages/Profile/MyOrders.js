import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {OrderContext} from '../../contexts/orderContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
export default function MyOrders( {route}) {

  const navigation = useNavigation();

  const {order} = useContext(OrderContext);

 return (
   <View style={{flex: 1}}>
             <TouchableOpacity onPress={() => navigation.popToTop()}>
               <Image source={require('./../../media/components/arrow.png')} style={styles.image}/>
             </TouchableOpacity>
     <Text style={styles.text}>Meus Pedidos:</Text>
<FlatList
  data={order}
  keyExtractor={(item) => item.id.toString()}
  ListEmptyComponent={<Text style={styles.textEmpty}>Nenhum pedido encontrado</Text>}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text style={styles.pedido}>Pedido: {item.id}</Text>
      <Text style={styles.pagamento}>Pagamento: {item.methodPayment}</Text>
      <Text style={styles.total}>Total: R$ {item.totalValue}</Text>
    </View>
  )}
/>
   </View>
  );
}

const styles = StyleSheet.create({

  text: {
    fontSize: 20,
    color: "#696969",
    textAlign: "left",
    marginLeft: 15,
    marginTop: 30,
    padding: 10,
    fontFamily: "K2D_700Bold",
  },

  item: {
    backgroundColor: "#fff",
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
        width: 40,
        height: 40,
        marginTop: 55,
        marginLeft: 30,
        marginRight: -10
    }
})
