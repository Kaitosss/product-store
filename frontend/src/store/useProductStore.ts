import { create } from "zustand";
import { apiReq } from "../lib/axios";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
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
      toast.error("something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
