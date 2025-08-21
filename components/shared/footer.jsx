"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: '/icons/facebook.svg'
    },
    {
      name: 'Instagram', 
      href: 'https://instagram.com',
      icon: '/icons/instagram.svg'
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      icon: '/icons/x.svg'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: '/icons/linkedin.svg'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: '/icons/youtube.svg'
    }
  ];

  return (
    <footer className='w-full bg-[#F5F5F5] border-t border-gray-200'>
      <div className='w-11/12 max-w-[1440px] mx-auto py-4'>
        
        {/* Main Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8'>
          
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <h2 className='font-bold text-xl md:text-2xl text-gray-800 mb-4'>
              {t('footer.company.name')}
            </h2>
            <div className='space-y-3 mb-6'>
              <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
                {t('footer.company.address')}
              </p>
            </div>
            
            {/* Social Links */}
            <div>
              <p className='text-sm font-semibold text-gray-700 mb-3'>
                {t('footer.social.title')}
              </p>
              <div className='flex gap-3'>
                {socialLinks.map((social) => (
                  <Link 
                    key={social.name}
                    href={social.href} 
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm'
                    aria-label={social.name}
                  >
                    <Image 
                      src={social.icon} 
                      alt={social.name} 
                      width={20} 
                      height={20}
                      className='w-5 h-5'
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-lg text-gray-800 mb-4'>
              {t('footer.quickLinks.title')}
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link 
                  href="/about-us"
                  className='text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200'
                >
                  {t('footer.links.aboutUs')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className='text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200'
                >
                  {t('footer.links.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/warranty-check"
                  className='text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200'
                >
                  {t('header.warrantyCheck')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='font-semibold text-lg text-gray-800 mb-4'>
              {t('footer.legal.title')}
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link 
                  href="/terms"
                  className='text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200'
                >
                  {t('footer.links.terms')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy"
                  className='text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200'
                >
                  {t('footer.links.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className=' border-gray-300'>
          {/* Copyright */}
          <div className='w-full flex justify-center items-center'>
            <p className='text-md text-gray-500'>
              © {currentYear} {t('footer.company.name')}. {t('footer.copyright.text')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}