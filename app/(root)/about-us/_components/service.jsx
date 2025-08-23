"use client";

import React from 'react'
import CompanyStats from './companyStats';
import { useTranslation } from 'react-i18next';

export default function Service() {
  const { t } = useTranslation();

  const services = t('aboutUs.services.items', { returnObjects: true });

  return (
    <>
      <div className="max-w-[1440px] mx-auto w-11/12">
        <div className="flex flex-col items-center justify-center pt-16 md:pt-20">
          <h1 className="font-medium w-full md:w-[70%] lg:w-[50%] text-sm md:text-base text-center">
            {t('aboutUs.services.title')}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto py-8 md:py-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] rounded-lg p-4 md:p-6 shadow-sm space-y-2"
            >
              <p className="text-md text-gray-500 font-medium">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="text-base md:text-lg font-semibold text-primary">{service.title}</h3>
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <CompanyStats />
    </>
  )
}