import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import Login from './src/components/Login';
import { useFonts, K2D_100Thin, K2D_700Bold,} from '@expo-google-fonts/k2d';
import Register from './src/components/Register';
import { StatusBar } from 'expo-status-bar';

// Criando a navegação
const Stack = createStackNavigator();

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
      await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
      setLoading(false);
    }

    loadCoins();
  }, []);

  // Se a fonte não estiver carregada ou estiver em loading, retorna a tela de carregamento
  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'white' }}>
        <Image 
          source={require('./src/media/logo.png')}
          style={{ width: 200, height: 200, backgroundColor: 'white' }}
        />
      </View>
    );
  }

  // Quando o carregamento e as fontes estiverem prontos, renderiza a navegação
  return (
    <>
      <StatusBar style="auto" />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});