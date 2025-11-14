import { create } from "zustand";
import { apiReq } from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await apiReq.get("/");
      set({ products: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
