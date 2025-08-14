"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MobileCategoryMenu from "./MobileCategoryMenu";
import DesktopCategoryDropdown from "./DesktopCategoryDropdown";
import MobileLanguageSwitcher from "../MobileLanguageSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { initializeUserStore } from "@/lib/userMigration";
import SearchPopover from "./searchComponent";
import ChatWidget from "../chat/ChatWidget";
import BackToTop from "./BackToTop";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t, i18n } = useTranslation();
  const { items } = useCartStore();
  const { user, isAuthenticated } = useUserStore();

  // ✅ Client-side hydration tracking
  useEffect(() => {
    setIsClient(true);
    initializeUserStore();
  }, []);

  const languages = [
    { code: "ru", name: t("language.ru"), flag: "🇷🇺" },
    { code: "en", name: t("language.en"), flag: "🇺🇸" },
    { code: "uz", name: t("language.uz"), flag: "🇺🇿" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="drop-shadow-[0_0_6px_rgba(0,0,0,0.7)] z-[998] bg-white fixed top-0 left-0 w-screen h-20 flex justify-center items-center">
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
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Menu className="cursor-pointer h-8 w-8 text-white" />
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 z-[9999]">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-left">{t("header.menu")}</SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col h-full overflow-y-auto">
                    <MobileCategoryMenu onLinkClick={handleMobileMenuClose} />

                    <div className="p-4 border-b space-y-2">
                      <Link
                        href="/about-us"
                        onClick={handleMobileMenuClose}
                        className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {t("header.aboutUs")}
                      </Link>
                      <Link
                        href="/warranty-check"
                        onClick={handleMobileMenuClose}
                        className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {t("header.warrantyCheck")}
                      </Link>
                    </div>

                    <div className="p-4 mt-auto">
                      <MobileLanguageSwitcher onLanguageChange={handleMobileMenuClose} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* ✅ Stable Logo - no jumping */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="header-logo">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={60}
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <DesktopCategoryDropdown />
              <Link
                href="/about-us"
                className="text-white text-lg font-[400] hover:text-white/80 transition-colors"
              >
                {t("header.aboutUs")}
              </Link>
              <Link
                href="/warranty-check"
                className="text-white text-lg font-[400] hover:text-white/80 transition-colors"
              >
                {t("header.warrantyCheck")}
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SearchPopover />

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} className="text-[#464646] h-10 w-10 rounded-md p-2 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* User - Only render after hydration */}
            {isClient && (
              <>
                {isAuthenticated && user?.id ? (
                  <Link href="/profile">
                    <Button
                      variant="none"
                      className="h-10 w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out"
                    >
                      <Image
                        loading="eager"
                        src="/icons/user.svg"
                        alt="User Icon"
                        width={18}
                        height={18}
                        className="w-6 h-6"
                      />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="none"
                      className="h-10 w-auto p-2 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out"
                    >
                      {t("login.buttons.submit")}
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Language (desktop) */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          </div>
        </main>
      </header>

      {/* Floating widgets */}
      <BackToTop />
      <ChatWidget />
    </>
  );
}