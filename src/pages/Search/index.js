import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useContext,useState } from 'react';
import { CardProductContext } from "../../contexts/cardProduct";
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();
    const { products } = useContext(CardProductContext);
    const [search, setSearch] = useState('');
    const filteredData = products.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

     return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
      <TextInput
        style={styles.input}
        placeholder="Procure algo inútil..."
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.btnFilter} onPress={() => navigation.navigate("Filter")}>
        <Image
        source={require("../../media/filter/filter.png")}
        style={styles.filter}
          />
      </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Product", {
                    product: item,
                    images: item.images,
                  })
                }
              >
                <View style={styles.card}>
                  <View>
                    <Text style={[styles.item, { fontWeight: "bold" }]}>
                      {item.brand?.toUpperCase()}
                    </Text>
                    <Text
                      style={[
                        styles.item,
                        { color: "#555", fontFamily: "K2D_400Regular" },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={[styles.item, { fontSize: 14, color: "#aaa" }]}>
                      {item.year || "2020"}
                    </Text>
                    <Text
                      style={[
                        styles.item,
                        {
                          fontSize: 18,
                          marginTop: 8,
                          color: "#009999",
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      R$ {item.price}
                    </Text>
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
        ListEmptyComponent={<Text>Nenhum item encontrado</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 40, flex: 1 },
  input: {
    width: '85%',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "K2D_700Bold",
    maxWidth: 200
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  card: {
    width: 360,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: 'space-between',
    // Sombras no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
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
    backgroundColor: '#BFBFBF',
        justifyContent: 'center',
    alignItems: 'center'
  }
})