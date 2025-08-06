"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslation } from 'react-i18next';
import MobileCategoryMenu from "./MobileCategoryMenu";
import DesktopCategoryDropdown from "./DesktopCategoryDropdown";
import MobileLanguageSwitcher from "../MobileLanguageSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import { useCartStore } from "@/store/useCartStore";
import SearchPopover from "./searchComponent";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false); // Yangi state
  const { t, i18n } = useTranslation();
  const { items } = useCartStore();
  const languages = [
    { code: 'ru', name: t('language.ru'), flag: '🇷🇺' },
    { code: 'en', name: t('language.en'), flag: '🇺🇸' },
    { code: 'uz', name: t('language.uz'), flag: '🇺🇿' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setMobileLanguageOpen(false);
  };

  const userData = localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):null

  return (
    <header className="z-[998] pt-1 bg-white fixed top-0 left-0 w-screen h-20 lg:h-24 flex justify-center items-center">
      <div className="w-full h-full relative">
        <Image
          src="/images/background1.jpg"
          alt="Header Background"
          fill
          className="object-cover z-[-10]"
          priority
        />
        <div className="w-full h-full bg-white/20 z-10" />
      </div>

      <main className="absolute w-11/12 max-w-[1440px] h-full mx-auto flex items-center justify-between px-2 sm:px-4">

        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button - faqat mobile'da ko'rinadi */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Menu className="cursor-pointer h-8 w-8 text-white" />
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 z-[9999]">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-left">{t('header.menu')}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full overflow-y-auto">
                  {/* Categories - Custom Mobile Menu */}
                  <MobileCategoryMenu onLinkClick={handleMobileMenuClose} />

                  {/* Navigation Links */}
                  <div className="p-4 border-b space-y-2">
                    <Link
                      href="/about-us"
                      onClick={handleMobileMenuClose}
                      className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {t('header.aboutUs')}
                    </Link>
                    <Link
                      href="/warranty-check"
                      onClick={handleMobileMenuClose}
                      className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {t('header.warrantyCheck')}
                    </Link>
                  </div>

                  {/* Language Switcher */}
                  <div className="p-4 mt-auto">
                    <MobileLanguageSwitcher onLanguageChange={handleMobileMenuClose} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              className="w-[100px] h-[50px] max-md:w-[75px] max-md:h-[40px] p-1 sm:p-2 rounded-md bg-white"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation - faqat desktop'da ko'rinadi */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Custom Categories Dropdown */}
          <DesktopCategoryDropdown />

          <Link
            href="/about-us"
            className="text-white text-lg font-[400] hover:text-white/80 transition-colors"
          >
            {t('header.aboutUs')}
          </Link>

          <Link
            href="/warranty-check"
            className="text-white text-lg font-[400] hover:text-white/80 transition-colors"
          >
            {t('header.warrantyCheck')}
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Icon */}
          {/* <Link href="/search">
            <Button
              variant="none"
              className="h-8 w-8 sm:h-10 sm:w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out"
            >
              <Image
                loading="eager"
                src="/icons/search.png"
                alt="Search Icon"
                width={16}
                height={16}
                className="sm:w-5 sm:h-5"
              />
            </Button>
          </Link> */}
          <SearchPopover />


          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <Button
              variant="none"
              className="h-8 w-8 sm:h-10 sm:w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out"
            >
              <Image
                loading="eager"
                src="/icons/shop.png"
                alt="Cart Icon"
                width={18}
                height={18}
                className="sm:w-6 sm:h-6"
              />
            </Button>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white
                text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          {userData?.id ? (

            <Link href="/profile">
              <Button
                variant="none"
                className="h-8 w-8 sm:h-10 sm:w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out"
              >
                <Image
                  loading="eager"
                  src="/icons/user.png"
                  alt="User Icon"
                  width={18}
                  height={18}
                  className="sm:w-6 sm:h-6"
                />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                variant="none"
                className="h-8 w-auto sm:h-10 sm:w-auto p-2 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out"
              >
                  {t("login.buttons.submit")}
              </Button>
            </Link>
          )}
          {/* User Icon */}

          {/* Language Switcher - faqat desktop'da ko'rinadi */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Language Button - TO'G'RILANGAN
          <div className="lg:hidden relative">
            <Sheet open={mobileLanguageOpen} onOpenChange={setMobileLanguageOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="none" 
                  className="h-8 w-8 sm:h-10 sm:w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-gray-800">
                    {currentLanguage.code}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 z-[9999]">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-left">{t('language.title', 'Tilni tanlang')}</SheetTitle>
                </SheetHeader>
                
                <div className="p-6">
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                          i18n.language === lang.code 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {i18n.language === lang.code && (
                          <span className="ml-auto text-blue-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
        </div>
      </main>
    </header>
  );
}