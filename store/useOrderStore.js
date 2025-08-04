import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      phone: "",
      pay_type: "cash", // default
      client_id: "",
      products: [], // full product objects

      setPhone: (phone) => set({ phone }),
      setPayType: (pay_type) => set({ pay_type }),
      setClientId: (client_id) => set({ client_id }),

      addProduct: (product) => {
        const existing = get().products.find(p => p._id === product._id);
        if (existing) {
          set({
            products: get().products.map(p =>
              p._id === product._id ? { ...p, count: p.count + 1 } : p
            ),
          });
        } else {
          set({ products: [...get().products, { ...product, count: 1 }] });
        }
      },

      increment: (id) =>
        set({
          products: get().products.map((p) =>
            p._id === id ? { ...p, count: p.count + 1 } : p
          ),
        }),

      decrement: (id) =>
        set({
          products: get().products
            .map((p) =>
              p._id === id ? { ...p, count: p.count - 1 } : p
            )
            .filter((p) => p.count > 0),
        }),

      removeProduct: (id) =>
        set({
          products: get().products.filter((p) => p._id !== id),
        }),

      resetOrder: () =>
        set({
          phone: "",
          pay_type: "cash",
          client_id: "",
          products: [],
        }),
    }),
    {
      name: "order-storage", // localStorage key
    }
  )
);
