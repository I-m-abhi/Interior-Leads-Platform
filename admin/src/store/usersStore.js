import { create } from "zustand";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin/users`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      set({
        users: data.users,
        isLoading: false,
      });

    } catch (error) {
      set({ isLoading: false });
      toast.error(error.message);
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin/user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      // update UI instantly
      set((state) => ({
        users: state.users.filter((u) => u._id !== id),
      }));

      toast.success("User deleted");

    } catch (error) {
      toast.error(error.message);
    }
  },

  changeRole: async (id, role) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      set((state) => ({
        users: state.users.map((u) =>
          u._id === id ? data.user : u
        ),
      }));

      toast.success("Role updated");

    } catch (error) {
      toast.error(error.message);
    }
  },
}));