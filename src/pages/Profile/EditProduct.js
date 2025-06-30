import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import GoBack from '../../components/goBack';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function EditProduct({ route }) {
  const { product } = route.params;

  const [brand, setBrand] = useState(product.brand || "");
  const [model, setModel] = useState(product.model || "");
  const [price, setPrice] = useState(`${product.price || ""}`);
  const [description, setDescription] = useState(product.description || "");
  const [year, setYear] = useState(`${product.year || ""}`);
  const [title, setTitle] = useState(product.title || "");
  const [motorization, setMotorization] = useState(product.motorization || "");
  const [horsePower, setHorsePower] = useState(`${product.horse_power || ""}`);
  const [torque, setTorque] = useState(product.torque || "");
  const [traction, setTraction] = useState(product.traction || "");
  const [propulsion, setPropulsion] = useState(product.propulsion || "");
  const [doors, setDoors] = useState(`${product.doors || ""}`);
  const [carConfiguration, setCarConfiguration] = useState(product.car_configuration || "");
  const [shift, setShift] = useState(product.shift || "");
  const [accelerationToHundred, setAccelerationToHundred] = useState(`${product.acceleration_to_hundred || ""}`);

  function handleEditProduct(
  id, brand, model, price, year, motorization, horsePower, torque, traction,
  propulsion, doors, carConfiguration, shift, accelerationToHundred
) {
  // Aqui você pode enviar os dados para uma API ou apenas imprimir no console
  console.log({
    id, brand, model, price, year, motorization, horsePower, torque, traction,
    propulsion, doors, carConfiguration, shift, accelerationToHundred
  });

  // Exemplo: alerta só para mostrar que clicou no botão
  alert("Produto editado com sucesso!");
}
  return (
    <ScrollView style={styles.container}>
      <GoBack />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Editar Produto</Text>
      </View>

      <View style={styles.inputContainer}>
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
