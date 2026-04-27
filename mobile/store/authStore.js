import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { apiRequest } from "../utils/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  // ✅ Check Auth
  checkingAuth: async () => {
    try {
      const [token, user] = await Promise.all([
        SecureStore.getItemAsync("token"),
        SecureStore.getItemAsync("user"),
      ]);

      if (token && user) {
        set({ token, user: JSON.parse(user) });
      }
    } catch (error) {
      console.log("Auth check error:", error);
      set({ token: null, user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Register
  register: async (userData) => {
    set({ isLoading: true });

    try {
      const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          companyDetails: {
            companyName: userData.companyName,
            city: userData.city,
            address: userData.address,
          },
          password: userData.password,
        }),
      });

      await Promise.all([
        SecureStore.setItemAsync("user", JSON.stringify(data.user)),
        SecureStore.setItemAsync("token", data.token),
      ]);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });

      return { success: true, message: "Account created successfully" };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  // ✅ Login
  login: async ({ email, password }) => {
    set({ isLoading: true });

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      await Promise.all([
        SecureStore.setItemAsync("user", JSON.stringify(data.user)),
        SecureStore.setItemAsync("token", data.token),
      ]);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });

      return { success: true, message: "Login successful" };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync("token"),
        SecureStore.deleteItemAsync("user"),
      ]);

      set({ user: null, token: null });
    } catch (error) {
      console.log("Logout error:", error);
    }
  },
}));