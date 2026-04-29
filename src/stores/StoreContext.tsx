// src/stores/StoreContext.tsx
import { createContext, useContext } from 'react';
import { vehicleStore } from './VehicleStore';


const StoreContext = createContext({ vehicleStore });

export const useStores = () => useContext(StoreContext);