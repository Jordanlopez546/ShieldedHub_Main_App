import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUserGlobalStore } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userUserGlobalStore = create<IUserGlobalStore>()(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (user) => {
        set({
          user,
        });
      },
    }),
    {
      name: "shieldedHubMobile-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default userUserGlobalStore;
