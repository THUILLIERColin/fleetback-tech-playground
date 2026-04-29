//#region react imports
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//#endregion

//#region type imports
import type { ProfileStackParamList } from './types';
//#endregion
w
//#region screen imports
import ProfileScreen from '@/screens/ProfileScreen';
//#endregion

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Stack.Navigator>
  );
}