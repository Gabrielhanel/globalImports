import { View } from 'react-native';
import Visitor from './Visitor';
import UserProfile from './UserProfile';
import Store from './Store';
import { useAuth } from '../../contexts/AuthContext';

export default function User() {
  const { user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        user.userType === 'store' ? (
          <Store />
        ) : (
          <UserProfile />
        )
      ) : (
        <Visitor />
      )}
    </View>
  );
}