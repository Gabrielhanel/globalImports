import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

// Páginas
import HomeScreen from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchScreen from "../pages/Search";
import Cart from "../pages/ShoppingCart";
import Favorite from "../pages/Favorite";
import User from "../pages/Profile";
import Product from "../pages/Home/Product";
import EditProfile from "../pages/Profile/EditProfile";
import Address from "../pages/Profile/Address";
import Filter from "../pages/Search/Filter";

// Contextos
import CardProductProvider from "../contexts/cardProduct";
import { FavoritesProvider } from "../contexts/favoriteContext";
import CartProvider from "../contexts/CartContext";

// Navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <CardProductProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#26919B",
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 90,
            paddingTop: 10,
            elevation: 10,
            shadowColor: "#000",
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
            tabBarIcon: ({ color }) => <Feather name="search" color={color} size={27} />,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favorite}
          options={{
            tabBarIcon: ({ color }) => <Feather name="heart" color={color} size={27} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name="home" color={color} size={27} />,
          }}
        />
        <Tab.Screen
          name="Carrinho"
          component={Cart}
          options={{
            tabBarIcon: ({ color }) => <Feather name="shopping-cart" color={color} size={27} />,
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </CardProductProvider>
  );
}

export default function Routes() {
  return (
    <CartProvider>
      <CardProductProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs">
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
              <Stack.Screen name="MainTabs" component={TabRoutes} options={{ headerShown: false }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
              <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
              <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </CardProductProvider>
    </CartProvider>
  );
}
