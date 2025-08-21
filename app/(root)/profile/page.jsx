"use client";

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  User,
  Mail,
  Phone,
  CheckCircle2,
  Shield,
  LogOut
} from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { useUserStore } from '@/store/useUserStore';
import OrderHistorySection from './_components/orderHistory';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const orders = useOrderStore((state) => state.orders);
  
  // ✅ Zustand store'dan user ma'lumotlarini olish
  const { user, isAuthenticated, clearUser } = useUserStore();

  // ✅ Agar user login qilmagan bo'lsa, login sahifasiga yo'naltirish
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    // ✅ Zustand store'dan user ma'lumotlarini tozalash
    clearUser();
    router.push('/login');
  };

  // ✅ Loading holatini tekshirish
  if (!isAuthenticated || !user) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <div className="animate-pulse">
          <div className="text-lg">{t('common.loading') || 'Loading...'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gray-50">
      <div className="w-11/12 max-w-4xl mx-auto md:px-4 py-8">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-2xl font-semibold">
                {getInitials(user.name)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              {/* Status Badge */}
              <div className="flex justify-center md:justify-start">
                {user.is_active ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    {t('profile.status.active') || 'Active Account'}
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    <Shield className="w-4 h-4" />
                    {t('profile.status.inactive') || 'Inactive Account'}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {/* Handle edit profile */}
              {/* >
                <Edit2 className="w-4 h-4" />
                {t('profile.buttons.edit') || 'Edit Profile'}
              </Button> */}
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="gap-6">

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              {t('profile.sections.personal_info') || 'Personal Information'}
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">{t('profile.fields.full_name') || 'Full Name'}</label>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">{t('profile.fields.email') || 'Email Address'}</label>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">{t('profile.fields.phone') || 'Phone Number'}</label>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OrderHistorySection/>

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">
            {t('profile.sections.account_actions') || 'Account Actions'}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-12 justify-start gap-3"
              onClick={() => {/* Handle password change */ }}
            >
              <Shield className="w-4 h-4" />
              {t('profile.buttons.change_password') || 'Change Password'}
            </Button>

            <Button
              variant="outline"
              className="h-12 justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              {t('profile.buttons.logout') || 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}