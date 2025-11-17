import { create } from "zustand";
import { apiReq } from "../lib/axios";
import toast from "react-hot-toast";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await apiReq.get("/");
      set({ products: response.data.data });
    } catch {
      set({ products: [] });
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id: number) => {
    set({ loading: true });
    try {
      await apiReq.delete(`/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
