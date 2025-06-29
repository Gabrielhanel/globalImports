import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { register } from "../../services/AuthService";

// Funções de validação
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (parseInt(cpf[9]) !== digito1) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return parseInt(cpf[10]) === digito2;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14 || /^(.)\1{13}$/.test(cnpj)) return false;

  let mult1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let mult2 = [6].concat(mult1);

  let soma = cnpj.split("").slice(0, 12).reduce((acc, val, i) => acc + parseInt(val) * mult1[i], 0);
  let dig1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (parseInt(cnpj[12]) !== dig1) return false;

  soma = cnpj.split("").slice(0, 13).reduce((acc, val, i) => acc + parseInt(val) * mult2[i], 0);
  let dig2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return parseInt(cnpj[13]) === dig2;
}

function formatarCpfCnpj(value) {
  let numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    numbers = numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    numbers = numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return numbers;
}

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); 


  const onDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }
  };

  const enviarDados = async () => {
    if (!firstName || !lastName || !email || !gender || !phone || !cpfCnpj || !password || !dataNascimento) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Email inválido!");
      return;
    }

    const documento = cpfCnpj.replace(/[^\d]+/g, "");
    if (documento.length === 11) {
      if (!validarCPF(documento)) {
        Alert.alert("Erro", "CPF inválido!");
        return;
      }
    } else if (documento.length === 14) {
      if (!validarCNPJ(documento)) {
        Alert.alert("Erro", "CNPJ inválido!");
        return;
      }
    } else {
      Alert.alert("Erro", "CPF ou CNPJ incompleto!");
      return;
    }

    if (dataNascimento > new Date()) {
      Alert.alert("Erro", "Data de nascimento inválida!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    try {
      setLoading(true);
      let user = { firstName, lastName, email, gender, phone, cpfCnpj, password, dataNascimento };
      const response = await register(user);
            if (response.error) {
        Alert.alert("Erro", response.error);
        return;
      }
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro inesperado", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={require("../../media/logo.png")} style={{ width: 100, height: 80, marginTop: 35 }} />
          <Text style={styles.slogan}>Informe-nos seus dados</Text>

          <View style={styles.areaFormulario}>
            <Text style={styles.textoNome}>Nome:</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome" onChangeText={setFirstName} />

            <Text style={styles.textoNome}>Sobrenome:</Text>
            <TextInput style={styles.input} placeholder="Digite seu sobrenome" onChangeText={setLastName} />

            <Text style={styles.textoNome}>Data de nascimento:</Text>
            <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
              <Text>{dataNascimento ? dataNascimento.toLocaleDateString('pt-BR') : 'Selecione sua data'}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={dataNascimento || new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <Text style={styles.textoNome}>E-mail:</Text>
            <TextInput style={styles.input} placeholder="Digite seu e-mail" onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.textoNome}>Gênero:</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              {["Masculino", "Feminino", "Outro"].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderOption, gender === g && styles.selectedGender]}
                  onPress={() => setGender(g)}
                >
                  <Text style={gender === g ? styles.selectedText : styles.unselectedText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.textoNome}>Número de Telefone:</Text>
            <TextInput style={styles.input} placeholder="Digite seu telefone" onChangeText={setPhone} keyboardType="phone-pad" />

            <Text style={styles.textoNome}>CPF ou CNPJ:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF ou CNPJ"
              value={cpfCnpj}
              onChangeText={(text) => setCpfCnpj(formatarCpfCnpj(text))}
              keyboardType="number-pad"
            />

            <Text style={styles.textoNome}>Senha: (Mínimo 6 caracteres)</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha" onChangeText={setPassword} secureTextEntry autoCorrect={false} />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Já é cadastrado? Voltar para a tela de login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={enviarDados}>
              <Text style={styles.botaoTexto}>{loading ? "Aguarde..." : "CADASTRE-SE"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slogan: {
    color: "#26919B",
    fontFamily: "K2D_700Bold",
    fontSize: 22,
  },
  areaFormulario: {
    flexDirection: "column",
    margin: 10,
        paddingBottom: 30,
  },
  textoNome: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999",
    color: "#000",
    height: 38,
    width: 300,
    padding: 10,
    marginBottom: 23,
    marginTop: 5,
  },
  botao: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26919B",
    borderRadius: 10,
    margin: 20,
    width: 270,
  },
  botaoTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  genderOption: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedGender: {
    backgroundColor: "#26919B",
    borderColor: "#26919B",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  unselectedText: {
    color: "#000",
  },
  link: {
    color: "black",
    fontFamily: "K2D_700Bold",
  },
});