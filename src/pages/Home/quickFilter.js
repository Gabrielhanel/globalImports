import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
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
              source={{ uri: "https://res.cloudinary.com/dsfqzbq9f/image/upload/v1751253317/mustang-logo_fturkz.png" }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsfqzbq9f/image/upload/v1751253317/tesla-logo_fsgsir.png" }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsfqzbq9f/image/upload/v1751253317/logo-ferrari_f4sgbh.png" }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.areaImage}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dsfqzbq9f/image/upload/v1751253317/Koenigsegg-logo_ljilzo.png" }}
              style={styles.image}
              resizeMode="contain"
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
    width: 60, // largura fixa
    height: 40, // altura fixa
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