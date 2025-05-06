import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Login({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const enviarDados = () => {
    if (name === '' || password === '') {
      alert('Preencha todos os nomes corretamente!');
      return false;
    }
  
    alert(
      'Dados enviados com sucesso!! \n\n' + 
      'Nome : ' + name + '\n' + 
      'Senha: ' + password + '\n'
    );
    return true;
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../media/logo.png')}
        style={{ width: 200, height: 160, marginBottom: 30 }}
      />
      <View style={styles.areaFormulario}>
        <Text style={styles.textoNome}>E-mail ou CPF:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Digite o CPF ou Email"
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setName(texto)} 
        />

        <Text style={styles.textoNome}>Senha:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Digite a sua senha"
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setPassword(texto)} 
          secureTextEntry={true}
          autoCorrect={false}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Deseja se cadastrar? Clique aqui.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => {
          if (enviarDados()) {
          navigation.navigate('Home');
      }
    }}
          underlayColor="#000000"
>
          <Text style={styles.botaoTexto}>ACESSAR</Text>
        </TouchableOpacity>
      </View>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaFormulario: {
    flexDirection: 'column',
    margin: 10,
  },
  textoNome: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#999999',
    color: '#000000',
    height: 38,
    width: 300,
    padding: 10,
    marginBottom: 23,
    marginTop: 5,
  },
  botao: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26919B',
    borderRadius: 10,
    margin: 20,
    width: 270
  },
  botaoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  link: {
    color: 'black',
    fontFamily: 'K2D_700Bold',
  }
});