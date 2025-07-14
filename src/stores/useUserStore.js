// User 관련 상태 관리
import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));

export default useUserStore;