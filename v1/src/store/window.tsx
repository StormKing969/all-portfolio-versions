import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants/windowData.tsx";
import type { WindowConfigType, WindowStore } from "../types";

const useWindowStore = create<WindowStore>()(
  immer<WindowStore>((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey: WindowConfigType, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) {
          return;
        }

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    closeWindow: (windowKey: WindowConfigType) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) {
          return;
        }

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey: WindowConfigType) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) {
          return;
        }

        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;