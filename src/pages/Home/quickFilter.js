import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";

export default function QuickFilter() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flexDirection: "row" }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/Gucci.png")}
              style={styles.image}
            />
            <Text style={styles.text}>GUCCI</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/chanel.png")}
              style={styles.image}
            />
            <Text style={styles.text}>CHANEL</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/dior.png")}
              style={styles.image}
            />
            <Text style={styles.text}>DIOR</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/dolce-gabbana.png")}
              style={styles.image}
            />
            <Text style={styles.text}>DOLCE & GABBANA</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/calvin-klein.png")}
              style={styles.image}
            />
            <Text style={styles.text}>CALVIN KLEIN</Text>
          </TouchableOpacity>
        </View>
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
    width: 50,
    height: 50,
    padding: 5,
    overflow: "hidden",
    borderRadius: 65,
    margin: 5,
  },
  areaImage: {
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    width: 120,
    height: 50,
  },
  text: {
    fontSize: 10,
    maxWidth: 50,
    color: "#000000",
    fontFamily: "K2D_800ExtraBold",
  },
});
