// src/navigation/RootNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import VehiclesStack from './VehiclesStack';
import ProfileStack from './ProfileStack';
import { CarFront, PersonStandingIcon } from 'lucide-react-native';


const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // chaque stack gère son propre header
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