// src/screens/VehiclesListScreen.tsx
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import type { VehiclesListNavigationProp } from '../navigation/types';
import type { Vehicle } from '../data/vehicles';
import VehicleItem from '../components/VehicleItem';
import { useStores } from '../stores/StoreContext';
import React from 'react';

const ITEM_HEIGHT = 80;
const FILTERS = ['all', 'available', 'in_repair', 'rented'] as const;
const FILTER_LABEL: Record<typeof FILTERS[number], string> = {
  all: 'Tous',
  available: 'Disponible',
  in_repair: 'En réparation',
  rented: 'Loué',
};

const VehicleList = React.memo(({ 
  vehicles, 
  onPress 
}: { 
  vehicles: Vehicle[]; 
  onPress: (v: Vehicle) => void;
}) => {
  const keyExtractor = useCallback((item: Vehicle) => item.id, []);

  const getItemLayout = useCallback((_: unknown, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const renderItem = useCallback(({ item }: { item: Vehicle }) => (
    <VehicleItem vehicle={item} onPress={onPress} />
  ), [onPress]);

  return (
    <FlatList
      data={vehicles}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={15}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      style={styles.list}
    />
  );
});

const VehiclesListScreen = observer(() => {
  const navigation = useNavigation<VehiclesListNavigationProp>();
  const { vehicleStore } = useStores();

  const handlePress = useCallback((vehicle: Vehicle) => {
    navigation.navigate('VehicleDetail', { vehicleId: vehicle.id });
  }, [navigation]);

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
  list: { flex: 1 },
});