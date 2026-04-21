import { create } from "zustand";
import toast from "react-hot-toast";

const API = `${import.meta.env.VITE_API_URL}`;

export const useLeadStore = create((set, get) => ({
  leads: [],
  isLoading: false,
  page: 1,
  totalPages: 1,
  filter: "all",
  keyword: "",

  fetchLeads: async (page = 1, filter = "all", keyword = "") => {
    set({ isLoading: true });

    try {
      let url = `${API}/api/admin/leads?page=${page}`;

      if (filter !== "all") url += `&status=${filter}`;
      if (keyword) url += `&keyword=${keyword}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      set({
        leads: data.leads,
        page: data.currentPage,
        totalPages: data.totalPages,
        filter,
        keyword,
        isLoading: false,
      });

    } catch (err) {
      toast.error(err.message || "Failed to fetch leads");
      set({ isLoading: false });
    }
  },

  deleteLead: async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/lead/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Lead deleted ✅");

      set((state) => ({
        leads: state.leads.filter((l) => l._id !== id),
      }));

    } catch (err) {
      toast.error(err.message);
    }
  },

  updateLead: async (id) => {},
}));