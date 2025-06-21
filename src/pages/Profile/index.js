import { View, Text } from 'react-native';
import Visitor from './Visitor';
import UserProfile from './UserProfile';
import Store from './Store';
export default function User() {
 return (
   <View style={{flex: 1}}>
    <Store/>
   </View>
  );
}