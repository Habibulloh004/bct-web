"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronUp } from "lucide-react";
import { useTranslation } from 'react-i18next';
import MobileCategoryMenu from "./MobileCategoryMenu";
import DesktopCategoryDropdown from "./DesktopCategoryDropdown";
import MobileLanguageSwitcher from "../MobileLanguageSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import { useCartStore } from "@/store/useCartStore";
import SearchPopover from "./searchComponent";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t, i18n } = useTranslation();
  const { items } = useCartStore();

  const languages = [
    { code: 'ru', name: t('language.ru'), flag: '🇷🇺' },
    { code: 'en', name: t('language.en'), flag: '🇺🇸' },
    { code: 'uz', name: t('language.uz'), flag: '🇺🇿' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Safe localStorage access
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 200); // Show after scrolling 200px
    };

    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header className="drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]  z-[998] bg-white fixed top-0 left-0 w-screen h-20 flex justify-center items-center">
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
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Mobile Menu Button */}
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
                    <MobileCategoryMenu onLinkClick={handleMobileMenuClose} />

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
                className="w-[100px] max-md:w-[75px] p-1 sm:p-2 rounded-md bg-white"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
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
          </div>

          {/* Desktop Navigation */}

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
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

            {/* User Icon - Only render on client */}
            {isClient && (
              userData?.id ? (
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
              )
            )}

            {/* Language Switcher - desktop only */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          </div>
        </main>

        {/* Back to Top Button - Fixed Position */}

      </header>
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <button
            onClick={scrollToTop}
            className="group relative w-12 h-12 bg-gradient-to-t from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-in fade-in slide-in-from-bottom-5"
          >
            {/* Ripple Animation */}
            <div className="absolute inset-0 rounded-full bg-gray-400 opacity-30 animate-ping"></div>
            <div className="absolute inset-1 rounded-full bg-gray-300 opacity-20 animate-pulse"></div>

            {/* Icon Container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <ChevronUp className="h-5 w-5 text-white group-hover:animate-bounce" />
            </div>
          </button>
        </div>

      )}</>
  );
}