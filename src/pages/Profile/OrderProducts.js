import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import GoBack from '../../components/goBack';

export default function OrderProducts( { route }) {

    const { products } = route.params

    return (
        <View style={styles.container}>
                    < FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>
            <GoBack/>
            <Text style={styles.title}>Detalhes do Pedido: </Text>
            </View>}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
        )}
        />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    paddingTop: 20,
    fontFamily: "K2D_700Bold",
    color: "#26919B",
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