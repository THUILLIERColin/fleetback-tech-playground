// src/components/VehicleItem.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import type { Vehicle } from '../data/vehicles';

type Props = {
  vehicle: Vehicle;
  onPress: (vehicle: Vehicle) => void;
};

const STATUS_COLOR: Record<Vehicle['status'], string> = {
  available: '#16a34a',
  in_repair: '#d97706',
  rented: '#2563eb',
};

const STATUS_LABEL: Record<Vehicle['status'], string> = {
  available: 'Disponible',
  in_repair: 'En réparation',
  rented: 'Loué',
};

function VehicleItem({ vehicle, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(vehicle)}>
      <View style={styles.left}>
        <Text style={styles.plate}>{vehicle.plate}</Text>
        <Text style={styles.sub}>{vehicle.brand} {vehicle.model} · {vehicle.year}</Text>
        <Text style={styles.mileage}>{vehicle.mileage.toLocaleString('fr-FR')} km</Text>
      </View>
      <View style={[styles.badge, { borderColor: STATUS_COLOR[vehicle.status] }]}>
        <Text style={[styles.badgeText, { color: STATUS_COLOR[vehicle.status] }]}>
          {STATUS_LABEL[vehicle.status]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ✅ React.memo — re-render uniquement si les props changent
export default React.memo(VehicleItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: '#e5e7eb',
  },
  left: { flex: 1 },
  plate: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  sub: { fontSize: 13, color: '#6b7280', marginBottom: 2 },
  mileage: { fontSize: 12, color: '#9ca3af' },
  badge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 11, fontWeight: '500' },
});