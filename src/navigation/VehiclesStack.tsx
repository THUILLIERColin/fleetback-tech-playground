// src/navigation/VehiclesStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { VehiclesStackParamList } from './types';
import VehiclesListScreen from '../screens/VehiclesListScreen';
import VehicleDetailScreen from '../screens/VehicleDetailScreen';
import { CarFront } from 'lucide-react-native';
import { View } from 'react-native';

const Stack = createNativeStackNavigator<VehiclesStackParamList>();

export default function VehiclesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="VehiclesList"
        component={VehiclesListScreen}
        options={{
          title: 'Véhicules'
        }}
      />
      <Stack.Screen
        name="VehicleDetail"
        component={VehicleDetailScreen}
        options={({ route }) => ({
          // ✅ `route.params` est typé — TypeScript sait que plate existe
          title: route.params.vehicleId, // --- IGNORE ---
        })}
      />
    </Stack.Navigator>
  );
}