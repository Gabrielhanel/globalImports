import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function QuickFilter() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexDirection: "row" }} horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.areaImage}>
          <Image source={require("../../media/home/Gucci.png")} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.areaImage}>
          <Image source={require("../../media/home/chanel.png")} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.areaImage}>
          <Image source={require("../../media/home/dior.png")} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.areaImage}>
          <Image source={require("../../media/home/dolce-gabbana.png")} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.areaImage}> 
          <Image source={require("../../media/home/calvin-klein.png")} style={styles.image}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
    padding: 5,
    overflow: 'hidden',
    borderRadius: 65
  },
  areaImage: {
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 4,
    borderRadius: 5
  }
});