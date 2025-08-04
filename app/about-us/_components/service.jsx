import React from 'react'
import CompanyStats from './companyStats';

export default function Service() {
  const features = [
    {
      number: "01",
      title: "Ресторан(Кафе)",
      description: "Автоматизируем работу любого общепита",
    },
    {
      number: "02",
      title: "Магазин(Супермаркет)",
      description: "Автоматизируем работу любого общепита",
    },
    {
      number: "03",
      title: "Аптека(Медицина)",
      description: "Автоматизируем работу любого общепита",
    },
    {
      number: "04",
      title: "Производство",
      description: "Автоматизируем работу любого общепита",
    },
    {
      number: "05",
      title: "Склад",
      description: "Учет товара на складе больше не станет головной болью",
    },
    {
      number: "06",
      title: "Автомойка",
      description: "Удобная, быстрая и надежная система управления автомойкой",
    },
  ];


  return (
    <div className="">
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="w-[50%] text-md text-center">За долгие годы работы компания приобрела большой опыт в сфере автоматизации предприятий в различной сфере:</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#F5F5F5] rounded-lg p-6 shadow-sm space-y-2"
          >
            <p className="text-sm text-gray-500 font-medium">{feature.number}</p>
            <h3 className="text-lg font-semibold text-red-600">{feature.title}</h3>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
      <CompanyStats/>

    </div>
  )
}
