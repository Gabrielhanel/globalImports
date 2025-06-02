import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import GoBack from "../../components/goBack";
export default function Address() {
    const [address] = useState({
    cep: "99870-000",
    city: "Tupanci do Sul",
    street: "Rua ricas tupanci",
    numberHouse: "69",
    complement: "Casa",
    reference: "Casa do Ricas",
    uf: "RS",
    neighborhood: "Centro",
  });
  const [cep, setCep] = useState(address.cep);
  const [city, setCity] = useState(address.city);
  const [street, setStreet] = useState(address.street);
  const [numberHouse, setNumberHouse] = useState(address.numberHouse);
  const [complement, setComplement] = useState(address.complement);
  const [reference, setReference] = useState(address.reference);
  const [uf, setUf] = useState(address.uf);
  const [neighborhood, setNeighborhood] = useState(address.neighborhood);

  return (
    <View style={styles.container}>
      <View>
        <GoBack />
      </View>

      <View style={{ justifyContent: "center", padding: 20 }}>
        <Text style={styles.title}>Defina seu endereço</Text>
        <Text style={styles.text}>CEP: </Text>
        <TextInput
          placeholder="Cep"
          value={cep}
          onChangeText={setCep}
          style={styles.inputMaior}
        />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.text}>Cidade: </Text>
            <TextInput
              placeholder="Cidade"
              value={city}
              onChangeText={setCity}
              style={styles.inputMenor}
            />
            <Text style={styles.text}>Estado</Text>
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
              placeholder="Numero"
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
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.textBtn}>Salvar</Text>
      </TouchableOpacity>
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
    marginTop: 90,
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
    marginTop: 30}
  ,
  textBtn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "K2D_700Bold",
  },
});
