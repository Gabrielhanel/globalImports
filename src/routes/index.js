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
import Checkout from "../pages/ShoppingCart/Checkout";
import PurchaseConfirmated from "../pages/ShoppingCart/PurchaseConfirmated"
import MyOrders from "../pages/Profile/MyOrders";

//TODO: colocar os contextos no app.js
// Contextos
import CardProductProvider from "../contexts/cardProduct";
import { FavoritesProvider } from "../contexts/favoriteContext";
import CartProvider from "../contexts/CartContext";
import { OrderContext, OrderProvider } from "../contexts/orderContext";

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
        <OrderProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs">
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
              <Stack.Screen name="MainTabs" component={TabRoutes} options={{ headerShown: false }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
              <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
              <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
              <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
              <Stack.Screen name="PurchaseConfirmated" component={PurchaseConfirmated} options={{ headerShown: false }} />
              <Stack.Screen name="MyOrders" component={MyOrders} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
          </OrderProvider>
        </FavoritesProvider>
      </CardProductProvider>
    </CartProvider>
  );
}

/*
Filtros de imagens para usar na tela home - LÓGICA


import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import api from '../services/Api';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [people, setPeople] = useState([]);
      const navigation = useNavigation();  

  useEffect(() => {
    async function loadPeople() {
      const response = await api.get('/people');
    const selectedIds = ['1', '2', '3', '4', '5', '13', '14', '20', '22', '44'];

    const filteredCharacters = response.data.filter(item => {
      const id = item.url.split('/').filter(Boolean).pop();
      return selectedIds.includes(id);
    });

    const images = {
      'Luke Skywalker': require('../img/luke.png'),
      'Leia Organa': require('../img/leia.png'),
      'Darth Vader': require('../img/darth_vader.png'),
      'Chewbacca': require('../img/chewbacca.png'),
      'Yoda': require('../img/yoda.png'),
      'Han Solo': require('../img/han-solo.png'),
      'C-3PO': require('../img/C3PO.png'),
      'R2-D2': require('../img/R2-D2.png'),
      'Darth Maul': require('../img/darth-maul.png'),
      'Boba Fett': require('../img/boba-fett.png'),
    };

    function getImage(name) {
      return images[name] || require('../img/capacete-stormtrooper.png');
    }

    const peopleWithImages = filteredCharacters.map(item => {
      return {
        ...item,
        image: getImage(item.name),
      };
    });
    
    setPeople(peopleWithImages);
    }
    loadPeople();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOLOCRON ARCHIVES</Text>
      <FlatList
      numColumns={2}
      key={'2columns'}
      keyExtractor={(item) => item.name}
      data={people}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => 
      <TouchableOpacity onPress={() => navigation.navigate('Person', {
        person: item,
        img: item.image,
      })}>
        <View>
            <View style={styles.card}>
              <Image source={item.image} style={styles.img} />
              <Text style={styles.nameCard}>{item.name.toUpperCase()}</Text>
          </View>
        </View>

      </TouchableOpacity>
      }
      />
      </View>
  )
}

*/
