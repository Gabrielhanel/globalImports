import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/pages/HomeScreen";
import { StyleSheet, View, Image, SafeAreaView, Platform } from "react-native";
import Login from "./src/pages/Login";
import { useFonts, K2D_100Thin, K2D_700Bold } from "@expo-google-fonts/k2d";
import Register from "./src/pages/Register";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./src/pages/SearchScreen";
import Cart from "./src/pages/Cart";
import Favorite from "./src/pages/Favorite";
import User from "./src/pages/User";

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
            height: 70,
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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainTabs"
              component={TabRoutes}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
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
