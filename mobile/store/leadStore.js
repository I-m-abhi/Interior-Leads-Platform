import { create } from "zustand";
import { apiRequest } from "../utils/api";

export const useLeadStore = create((set, get) => ({
  isLoading: false,
  isFetchingMore: false,
  leads: [],
  filter: "all",
  page: 1,
  hasMore: true,

  // 🔥 Helper to build query
  buildQuery: (page, filter) => {
    let query = `/api/leads?page=${page}`;
    if (filter !== "all") query += `&status=${filter}`;
    return query;
  },

  // ✅ Fetch Initial Leads
  fetchLeads: async (filter = "all") => {
    set({
      isLoading: true,
      filter,
      page: 1,
      hasMore: true,
    });

    try {
      const endpoint = get().buildQuery(1, filter);

      const data = await apiRequest(endpoint);

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

  // ✅ Pagination (Load More)
  fetchMoreLeads: async () => {
    const { page, hasMore, isFetchingMore, filter, buildQuery } = get();

    if (!hasMore || isFetchingMore) return;

    set({ isFetchingMore: true });

    try {
      const nextPage = page + 1;
      const endpoint = buildQuery(nextPage, filter);

      const data = await apiRequest(endpoint);

      set((state) => ({
        leads: [...state.leads, ...data.leads], // append
        page: nextPage,
        hasMore: data.currentPage < data.totalPages,
        isFetchingMore: false,
      }));

    } catch (error) {
      console.log("Fetch more error:", error);
      set({ isFetchingMore: false });
    }
  },

  // ✅ Reset (useful on logout)
  resetLeads: () => {
    set({
      leads: [],
      page: 1,
      hasMore: true,
      filter: "all",
    });
  },
}));