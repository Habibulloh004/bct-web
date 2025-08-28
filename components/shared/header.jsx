"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
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
import { getTranslatedValue } from "@/lib/functions";
import Marquee from "../ui/marquee";

export default function Header({ products, contactInfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const filterProducts = products?.data?.filter(pr => Number(pr?.discount) > 0);

  let randomProduct = null;

  if (filterProducts?.length > 0) {
    const randomIndex = Math.floor(Math.random() * filterProducts.length);
    randomProduct = filterProducts[randomIndex];
  }

  // console.log({ randomProduct });

  // Threshold holati: top bar balandligidan o‘tildimi?
  const [passedTopBar, setPassedTopBar] = useState(false);

  // Fixed rejimda nav balandligini spacerga beramiz
  const [navH, setNavH] = useState(0);

  const topBarRef = useRef(null);
  const navRef = useRef(null);

  const { t, i18n } = useTranslation();
  const { items } = useCartStore();
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    setIsClient(true);
    initializeUserStore();
  }, []);

  // Scroll/resize: threshold va nav height ni hisoblash
  useEffect(() => {
    const recompute = () => {
      const topBarHeight = topBarRef.current?.offsetHeight ?? 0;
      setPassedTopBar(window.scrollY >= topBarHeight);

      if (navRef.current) {
        setNavH(navRef.current.offsetHeight || 0);
      }
    };
    recompute();
    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  const handleMobileMenuClose = () => setMobileMenuOpen(false);
  console.log({ randomProduct, products })
  return (
    <>
      <header className="w-full z-[998] flex flex-col items-center max-md:overflow-hidden">
        {/* Top info bar */}
        <div ref={topBarRef} className="w-full bg-primary">
          <section className="grid max-w-[1440px] w-11/12 mx-auto grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
            <div className="w-auto flex flex-col text-[11px] py-2 text-white">
              <h1>{contactInfo?.email ? contactInfo?.email : "info@bctechnologies.uz"}</h1>
              <p>{contactInfo?.work_hours ? getTranslatedValue(contactInfo?.work_hours, i18n.language) : "Режим работы: ПН, ВТ, СР, ЧТ с 09:00 - 18:00 Выходной: ПТ"}</p>
            </div>
            {randomProduct ? (
              <div className="hidden md:flex justify-center items-center gap-1">
                <Button className="bg-white text-black hover:bg-white/90 h-auto p-0 px-3 py-1 text-[11px] rounded-full">
                  {t("common.promo_title")}
                </Button>
                <h1 className="text-white text-[11px] line-clamp-1">
                  {t("common.promotion", {
                    discount: randomProduct?.discount,
                    name: getTranslatedValue(randomProduct?.name, i18n.language),
                  })}

                </h1>
                <Link href={`/${randomProduct?.category_id}/${randomProduct?.id}`} className="text-white text-[12px] xl:text-[14px] font-poppins-italic underline">
                  {t("common.buy_now")}
                </Link>
              </div>
            ) : (<div></div>)}
            <div className="w-auto flex justify-end items-center gap-1 text-white text-[11px]">
              <Image src="/icons/Symbol.svg" alt="img" width={100} height={100} className="w-6 h-6" />
              <Link target="_blank" href="tel:+998712058089" className="flex flex-col">
                <h1>{t("common.support")}</h1>
                <p>{contactInfo?.phone1 ? contactInfo?.phone1 : "+998 (71) 234-56-78"}</p>
              </Link>
            </div>
          </section>

        </div>
        {randomProduct ? (
          <div className="bg-primary/15 max-md:block hidden max-sm:text-xs overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              <div className="w-full mx-auto hidden max-md:flex justify-center items-center gap-1">
                <Button className="bg-white text-black hover:bg-white/90 h-auto p-0 px-3 py-1 text-[11px] rounded-full">
                  {t("common.promo_title")}
                </Button>
                <h1 className="text-black text-[11px]">
                  {t("common.promotion", {
                    name: getTranslatedValue(randomProduct?.name, i18n.language),
                  })}

                </h1>
                <Link href={`/${randomProduct?.category_id}/${randomProduct?.id}`} className="text-primary text-[14px] font-poppins-italic underline">
                  {t("common.buy_now")}
                </Link>
              </div>
            </Marquee>
          </div>

        ) : (<div></div>)}

        {/* HYBRID NAV: threshold'gacha sticky, undan keyin fixed */}
        <div
          ref={navRef}
          className={`w-full ${passedTopBar ? "fixed top-0 left-0 z-[999] bg-white shadow-md" : "sticky top-0 z-[999]"
            }`}
        >
          <main className="w-11/12 max-w-[1440px] h-full mx-auto flex items-center justify-between">
            {/* Chap: Mobile menu + Logo */}
            <div className="flex items-center gap-2 sm:gap-5 py-2">
              <div className="lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Menu className="cursor-pointer h-8 w-8 text-primary" />
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

              {/* Logo */}
              <Link href="/" className="flex items-center shrink-0">
                <div className="header-logo">
                  <Image src="/logo.png" alt="Logo" width={100} height={60} priority={100} />
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                <DesktopCategoryDropdown />
                <Link
                  href="/about-us"
                  className="text-primary text-lg font-[400] hover:text-primary/80 transition-colors"
                >
                  {t("header.aboutUs")}
                </Link>
              </div>
            </div>

            {/* O'ng: Qidiruv, Cart, User, Language */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex justify-end items-center gap-2">
                <Image src="/myClients/zebraH.png" alt="img" width={100} height={100} className="h-[27px] w-[83px]" />
                <h1 className="text-end w-2/7 text-[10px]">{t("header.zebra")}</h1>
              </div>
              <Link href="/warranty-check">
                <Button className={"max-sm:hidden h-10 bg-transparent hover:bg-white/10 text-primary border-primary rounded-full px-3 py-2 border-2"}>
                  {t("product.checkWarranty")}
                </Button>
              </Link>
              <SearchPopover />

              {/* Cart */}
              <Link href="/cart" className="relative h-10 w-10 bg-primary rounded-full flex justify-center items-center">
                <Image src="/icons/shopCard.svg" alt="icon" width={28} height={28} />
                {items.length > 0 && (
                  <span className="absolute bottom-1 right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* User (hydrationdan keyin) */}
              {isClient && (
                <>
                  {isAuthenticated && user?.id ? (
                    <Link href="/profile">
                      <Button
                        variant="none"
                        className="h-10 w-10 p-1 rounded-full bg-primary hover:bg-primary/90 transition-all duration-150 cursor-pointer ease-in-out"
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
                        className="rounded-full text-white h-10 w-auto px-3 py-2 bg-primary hover:bg-primary/90 transition-all duration-150 cursor-pointer ease-in-out"
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
        </div>

        {/* Spacer: faqat fixed rejimda layout shift bo‘lmasin */}
        {passedTopBar && <div style={{ height: navH }} aria-hidden />}
      </header>

      <BackToTop />
      <ChatWidget />
    </>
  );
}
