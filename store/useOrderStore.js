import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [], // List of all submitted orders

      // Add new order to the list
      addNewOrder: (orderData) => {
        set({
          orders: [...get().orders, orderData]
        });
      },

      // Clear all saved orders
      clearOrders: () => set({ orders: [] }),

      // Get all orders (you can also use useOrderStore((s) => s.orders) directly)
      getOrders: () => get().orders,
    }),
    {
      name: "order-storage", // localStorage key
    }
  )
);
