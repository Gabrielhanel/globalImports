import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function Login({ navigation }) {
  const { signIn } = useAuth();
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const enviarDados = async () => {
    if (emailOrNumber === "" || password === "") {
      alert("Preencha todos os campos!");
      return false;
    }

    // Validação de email se for email
    if (emailOrNumber.includes("@") && !isValidEmail(emailOrNumber)) {
      alert("Email inválido!");
      return false;
    }

    try {
      setLoading(true);
      const response = await signIn({ emailOrNumber, password });
      if (response?.error) {
        Alert.alert("Erro", response.error);
        return false;
      }
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      return true;
    } catch (error) {
      Alert.alert("Erro inesperado", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, marginTop: -50 }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../media/logo.png")}
          style={{ width: 200, height: 160, marginBottom: 30 }}
        />
        <View style={styles.areaFormulario}>
          <Text style={styles.textoNome}>E-mail ou CPF:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o CPF ou Email"
            underlineColorAndroid="transparent"
            onChangeText={setEmailOrNumber}
            value={emailOrNumber}
          />

          <Text style={styles.textoNome}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a sua senha"
            underlineColorAndroid="transparent"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            autoCorrect={false}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Deseja se cadastrar? Clique aqui.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={async () => {
              const success = await enviarDados();
              if (success) {
                navigation.navigate("MainTabs", { user: emailOrNumber });
              }
            }}
          >
            <Text style={styles.botaoTexto}>
              {loading ? "Carregando..." : "ACESSAR"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  areaFormulario: {
    flexDirection: "column",
    margin: 10,
  },
  textoNome: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999999",
    color: "#000000",
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
    color: "#FFFFFF",
  },
  link: {
    color: "black",
    fontFamily: "K2D_700Bold",
  },
});