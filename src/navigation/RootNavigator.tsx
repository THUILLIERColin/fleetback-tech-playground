//#region packages imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CarFront, PersonStandingIcon } from 'lucide-react-native';
//#endregion

//#region type imports
import type { RootTabParamList } from './types';
//#endregion

//#region stack imports
import VehiclesStack from './VehiclesStack';
import ProfileStack from './ProfileStack';
//#endregion


const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // each stack will handle its own header
        tabBarActiveTintColor: '#4ffa00',
      }}
    >
      <Tab.Screen name="Vehicles" component={VehiclesStack}
        options={{
          title: 'Véhicules',
          tabBarIcon: ({ color, size }) => (
            <CarFront color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Profile" component={ProfileStack}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <PersonStandingIcon color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}