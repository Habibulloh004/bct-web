"use client";

import Image from 'next/image'
import React from 'react'
import Service from './_components/service'
import Vendors from './_components/vendors'
import MyProjects from './_components/myProjects'
import MyClients from './_components/myClients'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <main className='pt-8 space-y-4'>
      <div className='flex flex-col lg:flex-row max-w-[1440px] mx-auto w-11/12 space-y-6 lg:space-y-0 lg:space-x-4'>
        <div className='w-full h-full lg:w-1/3 flex flex-col items-center lg:items-start pt-10'>
          <Image 
            loading="eager" 
            src="/logo.svg" 
            alt="About Us Logo" 
            width={1000} 
            height={1000} 
            className="mx-auto lg:mx-0 w-[200px] md:w-[250px] lg:w-[300px] h-auto" 
          />
          <Image 
            loading="eager" 
            src="/images/barcode.png" 
            alt="Barcode" 
            width={300} 
            height={50} 
            className="mx-auto lg:mx-0 mt-4 w-[200px] md:w-[250px] lg:w-[300px] h-auto" 
          />
        </div>
        <div className="w-full lg:w-2/3 text-start mt-0 lg:mt-6 px-0 lg:px-4">
          <p className="text-base md:text-lg font-medium mb-4">
            {t('aboutUs.company.description')}
          </p>
          <ul className="mt-2 text-left font-[400] space-y-1 text-sm md:text-base">
            {t('aboutUs.company.goals', { returnObjects: true }).map((goal, index) => (
              <li key={index}>- {goal}</li>
            ))}
          </ul>
        </div>
      </div>
      <Service />
      <Vendors/>
      <MyProjects/>
      <MyClients/>
    </main>
  )
}