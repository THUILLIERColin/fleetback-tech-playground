//#region react imports
import { makeAutoObservable, runInAction } from "mobx";
//#endregion

//#region types imports
import type { Vehicle } from "@/types/vehicle";
//#endregion

//region service imports
import { fetchVehicles } from "@/services/vehicleService";
//endregion

type LoadingState = "idle" | "loading" | "error" | "success";

class VehicleStore {
  vehicles: Vehicle[] = [];
  selectedId: string | null = null;
  filterStatus: Vehicle["status"] | "all" = "all";
  loadingState: LoadingState = "idle";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFilter(status: Vehicle["status"] | "all") {
    this.filterStatus = status;
  }

  setSelectedId(id: string | null) {
    this.selectedId = id;
  }

  get filteredVehicles() {
    if (this.filterStatus === "all") return this.vehicles;
    return this.vehicles.filter((v) => v.status === this.filterStatus);
  }

  get selectedVehicle() {
    if (!this.selectedId) return null;
    return this.vehicles.find((v) => v.id === this.selectedId) ?? null;
  }

  async loadVehicles() {
    this.loadingState = "loading";
    this.error = null;

    try {
      const data = await fetchVehicles();

      runInAction(() => {
        this.vehicles = data;
        this.loadingState = "success";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : "Erreur inconnue";
        this.loadingState = "error";
      });
    }
  }

  async retry() {
    await this.loadVehicles();
  }
}

export const vehicleStore = new VehicleStore();
