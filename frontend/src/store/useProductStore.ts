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
  product: Product | null;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: number | string | undefined) => Promise<void>;
  addProduct: (data: ProductDataType) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  updateProduct: (
    id: string | undefined,
    data: ProductDataType
  ) => Promise<void>;
}

export type ProductDataType = {
  name: string;
  image: string | null;
  price: number;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  product: null,
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
  deleteProduct: async (id: number | string | undefined) => {
    set({ loading: true });
    try {
      const response = await apiReq.delete(`/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));

      if (response.data.success) {
        toast.success("Product deleted successfully");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (data: ProductDataType) => {
    set({ loading: true });
    try {
      const response = await apiReq.post("/", data);
      await get().fetchProducts();

      if (response.data.success) {
        toast.success("Product added successfully");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  fetchProduct: async (id: string) => {
    set({ loading: true });
    try {
      const response = await apiReq.get(`/${id}`);
      set({ product: response.data.data });
    } catch {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id: string | undefined, data: ProductDataType) => {
    set({ loading: true });
    try {
      const response = await apiReq.put(`/${id}`, data);

      if (response.data.success) {
        toast.success("Product updated successfully");
        set({ product: response.data.data });
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
