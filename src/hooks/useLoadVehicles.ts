import { useEffect } from "react";
import { useStores } from "@/stores/StoreContext";

export function useLoadVehicles() {
  const { vehicleStore } = useStores();

  useEffect(() => {
    if (vehicleStore.loadingState === "idle") {
      vehicleStore.loadVehicles();
    }
  }, [vehicleStore]);

  return {
    loadingState: vehicleStore.loadingState,
    error: vehicleStore.error,
    retry: () => vehicleStore.retry(),
  };
}
