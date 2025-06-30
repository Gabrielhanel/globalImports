import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import GoBack from '../../components/goBack';
import { useState } from 'react';
import { ScrollView } from 'react-native';
  import * as ImagePicker from "expo-image-picker";
  import { uploadImage } from "../../services/ImageService";
export default function EditProduct({ route }) {
  const { product } = route.params;

  const [brand, setBrand] = useState(product.brand || "");
  const [model, setModel] = useState(product.model || "");
  const [price, setPrice] = useState(`${product.price || ""}`);
  const [year, setYear] = useState(`${product.year || ""}`);
  const [motorization, setMotorization] = useState(product.motorization || "");
  const [horsePower, setHorsePower] = useState(`${product.horse_power || ""}`);
  const [torque, setTorque] = useState(product.torque || "");
  const [traction, setTraction] = useState(product.traction || "");
  const [propulsion, setPropulsion] = useState(product.propulsion || "");
  const [doors, setDoors] = useState(`${product.doors || ""}`);
  const [carConfiguration, setCarConfiguration] = useState(product.car_configuration || "");
  const [shift, setShift] = useState(product.shift || "");
  const [accelerationToHundred, setAccelerationToHundred] = useState(`${product.acceleration_to_hundred || ""}`);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [images, setImages] = useState([]);

  const pickImagePrincipal = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permissão negada", "É necessário permitir o acesso à galeria.");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,
    base64: true,
  });

  if (!result.canceled) {
    try {
      const { imageUrl, error } = await uploadImage(result.assets[0].base64);
      if (error) {
        Alert.alert("Erro!", "Não foi possível fazer o upload da imagem.");
      } else {
        setImagemPrincipal({ uri: imageUrl });
        Alert.alert("Sucesso!", "Imagem atualizada com sucesso.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro!", "Ocorreu um erro ao fazer o upload.");
    }
  }
};

const pickImagesCar = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permissão negada", "É necessário permitir o acesso à galeria.");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,
    base64: true,
  });

  if (!result.canceled) {
    try {
      const { imageUrl, error } = await uploadImage(result.assets[0].base64);
      if (error) {
        Alert.alert("Erro!", "Não foi possível fazer o upload da imagem.");
      } else {
        setImages((prev) => [...prev, { uri: imageUrl }]);
        Alert.alert("Sucesso!", "Imagem adicionada à galeria.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro!", "Ocorreu um erro ao fazer o upload.");
    }
  }
};

