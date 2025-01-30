import { create } from "zustand";
import { axiosInstance } from "../lib/axios"
export const useAuthStore = create((set) => ({
    authUser: "Jitendra",
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
        } catch (error) {
            console.log("error", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}))