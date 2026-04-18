import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,

  checkingAuth: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: "GET",
        credentials: "include",
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      set({
        user: data.user,
        isCheckingAuth: false,
      });

    } catch (error) {
      set({
        user: null,
        isCheckingAuth: false,
      });
    }
  },

  login: async (userData) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed ❌");
        set({ isLoading: false });
        return { success: false };
      }

      toast.success("Login successful ✅");

      set({
        user: data.user,
        isLoading: false,
      });

      return { success: true };

    } catch (error) {
      toast.error("Network error ⚠️");
      set({ isLoading: false });
    }
  },

  profile: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return {
        success: true,
        user: data.user,
      };

    } catch (error) {
      console.log("Profile Error:", error.message);

      return {
        success: false,
        message: error.message,
      };
    }
  },

  logout: async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      })

      toast.success("Logged out successfully 👋");

    } catch (error) {
      toast.error("Logout failed ❌");
    } finally {
      set({ user: null });
    }
  },
}));