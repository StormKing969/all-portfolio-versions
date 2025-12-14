import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants/finderData.tsx";
import type { LocationDataType, LocationStoreState } from "../types";

const DEFAULT_LOCATION = locations.work as LocationDataType;

const useLocationStore = create<LocationStoreState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;