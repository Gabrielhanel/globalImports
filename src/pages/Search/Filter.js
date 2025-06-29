import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import GoBack from "../../components/goBack";
export default function FilterScreen() {
  const [order, setOrder] = useState(null);
  const [filter, setFilter] = useState(null);
  
  const orderOptions = [
    { label: "Nome (A-Z)", value: "name_asc" },
    { label: "Nome (Z-A)", value: "name_desc" },
    { label: "Preço (maior)", value: "price_desc" },
    { label: "Preço (menor)", value: "price_asc" },
  ];

  const filterOptions = [
    { label: "Todos", value: "all" },
    { label: "Marca", value: "brand" },
    { label: "Esportivo", value: "sport" },
    { label: "SUV", value: "suv" },
    { label: "Clássico", value: "classic" },
    { label: "Pick-up", value: "pickup" },
    { label: "Elétrico", value: "electric" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 20}}>
      <GoBack />
    </View>
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Filtrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
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