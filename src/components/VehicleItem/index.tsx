//#region react imports
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//#endregion

//#region types
import type { Vehicle } from "@/types/vehicle";
//#endregion

//#region constants
import { STATUS_COLOR, STATUS_LABEL } from "@/components/VehicleItem/constants";
//#endregion

type VehicleItemProps = {
    vehicle: Vehicle;
    onPress: (vehicle: Vehicle) => void;
};

function VehicleItem({ vehicle, onPress }: VehicleItemProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            testID={`vehicle-item-${vehicle.plate}`}
            onPress={() => onPress(vehicle)}
        >
            <View style={styles.left}>
                <Text style={styles.plate}>{vehicle.plate}</Text>
                <Text style={styles.sub}>
                    {vehicle.brand} {vehicle.model} · {vehicle.year}
                </Text>
                <Text style={styles.mileage}>{vehicle.mileage.toLocaleString("fr-FR")} km</Text>
            </View>
            <View style={[styles.badge, { borderColor: STATUS_COLOR[vehicle.status] }]}>
                <Text style={[styles.badgeText, { color: STATUS_COLOR[vehicle.status] }]}>{STATUS_LABEL[vehicle.status]}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default React.memo(VehicleItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 0.5,
        borderColor: "#e5e7eb",
    },
    left: { flex: 1 },
    plate: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
    sub: { fontSize: 13, color: "#6b7280", marginBottom: 2 },
    mileage: { fontSize: 12, color: "#9ca3af" },
    badge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
    badgeText: { fontSize: 11, fontWeight: "500" },
});
