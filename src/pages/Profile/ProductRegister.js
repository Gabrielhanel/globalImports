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
} from "react-native";
import GoBack from "../../components/goBack";

export default function ProductRegister() {
  // Estados dos campos
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [motorization, setMotorization] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [torque, setTorque] = useState("");
  const [traction, setTraction] = useState("");
  const [propulsion, setPropulsion] = useState("");
  const [doors, setDoors] = useState("");
  const [carConfiguration, setCarConfiguration] = useState("");
  const [shift, setShift] = useState("");
  const [accelerationToHundred, setAccelerationToHundred] = useState("");

const handleSave = () => {
  const newProduct = {
    brand,
    title,
    description,
    price: price.trim(), // valida string primeiro
    model,
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
  };

  if (
    !brand ||
    !title ||
    !description ||
    !price ||
    !model ||
    !year ||
    !motorization ||
    !horsePower ||
    !torque ||
    !traction ||
    !propulsion ||
    !doors ||
    !carConfiguration ||
    !shift ||
    !accelerationToHundred ||
    price < 0
  ) {
    Alert.alert("Erro", "Preencha todos os campos corretamente!");
    return;
  }

  if (doors !== "2" && doors !== "4") {
    Alert.alert("Erro", "Quantidade de portas inválida!");
    return;
  }

  if (shift !== "Automatico" && shift !== "Manual") {
    Alert.alert("Erro", "Tipo de transmissão inválido!");
    return;
  }

  if (accelerationToHundred < 0) {
    Alert.alert("Erro", "Aceleração para 100 km/h inválida!");
    return;
  }

  if(year < 1900 || year > new Date().getFullYear()) {
    Alert.alert("Erro", "Ano inválido!");
    return;
  }

  if (horsePower < 0 || torque < 0 || horsePower > 1000 || torque > 1000) {
    Alert.alert("Erro", "Potência e torque inválidos!");
    return;
  }

  
  const produtoFinal = {
    ...newProduct,
    price: parseFloat(price),
  };

  console.log("Produto criado:", produtoFinal);
  Alert.alert("Sucesso", newProduct);
};

  return (
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1,}}
    >
    <ScrollView style={styles.container}>
    <View style={{marginBottom: 30}}>
      <GoBack />
    </View>
      <Text style={styles.title}>Cadastrar Produto</Text>

      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Modelo</Text>
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={model}
        onChangeText={setModel}
      />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={year}
        keyboardType="numeric"
        onChangeText={setYear}
      />

      <Text style={styles.label}>Motorização</Text>
      <TextInput
        style={styles.input}
        placeholder="Motorização"
        value={motorization}
        onChangeText={setMotorization}
      />

      <Text style={styles.label}>Potência (cv)</Text>
      <TextInput
        style={styles.input}
        placeholder="Potência"
        value={horsePower}
        keyboardType="numeric"
        onChangeText={setHorsePower}
      />

      <Text style={styles.label}>Torque</Text>
      <TextInput
        style={styles.input}
        placeholder="Torque"
        value={torque}
        onChangeText={setTorque}
      />

      <Text style={styles.label}>Tração</Text>
      <TextInput
        style={styles.input}
        placeholder="Tração"
        value={traction}
        onChangeText={setTraction}
      />

      <Text style={styles.label}>Propulsão</Text>
      <TextInput
        style={styles.input}
        placeholder="Propulsão"
        value={propulsion}
        onChangeText={setPropulsion}
      />

      <Text style={styles.label}>Portas</Text>
      <TextInput
        style={styles.input}
        placeholder="Portas"
        value={doors}
        keyboardType="numeric"
        onChangeText={setDoors}
      />

      <Text style={styles.label}>Configuração</Text>
      <TextInput
        style={styles.input}
        placeholder="Configuração"
        value={carConfiguration}
        onChangeText={setCarConfiguration}
      />

      <Text style={styles.label}>Câmbio</Text>
      <TextInput
        style={styles.input}
        placeholder="Câmbio"
        value={shift}
        onChangeText={setShift}
      />

      <Text style={styles.label}>0–100km/h (s)</Text>
      <TextInput
        style={styles.input}
        placeholder="Aceleração"
        value={accelerationToHundred}
        keyboardType="numeric"
        onChangeText={setAccelerationToHundred}
      />

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
});