import { View, TextInput, Text, Image, TouchableOpacity, FlatList, StyleSheet  } from 'react-native';
import api from '../../services/Api';
import { useEffect, useState } from 'react';

export default function EditProfile( ) {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        //console.log('Dados recebidos:', response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };
    fetchData();
  }, []);

 return (
   <View>
    <Text>Alterar foto de perfil:</Text>
    <FlatList
    data={users}
     keyExtractor={(item) => item.id}
     renderItem={({ item }) => (
       <TextInput
       onChangeText={(text) => setEmail(text)}
       value={item.email}
       placeholder={item.email}
       />
     )}
    />

   </View>
  );
}