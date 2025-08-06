"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Edit2,
  Shield,
  CheckCircle2,
  Settings,
  LogOut
} from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import OrderHistorySection from './_components/orderHistory';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const orders = useOrderStore((state) => state.orders);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Safe localStorage access
        if (typeof window !== "undefined") {
          const storedData = localStorage.getItem("userData");
          if (storedData) {
            setUserData(JSON.parse(storedData));
          } else {
            // Redirect to login if no user data
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

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
    if (typeof window !== "undefined") {
      localStorage.removeItem("userData");
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="pt-32 flex justify-center items-center min-h-screen">
        <div className="animate-pulse">
          <div className="text-lg">{t('common.loading') || 'Loading...'}</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="pt-32 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-red-600">{t('profile.error') || 'Error loading profile'}</div>
          <Button 
            className="mt-4"
            onClick={() => router.push('/login')}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gray-50">
      <div className="w-11/12 max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-2xl font-semibold">
                {getInitials(userData.name)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {userData.name}
              </h1>
              {/* Status Badge */}
              <div className="flex justify-center md:justify-start">
                {userData.is_active ? (
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
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {/* Handle edit profile */ }}
              >
                <Edit2 className="w-4 h-4" />
                {t('profile.buttons.edit') || 'Edit Profile'}
              </Button>
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
                  <p className="font-medium">{userData.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">{t('profile.fields.email') || 'Email Address'}</label>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500">{t('profile.fields.phone') || 'Phone Number'}</label>
                  <p className="font-medium">{userData.phone}</p>
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