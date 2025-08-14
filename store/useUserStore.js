import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // ✅ User ma'lumotlarini saqlash (login qilganda)
      setUser: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      // ✅ User ma'lumotlarini yangilash
      updateUser: (updatedData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updatedData },
          });
        }
      },

      // ✅ Logout qilish (user ma'lumotlarini tozalash)
      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      // ✅ User ma'lumotlarini olish
      getUser: () => get().user,

      // ✅ Authentication holatini tekshirish
      checkAuth: () => {
        const user = get().user;
        return !!user && !!user.id;
      },

      // ✅ User ID olish
      getUserId: () => {
        const user = get().user;
        return user?.id || null;
      },

      // ✅ User nomini olish
      getUserName: () => {
        const user = get().user;
        return user?.name || "";
      },

      // ✅ User emailini olish
      getUserEmail: () => {
        const user = get().user;
        return user?.email || "";
      },

      // ✅ User telefon raqamini olish
      getUserPhone: () => {
        const user = get().user;
        return user?.phone || "";
      },
    }),
    {
      name: "user-storage", // localStorage key
      // Faqat user va isAuthenticated ni saqlash
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);