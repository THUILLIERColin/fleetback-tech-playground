//#region react imports
import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
//#endregion

//#region types imports
import type { VehiclesListNavigationProp } from '@/navigation/types';
import type { Vehicle } from '@/types/vehicle';
//#endregion

//#region store imports
import { useStores } from '@/stores/StoreContext';
//#endregion

//#region component imports
import VehicleList from '@/components/VehicleList';
//#endregion

//region hooks imports
import { useLoadVehicles } from '@/hooks/useLoadVehicles';
//endregion

const FILTERS = ['all', 'available', 'in_repair', 'rented'] as const;
const FILTER_LABEL: Record<typeof FILTERS[number], string> = {
  all: 'Tous',
  available: 'Disponible',
  in_repair: 'En réparation',
  rented: 'Loué',
};


const VehiclesListScreen = observer(() => {

  /* 
  Le fait de séparer la list et l'observer permet d'éviter que tout 
  le composant soit réévalué à chaque changement de filtre ou de sélection. 
  Seule la list est concernée par ces changements, pas les autres éléments 
  (boutons de filtre, état de chargement, etc.). 
  C'est une bonne pratique pour optimiser les performances avec MobX. 
  (smart/dumb components)
  */

  const navigation = useNavigation<VehiclesListNavigationProp>();
  const { vehicleStore } = useStores();
  const { loadingState, error, retry } = useLoadVehicles();

  const handlePress = useCallback((vehicle: Vehicle) => {
    navigation.navigate('VehicleDetail', { vehicleId: vehicle.id });
  }, [navigation]);

  if (loadingState === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Chargement des véhicules...</Text>
      </View>
    );
  }

  // état erreur
  if (loadingState === 'error') {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={retry}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {FILTERS.map(status => (
          <TouchableOpacity
            key={status}
            onPress={() => vehicleStore.setFilter(status)}
            style={[
              styles.filterBtn,
              vehicleStore.filterStatus === status && styles.filterBtnActive,
            ]}
          >
            <Text style={[
              styles.filterText,
              vehicleStore.filterStatus === status && styles.filterTextActive,
            ]}>
              {FILTER_LABEL[status]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <VehicleList
        vehicles={vehicleStore.filteredVehicles}
        onPress={handlePress}
      />
    </View>
  );
});

export default VehiclesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  filters: { flexDirection: 'row', padding: 8, gap: 8, flexWrap: 'wrap' },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#d1d5db',
  },
  filterBtnActive: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  filterText: { fontSize: 12, color: '#6b7280' },
  filterTextActive: { color: '#fff' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { fontSize: 14, color: '#6b7280' },
  errorText: { fontSize: 14, color: '#dc2626', textAlign: 'center', paddingHorizontal: 24 },
  retryBtn: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#4f46e5', borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
});