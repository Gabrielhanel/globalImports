import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, SafeAreaView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, K2D_100Thin, K2D_700Bold, K2D_800ExtraBold, K2D_500Medium, K2D_300Light, K2D_600SemiBold, K2D_200ExtraLight } from "@expo-google-fonts/k2d";
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    K2D_100Thin,
    K2D_200ExtraLight,
    K2D_500Medium,
    K2D_300Light,
    K2D_700Bold,
    K2D_600SemiBold,
    K2D_800ExtraBold
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
    loadAssets();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.container}>
        <Image source={require("./src/media/logo.png")} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

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
        <Routes />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
