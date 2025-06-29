import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GoBack from '../../components/goBack';

export default function ProductFiltered({ route }) {
  const { filteredProducts } = route.params;

  return (
    <View style={styles.container}>
      <GoBack />
      <Text style={styles.title}>Produtos Filtrados</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
renderItem={({ item }) => (
  <View style={styles.card}>
    {item.images && item.images.length > 0 ? (
      <Image source={{ uri: item.images[0].image }} style={styles.image} />
    ) : (
      <View style={styles.placeholderImage}>
        <Text style={styles.placeholderText}>Sem imagem</Text>
      </View>
    )}
    <View style={styles.info}>
      <Text style={styles.model}>{item.model}</Text>
      <Text style={styles.price}>
        {item.currency === 'USD' ? '$' : item.currency} {item.price.toFixed(2)}
      </Text>
      <Text style={styles.details}>
        {item.year} • {item.car_type} • {item.propulsion === 'INTERNAL_COMBUSTION' ? 'Combustão' : 'Elétrico'}
      </Text>
      <Text style={styles.details}>
        {item.horse_power} HP • {item.doors} portas • {item.color}
      </Text>
    </View>
  </View>
)}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    alignItems: 'center',
    elevation: 2
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 4
  },
  placeholderImage: {
    width: 80,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    fontSize: 12,
    color: '#666'
  },
  info: {
    marginLeft: 10,
    flex: 1
  },
  model: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 14,
    color: '#00796b'
  },
  details: {
    fontSize: 12,
    color: '#666'
  }
});