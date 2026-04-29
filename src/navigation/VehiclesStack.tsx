//#region react imports
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//#endregion

//#region type imports
import type { VehiclesStackParamList } from './types';
//#endregion

//#region screen imports
import VehiclesListScreen from '@/screens/VehiclesListScreen';
import VehicleDetailScreen from '@/screens/VehicleDetailScreen';
//#endregion

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
          title: route.params.vehicleId,
        })}
      />
    </Stack.Navigator>
  );
}