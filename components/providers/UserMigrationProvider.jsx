"use client";

import { useEffect } from 'react';
import { initializeUserStore } from '@/lib/userMigration';

export default function UserMigrationProvider({ children }) {
  useEffect(() => {
    // ✅ Faqat client-side'da migration qilish
    initializeUserStore();
  }, []);

  return children;
}