import { create } from 'zustand';
import * as SecureStore from "expo-secure-store";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  checkingAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const user = await SecureStore.getItemAsync("user");
      if (token && user) {
        set({ token, user: JSON.parse(user) });
      }
    } catch (error) {
      console.log('Error checking authentication:', error);
      set({ token: null, user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (userData) => {
    set({ isLoading: true });

    try {
      const response = await fetch('https://interior-leads-platform.onrender.com/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        })
      })

      const data = await response.json();

      if (!response.ok) {
        set({ isLoading: false });
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }

      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      await SecureStore.setItemAsync("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });

      return {
        success: true,
        message: "Account created successfully",
      };

    } catch (error) {
      set({ isLoading: false });

      return {
        success: false,
        message: error.message || "Network error, try again",
      }
    }
  },

  login: async (userData) => {
    set({ isLoading: true });

    try {
      const response = await fetch('https://interior-leads-platform.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        })
      })

      const data = await response.json();

      if (!response.ok) {
        set({ isLoading: false });
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      await SecureStore.setItemAsync("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isLoading: false
      });

      return {
        success: true,
        message: "Login successful",
      };

    } catch (error) {
      set({ isLoading: false });

      return {
        success: false,
        message: error.message || "Network error, try again",
      };
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      set({ token: null, user: null });
    } catch (error) {
      console.log('Logout error:', error);
    }
  }
}))