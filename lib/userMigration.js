// lib/userMigration.js
import { useUserStore } from '@/store/useUserStore';

/**
 * Migrate user data from localStorage to zustand store
 * Bu funksiya eski localStorage'dagi userData'ni zustand store'ga ko'chiradi
 */
export const migrateUserData = () => {
  if (typeof window === 'undefined') return;

  const userStore = useUserStore.getState();
  
  try {
    // Agar store'da allaqachon user bor bo'lsa, migration kerak emas
    if (userStore.isAuthenticated && userStore.user) {
      console.log('✅ User data already exists in store, skipping migration');
      return;
    }

    // localStorage'dan eski userData'ni tekshirish
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      
      // Agar valid user data bo'lsa, store'ga ko'chirish
      if (userData && userData.id) {
        console.log('🔄 Migrating user data from localStorage to store...');
        
        userStore.setUser(userData);
        
        console.log('✅ User data migrated successfully');
        
        // Eski localStorage'ni tozalash (ixtiyoriy)
        // localStorage.removeItem('userData');
        // console.log('🗑️ Old userData removed from localStorage');
      }
    }
  } catch (error) {
    console.error('❌ Error during user data migration:', error);
  }
};

/**
 * Initialize user store on app startup
 * Bu funksiya app start bo'lganda chaqiriladi
 */
export const initializeUserStore = () => {
  if (typeof window !== 'undefined') {
    // Migration'ni bir marta chaqirish
    migrateUserData();
  }
};

/**
 * Clear all user data (for debugging or manual cleanup)
 */
export const clearAllUserData = () => {
  if (typeof window === 'undefined') return;
  
  const userStore = useUserStore.getState();
  
  // Zustand store'ni tozalash
  userStore.clearUser();
  
  // localStorage'ni ham tozalash
  localStorage.removeItem('userData');
  localStorage.removeItem('user-storage');
  
  console.log('🧹 All user data cleared');
};