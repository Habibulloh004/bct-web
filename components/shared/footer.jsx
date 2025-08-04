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
    <footer className='w-full bg-[#F5F5F5] border-t border-gray-200 mt-16 md:mt-24'>
      <div className='w-11/12 max-w-[1440px] mx-auto py-8 md:py-12'>
        
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
              <div className='space-y-2'>
                <p className='text-sm md:text-base text-gray-600'>
                  <span className='font-medium'>{t('footer.company.phone')}:</span>{' '}
                  <a href="tel:+998712345678" className='hover:text-blue-600 transition-colors'>
                    +998 (71) 234-56-78
                  </a>
                </p>
                <p className='text-sm md:text-base text-gray-600'>
                  <span className='font-medium'>{t('footer.company.email')}:</span>{' '}
                  <a href="mailto:info@bctechnologies.uz" className='hover:text-blue-600 transition-colors'>
                    info@bctechnologies.uz
                  </a>
                </p>
              </div>
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
                  href="/faq"
                  className='text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200'
                >
                  {t('footer.links.faq')}
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
        <div className='border-t border-gray-300 pt-6'>
          {/* Copyright */}
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left'>
            <p className='text-sm text-gray-500'>
              © {currentYear} {t('footer.company.name')}. {t('footer.copyright.text')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}