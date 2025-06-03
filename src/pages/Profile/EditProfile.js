import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import GoBack from "../../components/goBack";
import Modal from 'react-native-modal';

export default function EditProfile() {
  const [users] = useState({
    email: "sla@email.com",
    phone: "(99) 99999-9999",
  });

  const [email, setEmail] = useState(users.email);
  const [phone, setPhone] = useState(users.phone);
  const [imagem, setImagem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagem(result.assets[0].uri);
    }
  };
        const save = () => {
          if (email === '' || phone === '') {
            Alert.alert('Preencha todos os campos corretamente!');
          } else {
                setModalVisible(!isModalVisible);
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
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.backgroundImage}>
          <Image
            source={
              imagem
                ? { uri: imagem }
                : require("../../media/profile/visitor.png")
            }
            style={styles.image}
            resizeMode="cover"
            backgroundColor="white"
          />
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'white', width: 200, height: 200, borderRadius: 20}}>
          <Text style={{fontFamily: 'K2D_700Bold', fontWeight: 'bold', textAlign: 'center'}}>Salvo com sucesso!</Text>

          <TouchableOpacity onPress={save} style={{marginTop: 50, backgroundColor: "#26919B", width: 100, height: 40, borderRadius: 10}}>
            <View style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10}}>
            <Text style={{fontFamily: 'K2D_700Bold', fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Fechar</Text>
            </View>
          </TouchableOpacity>
          <View/>
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
    borderColor: "#ccc",
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
});
