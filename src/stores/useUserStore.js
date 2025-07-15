// User 관련 상태 관리
import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(persist((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    logout: () => set({ user: null }),
}),
    {
        name: "user-storage", // localStorage key
        getStorage: () => localStorage,
    }
));

export default useUserStore;