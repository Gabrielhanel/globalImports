import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import QuickFilter from "./quickFilter";
import { useNavigation } from "@react-navigation/native";
import { CardProductContext } from "../../contexts/cardProduct";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { products } = useContext(CardProductContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../media/logo.png")}
        style={{
          width: 110,
          height: 100,
          marginBottom: 30,
          alignSelf: "center",
        }}
      />
      <QuickFilter/>

<FlatList
  data={products}
  alignItems= "center"
  justifyContent= "center"
  keyExtractor={(item) => item.id?.toString() || item.name}
  contentContainerStyle={{ paddingBottom: 80 }}
  showsVerticalScrollIndicator={false}
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
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
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
    width: 330,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10,
    margin: 10,
    justifyContent: 'space-between',
    // Sombras no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  }
});