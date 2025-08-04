import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='flex pt-24 max-w-[1440px] mx-auto w-11/12 space-x-4'>
      <div className='w-1/3'>
        <Image loading="eager" src="/logo.png" alt="About Us Logo" width={300} height={300} className="mx-auto" />
        <Image loading="eager" src="/images/barcode.png" alt="Barcode" width={300} height={50} className="mx-auto mt-4" />
      </div>
      <div className="w-2/3 text-start mt-6 px-4">
        <p className="text-lg font-medium">
          Компания <strong>"Bar Code Technologies"</strong> была основана в 2005 году. Успешно работает с ведущими компаниями в сфере Horeca и Retail и имеет команду специалистов, чтобы:
        </p>
        <ul className="mt-2 text-left font-[400]">
          <li>- оптимизировать внутренние процедуры и бизнес-процессы у клиентов;</li>
          <li>- организовать ускоренные курсы обучения и переподготовки для  сотрудников клиента в целях использования современных методов торговли и производства;</li>
          <li>- внедрить планирование процессов и дать владельцам бизнеса инструменты самые передовые инструменты управление и контроля</li>
          <li>- подключить все средства для анализа и прогнозирования  продаж, закупок и дистрибьюции.</li>
        </ul>
      </div>
    </div>  
    )}    
