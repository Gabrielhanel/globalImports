import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import GoBack from "../../components/goBack";
import Modal from "react-native-modal";
import { uploadImage } from "../../services/ImageService";
export default function EditProfile() {
  const [users] = useState({
    email: "sla@email.com",
    phone: "(99) 99999-9999",
  });

  const [email, setEmail] = useState(users.email);
  const [phone, setPhone] = useState(users.phone);
  const [imagem, setImagem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  //REGEX
  const formatarTelefone = (valor) => {
    // Remove tudo que não for número
    const somenteNumeros = valor.replace(/\D/g, "");

    // Aplica a máscara
    if (somenteNumeros.length <= 10) {
      return somenteNumeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return somenteNumeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const handleTelefoneChange = (valor) => {
    const formatado = formatarTelefone(valor);
    setPhone(formatado);
  };

  const pickImage = async () => {
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
      setImagem({ uri: imageUrl }); 
      Alert.alert("Sucesso!", "Imagem atualizada com sucesso.");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Erro!", "Ocorreu um erro ao fazer o upload.");
  }
}
  };
  const save = () => {
    if (email === "" || phone === "") {
      Alert.alert("Preencha todos os campos corretamente!");
    } else {
      setModalVisible(!isModalVisible);
      const productData = {
      email,
      phone,
      imageUrl: imagem?.uri,
    };
    console.log(productData);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <GoBack />
      </View>
      <Text style={styles.label}>Alterar foto de perfil:</Text>
      <View style={styles.containerImage}>
        <View style={styles.backgroundImage}>
          {imagem && <Image source={{ uri: imagem.uri }} style={styles.image} />}
        </View>
        <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
          <Text style={styles.textButtonImage}>Fazer upload de foto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Alterar email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={users.email}
        style={styles.input}
      />

      <Text style={styles.label}>Alterar telefone:</Text>
      <TextInput
        keyboardType="numeric"
        value={phone}
        onChangeText={handleTelefoneChange}
        placeholder="Digite seu telefone"
        style={styles.input}
        maxLength={15}
      />

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "white",
              width: 200,
              height: 200,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "K2D_700Bold",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Salvo com sucesso!
            </Text>

            <TouchableOpacity
              onPress={save}
              style={{
                marginTop: 50,
                backgroundColor: "#26919B",
                width: 100,
                height: 40,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "K2D_700Bold",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Fechar
                </Text>
              </View>
            </TouchableOpacity>
            <View />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#797979",
    fontFamily: "K2D_700Bold",
    marginLeft: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
    padding: 10,
    width: 300,
    marginLeft: 35,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  backgroundImage: {
    borderRadius: 500,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.2,
    marginTop: 15,
    borderRadius: 50,
  },
  buttonImage: {
    backgroundColor: "#26919B",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  textButtonImage: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "K2D_700Bold",
  },
  button: {
    backgroundColor: "#26919B",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  textButton: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "K2D_700Bold",
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 10,
    paddingBottom: 10,
  },
});
