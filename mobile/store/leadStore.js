import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export const useLeadStore = create((set, get) => ({
  isLoading: false,
  isFetchingMore: false,
  leads: [],
  filter: "all",
  page: 1,
  hasMore: true,

  fetchLeads: async (filter = "all") => {
    set({ isLoading: true, filter, page: 1, hasMore: true });

    try {
      const token = await SecureStore.getItemAsync("token");

      let url = `https://interior-leads-platform.onrender.com/api/leads?page=1`;

      if (filter !== "all") {
        url += `&status=${filter}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      set({
        leads: data.leads,
        page: 1,
        hasMore: data.currentPage < data.totalPages,
        isLoading: false,
      });

      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  fetchMoreLeads: async () => {
    const { page, hasMore, isFetchingMore, filter } = get();

    if (!hasMore || isFetchingMore) return;

    set({ isFetchingMore: true });

    try {
      const token = await SecureStore.getItemAsync("token");

      const nextPage = page + 1;

      let url = `https://interior-leads-platform.onrender.com/api/leads?page=${nextPage}`;

      if (filter !== "all") {
        url += `&status=${filter}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      set((state) => ({
        leads: [...state.leads, ...data.leads], // 🔥 append
        page: nextPage,
        hasMore: data.currentPage < data.totalPages,
        isFetchingMore: false,
      }));

    } catch (error) {
      console.log("Fetch more error:", error);
      set({ isFetchingMore: false });
    }
  },
}));