import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GoBack() {
 const navigation = useNavigation();
 return (
    <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./../media/components/arrow.png')} style={styles.image}/>
        </TouchableOpacity>
     </View>
  );
}
const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        marginTop: 55,
        marginLeft: 30,
        marginRight: -10
    }
})