import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full bg-[#F5F5F5] min-h-20 mt-24'>
      <div className='w-11/12 max-w-[1440px] mx-auto py-4 text-start'>
        <div className='w-11/12 mx-auto flex justify-between items-center'>
          <div className=' flex flex-col gap-2'>
            <h1 className='font-bold text-md'>
              ООО "BCTechnologies"
            </h1>
            <p className='text-sm'>
              Адрес: Узбекистан, Ташкент, ул. Афрасиаб 16,
            </p>
            <div className='pt-1 flex gap-4 justify-start items-center'>
              <Link href="" target='_blank'>
                <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="" target='_blank'>
                <Image src="/icons/instagram.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="" target='_blank'>
                <Image src="/icons/x.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="" target='_blank'>
                <Image src="/icons/linkedin.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="" target='_blank'>
                <Image src="/icons/youtube.svg" alt="Facebook" width={24} height={24} />
              </Link>
            </div>
          </div>
          <ul className='space-y-2'>
            <li>
              <Link href="/about-us">
                О нас
              </Link>
            </li>
            <li>
              <Link href="/contact">
                Контакты
              </Link>
            </li>
            <li>
              <Link href="/faq">
                Вопросы
              </Link>
            </li>
          </ul>
        </div>
        <p className='text-text-foreground text-center'>© 2023 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  )
} 
