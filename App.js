import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/pages/Home";
import { StyleSheet, View, Image, SafeAreaView, Platform } from "react-native";
import Login from "./src/pages/Login";
import { useFonts, K2D_100Thin, K2D_700Bold } from "@expo-google-fonts/k2d";
import Register from "./src/pages/Register";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./src/pages/Search";
import Cart from "./src/pages/ShoppingCart";
import Favorite from "./src/pages/Favorite";
import User from "./src/pages/Profile";
import Product from "./src/pages/Home/Product";
import EditProfile from "./src/pages/Profile/EditProfile";
import CardProductProvider from "./src/contexts/cardProduct";
import Address from "./src/pages/Profile/Address";
import Filter from "./src/pages/Search/Filter";
import { FavoritesProvider } from "./src/contexts/favoriteContext";
import CartProvider from "./src/contexts/CartContext"
// Criando a navegação
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import Feather from "react-native-vector-icons/Feather";

export default function App() {
  // Carrega as fontes
  const [fontsLoaded] = useFonts({
    K2D_100Thin,
    K2D_700Bold,
  });

  // Definindo o estado de loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula a espera para carregar dados
    async function loadCoins() {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
      setLoading(false);
    }

    loadCoins();
  }, []);

  // Se a fonte não estiver carregada ou estiver em loading, retorna a tela de carregamento
  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("./src/media/logo.png")}
          style={{ width: 200, height: 200, backgroundColor: "white" }}
        />
      </View>
    );
  }
  function TabRoutes() {
    return (
      <CardProductProvider>
      <Tab.Navigator
      initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#26919B", // cor quando o ícone está ativo

          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 90,
            paddingTop: 10,
            elevation: 10, // Android: sombra
            shadowColor: "#000", // iOS: sombra
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          },
        }}
      >
        <Tab.Screen
          name="Lupa"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" color={color} size={27} />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favorite}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" color={color} size={27} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={27} />
            ),
          }}
        />
        <Tab.Screen
          name="Carrinho"
          component={Cart}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-cart" color={color} size={27} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      </CardProductProvider>
    );
  }
  // Quando o carregamento e as fontes estiverem prontos, renderiza a navegação
  return (
    <>
    <StatusBar style="auto" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <CartProvider>
        <CardProductProvider>
                  <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Product"
              component={Product}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainTabs"
              component={TabRoutes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Address"
              component={Address}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="Filter" 
            component={Filter} 
            options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </FavoritesProvider>
        </CardProductProvider>
                </CartProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
