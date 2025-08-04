import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Mahsulot qo'shish (agar bor bo'lsa count oshadi)
      addItem: (product) => {
        const items = get().items;
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
          const updated = items.map((item) =>
            item.id === product.id
              ? { ...item, count: item.count + 1 }
              : item
          );
          set({ items: updated });
        } else {
          set({ items: [...items, { ...product, count: 1 }] });
        }
      },

      // ✅ Count oshirish
      increment: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, count: item.count + 1 } : item
          ),
        });
      },

      // ✅ Count kamaytirish (0 bo'lsa o'chirish)
      decrement: (productId) => {
        set({
          items: get().items
            .map((item) =>
              item.id === productId
                ? { ...item, count: item.count - 1 }
                : item
            )
            .filter((item) => item.count > 0),
        });
      },

      // ✅ Mahsulotni o'chirish
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      // ✅ Savatni tozalash
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
