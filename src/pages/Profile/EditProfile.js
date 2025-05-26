import { View, TextInput, Text, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import GoBack from '../../components/goBack';

export default function EditProfile() {
  const [users] = useState({
    name: "fulano",
    email: "sla@email.com",
    phone: "99999999999",
    cpf: "000.000.000-00"
  });

  const [email, setEmail] = useState(users.email);
  const [name, setName] = useState(users.name);
  const [phone, setPhone] = useState(users.phone);
  const [cpf, setCpf] = useState(users.cpf);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <GoBack />
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Editar Perfil</Text>
      <Text style={styles.label}>Alterar foto de perfil:</Text>

      <Text style={styles.label}>Alterar email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        style={styles.input}
      />

      <Text style={styles.label}>Alterar nome completo:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome completo"
        style={styles.input}
      />

      <Text style={styles.label}>Alterar CPF:</Text>
      <TextInput
        value={cpf}
        onChangeText={setCpf}
        placeholder="Digite seu CPF"
        style={styles.input}
      />

      <Text style={styles.label}>Alterar telefone:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Digite seu telefone"
        style={styles.input}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});