async function handleEditProduct() {
  const editedProduct = {
    id: product.id,
    brand,
    model,
    price,
    year,
    motorization,
    horsePower,
    torque,
    traction,
    propulsion,
    doors,
    carConfiguration,
    shift,
    accelerationToHundred,
    coverImage: imagemPrincipal?.uri || product.cover_image,
  };
{/*
      gallery: images.length > 0 ? images.map(img => img.uri) : product.gallery
  */}

  
  // Aqui você pode enviar os dados para uma API ou apenas imprimir no console
  console.log(editedProduct);

  // Exemplo: alerta só para mostrar que clicou no botão
  alert("Produto editado com sucesso!");
}
  return (
    <ScrollView style={styles.container}>
      <GoBack />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Editar Produto</Text>
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#26919B", fontFamily: "K2D_700Bold" }}>Foto de Capa</Text>
  <View
    style={{
      width: "100%",
      height: 200,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      backgroundColor: "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    {(imagemPrincipal?.uri || product.cover_image) ? (
  <Image
    source={{ uri: imagemPrincipal?.uri || product.cover_image }}
    style={{ width: "100%", height: "100%" }}
    resizeMode="cover"
  />
) : (
  <Text style={{ color: "#aaa" }}>Nenhuma imagem selecionada</Text>
)}
  </View>
  <TouchableOpacity style={styles.button} onPress={pickImagePrincipal}>
    <Text style={styles.buttonText}>Alterar foto de capa</Text>
  </TouchableOpacity>
</View>

<View style={{ alignItems: "center" }}>
  <Text style={styles.title}>Galeria de Fotos</Text>
  {images.length > 0 || (product.gallery && product.gallery.length > 0) ? (
    <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
      {(images.length > 0 ? images : product.gallery.map((url) => ({ uri: url }))).map((img, index) => (
        <Image
          key={index}
          source={{ uri: img.uri }}
          style={{ width: 120, height: 120, borderRadius: 10, margin: 5 }}
        />
      ))}
    </ScrollView>
  ) : (
    <Text style={{ color: "#aaa", marginBottom: 10 }}>Nenhuma imagem selecionada</Text>
  )}
  <TouchableOpacity style={styles.button} onPress={pickImagesCar}>
    <Text style={styles.buttonText}>Adicionar fotos à galeria</Text>
  </TouchableOpacity>
</View>
      <View style={[styles.inputContainer, { marginTop: 50 }]}>
        <Text style={styles.text}> Marca:</Text>
      <TextInput
        placeholder={`${product.brand || ""}`}
        style={styles.input}
        onChangeText={setBrand}
        value={brand}
      />
    </View>

    <View style={styles.inputContainer}>
    <Text style={styles.text}>Modelo:</Text>
      <TextInput
        placeholder={`${product.model || ""}`}
        style={styles.input}
        onChangeText={setModel}
        value={model}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Preço:</Text>
      <TextInput
        placeholder={`${product.price || ""}`}
        style={styles.input}
        onChangeText={setPrice}
        value={price}
      />
      </View>

    <View style={styles.inputContainer}>
      <Text style={styles.text}>Ano:</Text>
      <TextInput
        placeholder={`${product.year || ""}`}
        style={styles.input}
        onChangeText={setYear}
        value={year}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Motorização:</Text>
      <TextInput
        placeholder={`${product.motorization || ""}`}
        style={styles.input}
        onChangeText={setMotorization}
        value={motorization}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Potência:</Text>
      <TextInput
        placeholder={`${product.horse_power || ""}`}
        style={styles.input}
        onChangeText={setHorsePower}
        value={horsePower}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Torque:</Text>
      <TextInput
        placeholder={`${product.torque || ""}`}
        style={styles.input}
        onChangeText={setTorque}
        value={torque}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Tração:</Text>
      <TextInput
        placeholder={`${product.traction || ""}`}
        style={styles.input}
        onChangeText={setTraction}
        value={traction}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Propulsão:</Text>
      <TextInput
        placeholder={`${product.propulsion || ""}`}
        style={styles.input}
        onChangeText={setPropulsion}
        value={propulsion}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Portas:</Text>
      <TextInput
        placeholder={`${product.doors || ""}`}
        style={styles.input}
        onChangeText={setDoors}
        value={doors}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Configuração do carro:</Text>
      <TextInput
        placeholder={`${product.car_configuration || ""}`}
        style={styles.input}
        onChangeText={setCarConfiguration}
        value={carConfiguration}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Transmissão:</Text>
      <TextInput
        placeholder={`${product.shift || ""}`}
        style={styles.input}
        onChangeText={setShift}
        value={shift}
      />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.text}>Aceleração 0-100:</Text>
      <TextInput
        placeholder={`${product.acceleration_to_hundred || ""}`}
        style={styles.input}
        onChangeText={setAccelerationToHundred}
        value={accelerationToHundred}
      />
      </View>


      <View style={{ alignItems: 'center', marginBottom: 80 }}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleEditProduct(
        product.id, brand, model, price, year, motorization,
        horsePower, torque, traction, propulsion, doors,
        carConfiguration, shift, accelerationToHundred
      )}
    >
      <Text style={styles.buttonText}>Salvar</Text>
    </TouchableOpacity>
  </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: 230,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10
  },
  text: {
    fontSize: 16,
    marginRight: 10,
    fontFamily: "K2D_700Bold",
    color: "#000"
  },
  button: {
    backgroundColor: '#26919B',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    padding: 10,
    height: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
