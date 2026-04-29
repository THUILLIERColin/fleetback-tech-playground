//#region react imports
import { createContext, useContext } from 'react';
//#endregion

//#region store imports
import { vehicleStore } from '@/stores/VehicleStore';
//#endregion

const StoreContext = createContext({ vehicleStore });

export const useStores = () => useContext(StoreContext);