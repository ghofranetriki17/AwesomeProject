import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean;
  hasHydrated: boolean;
  login: () => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasHydrated: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth_store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
