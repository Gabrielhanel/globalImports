import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import calendar

//bugs para correção:
// 1. A data de nascimento precisa ser validada para não permitir datas futuras, 
// questão do cadastro da imagem da foto de perfil, verificar se sera obrigatório ou não

// Funções de validação
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

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
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14 || /^(.)\1{13}$/.test(cnpj)) return false;

  let multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let multiplicador2 = [6].concat(multiplicador1);

  let soma = cnpj.split('').slice(0, 12).reduce((acc, val, i) => acc + parseInt(val) * multiplicador1[i], 0);
  let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (parseInt(cnpj[12]) !== digito1) return false;

  soma = cnpj.split('').slice(0, 13).reduce((acc, val, i) => acc + parseInt(val) * multiplicador2[i], 0);
  let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return parseInt(cnpj[13]) === digito2;
}

// Máscara para CPF e CNPJ
function formatarCpfCnpj(value) {
  let numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    numbers = numbers.replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    numbers = numbers.replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return numbers;
}

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const enviarDados = () => {
    const documento = cpfCnpj.replace(/[^\d]+/g, '');

    if (documento.length !== 11 && documento.length !== 14) {
      Alert.alert("CPF ou CNPJ inválido!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Email inválido!");
    }

    if (documento.length === 11 && !validarCPF(documento)) {
      Alert.alert("CPF inválido!");
      return;
    }

    if (documento.length === 14 && !validarCNPJ(documento)) {
      Alert.alert("CNPJ inválido!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    const date = new Date();
    if (selectedDate > date) {
      Alert.alert("Data de nascimento inválida!");
      return;
    }

    if (!firstName || !lastName || !email | !gender || !phone || !cpfCnpj || !password || !isValidEmail) {
      Alert.alert('Preencha todos os campos corretamente!');
      return;
    }

    alert(
      'Dados enviados com sucesso!! \n\n' +
      `Nome: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Gênero: ${gender}\n` +
      `Telefone: ${phone}\n` +
      `CPF/CNPJ: ${cpfCnpj}\n` +
      `Senha: ${password}\n` +
      `Data de nascimento: ${selectedDate}\n`
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('../../media/logo.png')} style={{ width: 100, height: 80, marginTop: 35 }} />

          <Text style={styles.slogan}> Informe-nos seus dados </Text>

          <View style={styles.areaFormulario}>
            <Text style={styles.textoNome}>Nome:</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome" onChangeText={setFirstName} />

            <Text style={styles.textoNome}>Sobrenome:</Text>
            <TextInput style={styles.input} placeholder="Digite seu sobrenome" onChangeText={setLastName} />

            <Text style={styles.textoNome}>Data de nascimento:</Text>
            <Calendar
              style={{
                backgroundColor: '#F2F2F2',
                borderRadius: 10,
                marginBottom: 25
              }}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: '#000',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: '#00adf5',
                monthTextColor: '#000',
                indicatorColor: '#000',
                textDayFontFamily: 'System',
                textMonthFontFamily: 'System',
                textDayHeaderFontFamily: 'System',
                textDayFontWeight: '400',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '400',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14
              }}
              onDayPress={(day) => {
                setSelectedDate(day.dateString); // exemplo: '2025-05-06'
              }}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: '#00adf5' },
              }}

            />

            <Text style={styles.textoNome}>E-mail:</Text>
            <TextInput style={styles.input} placeholder="Digite seu e-mail" onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.textoNome}>Gênero:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <TouchableOpacity
                style={[styles.genderOption, gender === 'Masculino' && styles.selectedGender]}
                onPress={() => setGender('Masculino')}
              >
                <Text style={gender === 'Masculino' ? styles.selectedText : styles.unselectedText}>Masculino</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.genderOption, gender === 'Feminino' && styles.selectedGender]}
                onPress={() => setGender('Feminino')}
              >
                <Text style={gender === 'Feminino' ? styles.selectedText : styles.unselectedText}>Feminino</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.genderOption, gender === 'Outro' && styles.selectedGender]}
                onPress={() => setGender('Outro')}
              >
                <Text style={gender === 'Outro' ? styles.selectedText : styles.unselectedText}>Outro</Text>
              </TouchableOpacity>
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
            <Text style={styles.textoNome}>Senha: (Minimo 6 caracteres)</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha" onChangeText={setPassword} secureTextEntry autoCorrect={false} />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Já é cadastrado? Voltar para a tela de login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={enviarDados}>
              <Text style={styles.botaoTexto}>CADASTRE-SE</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  slogan: {
    color: '#26919B',
    fontFamily: 'K2D_700Bold',
    fontSize: 22,
  },
  areaFormulario: {
    flexDirection: 'column',
    margin: 10,
  },
  textoNome: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#999',
    color: '#000',
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
    color: '#FFF',
  },
  genderOption: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedGender: {
    backgroundColor: '#26919B',
    borderColor: '#26919B',
  },
  selectedText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#000',
  },
  link: {
    color: 'black',
    fontFamily: 'K2D_700Bold',
  }
});