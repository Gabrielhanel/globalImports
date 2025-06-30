import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from "react-native";
import GoBack from "../../components/goBack";
  import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../services/ImageService";

export default function ProductRegister() {
  // Estados dos campos
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [motorization, setMotorization] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [torque, setTorque] = useState("");
  const [traction, setTraction] = useState("");
  const [propulsion, setPropulsion] = useState("");
  const [doors, setDoors] = useState("");
  const [carConfiguration, setCarConfiguration] = useState("");
  const [shift, setShift] = useState("");
  const [accelerationToHundred, setAccelerationToHundred] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [images, setImages] = useState([]);

    const pickImagePrincipal = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "É necessário permitir o acesso à galeria."
        );
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
        Alert.alert(
          "Permissão negada",
          "É necessário permitir o acesso à galeria."
        );
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
        setImages((prevImages) => [...prevImages, { uri: imageUrl }]);
        Alert.alert("Sucesso!", "Imagem atualizada com sucesso.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro!", "Ocorreu um erro ao fazer o upload.");
    }
  }
    };
  const handleSave = async () => {
    const newProduct = {
      brand,
      title,
      price: parseFloat(price),
      model,
      year: parseInt(year),
      motorization,
      horsePower: parseInt(horsePower),
      torque,
      traction,
      propulsion,
      doors: parseInt(doors),
      carConfiguration,
      shift,
      accelerationToHundred: parseFloat(accelerationToHundred),
        coverImage: imagemPrincipal?.uri,
    };
    
    {/*  gallery: images.map((img) => img.uri)*/}


    // Validações básicas
    if (
      !brand || !title || !price || !model || !year ||
      !motorization || !horsePower || !torque || !traction ||
      !propulsion || !doors || !carConfiguration || !shift || !accelerationToHundred
    ) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    if (newProduct.price < 0 || newProduct.horsePower < 0 || newProduct.doors < 0 || newProduct.accelerationToHundred < 0) {
      Alert.alert("Erro", "Verifique os valores numéricos!");
      return;
    }

    if (newProduct.year < 1900 || newProduct.year > new Date().getFullYear()) {
      Alert.alert("Erro", "Ano inválido!");
      return;
    }

    console.log("Produto criado:", newProduct);
    Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <GoBack />
        </View>

        <Text style={styles.title}>Cadastrar Produto</Text>

              <View style={styles.containerImage}>
  <View style={styles.backgroundImage}>
    {imagemPrincipal && (
      <Image source={{ uri: imagemPrincipal.uri }} style={styles.image} />
    )}
  </View>
<View style={{ alignItems: "center", marginBottom: 20 }}>
  <Text style={styles.label}>Foto de Capa</Text>
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
      overflow: "hidden"
    }}
  >
    {imagemPrincipal ? (
      <Image
        source={{ uri: imagemPrincipal.uri }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    ) : (
      <Text style={{ color: "#aaa" }}>Nenhuma imagem selecionada</Text>
    )}
  </View>
  <TouchableOpacity style={styles.buttonImage} onPress={pickImagePrincipal}>
    <Text style={styles.textButtonImage}>Fazer upload de foto da capa</Text>
  </TouchableOpacity>
</View>
<View style={{ alignItems: "center" }}>
  <Text style={styles.label}>Fotos do carro:</Text>

  {images.length > 0 ? (
    <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
      {images.map((img, index) => (
        <Image
          key={index}
          source={{ uri: img.uri }}
          style={{ width: 120, height: 120, borderRadius: 10, margin: 5 }}
        />
      ))}
    </ScrollView>
  ) : (
    <Text style={{ color: "#aaa", marginBottom: 10, marginTop: 10 }}>
      Nenhuma imagem selecionada
    </Text>
  )}

  <TouchableOpacity style={styles.buttonImage} onPress={pickImagesCar}>
    <Text style={styles.textButtonImage}>Fazer upload de fotos</Text>
  </TouchableOpacity>
</View>
</View>
        <Text style={styles.label}>Marca</Text>
        <TextInput style={styles.input} placeholder="Marca" value={brand} onChangeText={setBrand} />

        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Preço (US$)</Text>
        <TextInput style={styles.input} placeholder="Preço" value={price} keyboardType="numeric" onChangeText={setPrice} />

        <Text style={styles.label}>Modelo</Text>
        <TextInput style={styles.input} placeholder="Modelo" value={model} onChangeText={setModel} />

        <Text style={styles.label}>Ano</Text>
        <TextInput style={styles.input} placeholder="Ano" value={year} keyboardType="numeric" onChangeText={setYear} />

        <Text style={styles.label}>Motorização</Text>
        <TextInput style={styles.input} placeholder="Motorização" value={motorization} onChangeText={setMotorization} />

        <Text style={styles.label}>Potência (cv)</Text>
        <TextInput style={styles.input} placeholder="Potência" value={horsePower} keyboardType="numeric" onChangeText={setHorsePower} />

        <Text style={styles.label}>Torque</Text>
        <TextInput style={styles.input} placeholder="Torque" value={torque} onChangeText={setTorque} />

        <Text style={styles.label}>Tração</Text>
        <TextInput style={styles.input} placeholder="Tração" value={traction} onChangeText={setTraction} />

        <Text style={styles.label}>Propulsão</Text>
        <TextInput style={styles.input} placeholder="Propulsão" value={propulsion} onChangeText={setPropulsion} />

        <Text style={styles.label}>Portas</Text>
        <TextInput style={styles.input} placeholder="Portas" value={doors} keyboardType="numeric" onChangeText={setDoors} />

        <Text style={styles.label}>Configuração</Text>
        <TextInput style={styles.input} placeholder="Configuração" value={carConfiguration} onChangeText={setCarConfiguration} />

        <Text style={styles.label}>Câmbio</Text>
        <TextInput style={styles.input} placeholder="Câmbio" value={shift} onChangeText={setShift} />

        <Text style={styles.label}>0–100 km/h (s)</Text>
        <TextInput style={styles.input} placeholder="Aceleração" value={accelerationToHundred} keyboardType="numeric" onChangeText={setAccelerationToHundred} />

        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Salvar Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#26919B",
    fontFamily: "K2D_700Bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#797979",
    fontFamily: "K2D_700Bold",
    marginTop: 15,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontFamily: "K2D_700Bold",
    fontSize: 16,
    color: "#000",
  },
  btn: {
    backgroundColor: "#26919B",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 80,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "K2D_700Bold",
  },
  buttonImage: {
    backgroundColor: "#26919B",
    height: 45,
    width: 250,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  textButtonImage: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "K2D_700Bold",
  },
});