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
              source={require("../../media/home/mustang-logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/Koenigsegg-logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/tesla-logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={require("../../media/home/logo-ferrari.png")}
              style={[styles.image, {maxWidth: 100, maxHeight: 100}]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  image: {
    maxWidth: 60,
    maxHeight: 50,
    padding: 5,
    overflow: "hidden",
    margin: 5,
  },
  areaImage: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    width: 120,
    height: 50,
  },
});
