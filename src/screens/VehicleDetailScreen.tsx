import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { VehiclesStackParamList } from '../navigation/types';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/StoreContext';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

type VehicleDetailRouteProp = RouteProp<VehiclesStackParamList, 'VehicleDetail'>;

const VehicleDetailScreen = observer(() => {
  const route = useRoute<VehicleDetailRouteProp>();
  const navigation = useNavigation();
  const { vehicleStore } = useStores();

  const vehicle = vehicleStore.vehicles.find(v => v.id === route.params.vehicleId);

  useEffect(() => {
    if (vehicle) {
      navigation.setOptions({ title: vehicle.plate + " · " + vehicle.client }); // --- IGNORE ---
    }
  }, [vehicle, navigation]);

  if (!vehicle) return <Text>Véhicule introuvable</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.plate}>{vehicle.plate}</Text>
      <Text style={styles.sub}>{vehicle.brand} {vehicle.model} · {vehicle.year}</Text>
      <Text style={styles.mileage}>{vehicle.mileage.toLocaleString('fr-FR')} km</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  plate: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  id: { fontSize: 14, color: '#666' },
  sub: { fontSize: 18, color: '#333', marginBottom: 4 },
  mileage: { fontSize: 16, color: '#666' },
});

export default VehicleDetailScreen;