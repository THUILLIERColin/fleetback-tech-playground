// src/navigation/types.ts
import type { StaticParamList } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// --- Tabs ---
export type RootTabParamList = {
  Vehicles: undefined;
  Profile: undefined;
};

// --- Stack Véhicules ---
export type VehiclesStackParamList = {
  VehiclesList: undefined;
  VehicleDetail: { vehicleId: string };
};

// --- Stack Profil ---
export type ProfileStackParamList = {
  ProfileHome: undefined;
};

// --- Props de navigation typées ---
export type VehiclesListNavigationProp = NativeStackNavigationProp<VehiclesStackParamList, "VehiclesList">;

export type VehicleDetailNavigationProp = NativeStackNavigationProp<VehiclesStackParamList, "VehicleDetail">;
