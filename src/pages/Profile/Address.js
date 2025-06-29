import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import GoBack from "../../components/goBack";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/Api"

export default function Address() {
  const navigation = useNavigation();

  // Estados individuais
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");
  const [uf, setUf] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  // Carrega dados ao abrir a tela
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get("/user/address");
        const data = response.data;

        setCep(data.postal_code || "");
        setCity(data.city || "");
        setStreet(data.street || "");
        setNumberHouse(data.number || "");
        setComplement(data.complement || "");
        setReference(data.reference_point || "");
        setUf(data.state || "");
        setNeighborhood(data.neighborhood || "");
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        alert("Erro ao carregar o endereço.");
      }
    };

    fetchAddress();
  }, []);

  // Salva o endereço
  const saveAddress = async () => {
    try {
      const payload = {
        postal_code: cep,
        city,
        street,
        number: numberHouse,
        complement,
        reference_point: reference,
        state: uf,
        neighborhood,
      };

      await api.put("/user/address", payload);
      alert("Endereço salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      alert("Erro ao salvar endereço.");
    }
  };

  return (
    <View style={styles.container}>
      <GoBack />

      <View style={{ paddingHorizontal: 20, paddingVertical: 20}}>
        <Text style={styles.title}>Defina seu endereço</Text>

        <Text style={styles.text}>CEP:</Text>
        <TextInput
          placeholder="Cep"
          value={cep}
          onChangeText={setCep}
          style={styles.inputMaior}
        />

        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.text}>Cidade:</Text>
            <TextInput
              placeholder="Cidade"
              value={city}
              onChangeText={setCity}
              style={styles.inputMenor}
            />

            <Text style={styles.text}>Estado:</Text>
            <TextInput
              placeholder="Estado"
              value={uf}
              onChangeText={setUf}
              style={styles.inputMenor}
            />
          </View>

          <View>
            <Text style={styles.text}>Bairro:</Text>
            <TextInput
              placeholder="Bairro"
              value={neighborhood}
              onChangeText={setNeighborhood}
              style={styles.inputMenor}
            />

            <Text style={styles.text}>Número:</Text>
            <TextInput
              placeholder="Número"
              value={numberHouse}
              onChangeText={setNumberHouse}
              style={styles.inputMenor}
            />
          </View>
        </View>

        <Text style={styles.text}>Rua:</Text>
        <TextInput
          placeholder="Rua"
          value={street}
          onChangeText={setStreet}
          style={styles.inputMaior}
        />

        <Text style={styles.text}>Complemento:</Text>
        <TextInput
          placeholder="Complemento"
          value={complement}
          onChangeText={setComplement}
          style={styles.inputMaior}
        />

        <Text style={styles.text}>Referência:</Text>
        <TextInput
          placeholder="Referência"
          value={reference}
          onChangeText={setReference}
          style={styles.inputMaior}
        />

        <TouchableOpacity style={styles.btn} onPress={saveAddress}>
          <Text style={styles.textBtn}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 50,
    color: "#26919B",
    fontFamily: "K2D_700Bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#797979",
    fontFamily: "K2D_700Bold",
    marginLeft: 20,
    marginTop: 20,
  },
  inputMaior: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 300,
    marginLeft: 25,
    borderRadius: 10,
  },
  inputMenor: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 150,
    marginLeft: 15,
    borderRadius: 10,
  },
  btn: {
    width: 300,
    height: 40,
    backgroundColor: "#26919B",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 60,
    marginTop: 30,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "K2D_700Bold",
  },
});