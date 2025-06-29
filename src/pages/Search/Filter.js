import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import GoBack from "../../components/goBack";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/Api";

export default function FilterScreen() {
  const [order, setOrder] = useState(null);
  const [filter, setFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(products);
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
  const orderOptions = [
    { label: "Nome (A-Z)", value: "name_asc" },
    { label: "Nome (Z-A)", value: "name_desc" },
    { label: "Preço (maior)", value: "price_desc" },
    { label: "Preço (menor)", value: "price_asc" },
  ];

  const filterOptions = [
    { label: "Todos", value: "all" },
//    { label: "Marca", value: "brand" },
    { label: "Esportivo", value: "sport" },
    { label: "SUV", value: "suv" },
    { label: "Clássico", value: "classic" },
    { label: "Pick-up", value: "pickup" },
    { label: "Elétrico", value: "electric" },
  ];
const applyFilter = () => {
  let filtered = [...products];

  // 🔹 Aplicar filtro de categoria
  if (filter && filter !== 'all') {
    if (filter === 'brand') {
      filtered = filtered.filter(p => p.brand === 'SUA_CONDICAO_AQUI'); 
      // ou crie uma lógica para escolher marca específica
    } else if (filter === 'sport') {
      filtered = filtered.filter(p => p.category === 'SPORTS');
    } else if (filter === 'suv') {
      filtered = filtered.filter(p => p.car_type === 'SUV');
    } else if (filter === 'classic') {
      filtered = filtered.filter(p => p.category === 'CLASSIC');
    } else if (filter === 'pickup') {
      filtered = filtered.filter(p => p.car_type === 'PICKUP');
    } else if (filter === 'electric') {
      filtered = filtered.filter(p => p.propulsion === 'ELECTRIC');
    }
  }

  // 🔹 Aplicar ordenação
  if (order === 'name_asc') {
    filtered.sort((a, b) => a.model.localeCompare(b.model));
  } else if (order === 'name_desc') {
    filtered.sort((a, b) => b.model.localeCompare(a.model));
  } else if (order === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (order === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  setDisplayedProducts(filtered);
  return filtered;
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GoBack />
      <View style={{ alignItems: "center" }}>

      <Text style={styles.sectionTitle}>Ordenar por:</Text>
      <View style={styles.box}>
        {orderOptions.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => setOrder(opt.value)}
            style={[
              styles.option,
              order === opt.value && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                order === opt.value && styles.selectedOptionText,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Filtrar por:</Text>
      <View style={styles.box}>
        {filterOptions.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => setFilter(opt.value)}
            style={[
              styles.option,
              filter === opt.value && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                filter === opt.value && styles.selectedOptionText,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

<TouchableOpacity 
  style={styles.button}
  onPress={() => {
    const filtered = applyFilter();
    navigation.navigate('ProductFiltered', { filteredProducts: filtered });
  }}
>
  <Text style={styles.buttonText}>Filtrar</Text>
</TouchableOpacity>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  box: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#666",
  },
  selectedOption: {
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
  },
  selectedOptionText: {
    color: "#00796b",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00796b",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});