//#region react imports
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
//#endregion

//#region types imports
import type { VehiclesStackParamList } from '@/navigation/types';
//#endregion

//#region store imports
import { useStores } from '@/stores/StoreContext';
//#endregion

type VehicleDetailRouteProp = RouteProp<VehiclesStackParamList, 'VehicleDetail'>;

const VehicleDetailScreen = observer(() => {
  const route = useRoute<VehicleDetailRouteProp>();
  const navigation = useNavigation();
  const { vehicleStore } = useStores();

  const vehicle = vehicleStore.vehicles.find(v => v.id === route.params.vehicleId);

  useEffect(() => {
    if (vehicle) {
      navigation.setOptions({ title: vehicle.plate + " · " + vehicle.client?.name });
    }
  }, [vehicle, navigation]);

  if (!vehicle) return <Text>Véhicule introuvable</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.plate}>{vehicle.plate}</Text>
      <Text style={styles.sub}>{vehicle.brand} {vehicle.model} · {vehicle.year}</Text>
      <Text style={styles.mileage}>{vehicle.mileage.toLocaleString('fr-FR')} km</Text>
      <Text style={styles.sub}>Statut : {vehicle.status.replace('_', ' ')}</Text>
      {vehicle.client && (
        <View style={styles.clientView}>
          <Text style={styles.clientTitle}>Client associé</Text>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfo}>{vehicle.client.name}</Text>
            <Text style={styles.clientInfo}>|</Text>
            <Text style={styles.clientInfo}>{vehicle.client.email}</Text>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  plate: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  id: { fontSize: 14, color: '#666' },
  sub: { fontSize: 18, color: '#333', marginBottom: 4 },
  mileage: { fontSize: 16, color: '#666' },
  clientView: { marginTop: 16, padding: 12, backgroundColor: '#bebebe', borderRadius: 8, borderWidth: 1, borderColor: '#0657f9' },
  clientTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  clientInfoRow: { flexDirection: 'row', gap: 12 },
  clientInfo: { fontSize: 14, color: '#333' },
});

export default VehicleDetailScreen;