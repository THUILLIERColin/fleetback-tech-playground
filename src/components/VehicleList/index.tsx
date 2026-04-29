//#region react imports
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
//#endregion

//#region component imports
import VehicleItem from '@/components/VehicleItem';
//#endregion

//#region data
import type { Vehicle } from '@/types/Vehicle';
//#endregion

//#region constants
import { ITEM_HEIGHT } from '@/components/VehicleList/constants';
//#endregion

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

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});

export default VehicleList;