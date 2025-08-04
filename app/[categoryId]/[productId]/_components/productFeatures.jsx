import CustomImage from '@/components/shared/customImage'
import React from 'react'

export default function ProductFeatures() {
  return (
    <div className='max-w-[1440px] w-11/12 mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-bold pt-10'>PM86</h1>
      <p className='w-2/3 text-center mx-auto pt-3'>Наслаждайтесь быстрым и надежным подключением благодаря технологии Wi-Fi 6, дополненной поддержкой 2x2 MU-MIMO</p>
      <p className='w-2/3 text-center mx-auto'>Эта современная корпоративная модель также оснащена специализированными функциями для бизнеса, такими как Enterprise Hot-Swap, BLE Beacon и высокая ударопрочность.</p>
      <div className='flex justify-center items-center gap-4 pt-10'>
        <div
          className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
        >
          <CustomImage
            src="/images/categoryItem1.png"
            alt={`product-view-`}
            fill
            loading="eager"
            className="object-contain"
            property={"true"}
          />
        </div>
        <div
          className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
        >
          <CustomImage
            src="/images/categoryItem1.png"
            alt={`product-view-`}
            fill
            loading="eager"
            className="object-contain"
            property={"true"}
          />
        </div>
        <div
          className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
        >
          <CustomImage
            src="/images/categoryItem1.png"
            alt={`product-view`}
            fill
            loading="eager"
            className="object-contain"
            property={"true"}
          />
        </div>
      </div>
      <p>Xarakteristika</p>
    </div>
  )
}
