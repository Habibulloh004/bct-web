"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "Smartphones", href: "/category/smartphones" },
    { name: "Laptops", href: "/category/laptops" },
    { name: "Accessories", href: "/category/accessories" },
  ];

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <header className="z-[999] pt-1 fixed top-0 left-0 w-screen h-24 flex justify-center items-center">
      <div className="w-full h-full relative">
        <Image
          src="/images/background1.jpg" // 📌 Rasm nomi va joylashgan manzilini moslang
          alt="Header Background"
          fill
          className="object-cover z-[-10]"
          priority
        />
        <div className="w-full h-full bg-white/20 z-10" />
      </div>
      <main className="absolute w-11/12 max-w-[1440px] h-24 mx-auto flex items-center justify-between">
        <div className="w-full flex gap-10">
          <Image src="/logo.png" className="p-2 rounded-md bg-white" alt="Logo" width={100} height={50} />
          <div className="mt-2 flex items-center gap-5">
            {/* ✅ DropdownMenu qo‘shildi */}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger>
                <div className="flex items-center cursor-pointer">
                  <Button
                    variant="none"
                    className="ring-0 focus-visible:ring-none focus:ring-none focus:border-none text-white text-lg font-[400] p-0"
                  >
                    Категории
                  </Button>
                  <ChevronDown className="ml-2 size-4 text-white" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={""}>
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.href} asChild>
                    <Link href={cat.href} onClick={handleItemClick}>
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about-us" className="text-white text-lg font-[400]">
              О нас
            </Link>
            <Link
              href="/warranty-check"
              className="text-white text-lg font-[400] ml-4"
            >
              Проверка гарантии
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-3">
          <Link href="/cart">
            <Button variant="none" className="h-10 w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out text-white text-lg font-[400]">
              <Image loading="eager" src="/icons/search.png" alt="Cart Icon" width={20} height={20} />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="none" className="h-10 w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out text-white text-lg font-[400]">
              <Image loading="eager" src="/icons/shop.png" alt="Cart Icon" width={24} height={24} />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="none" className="h-10 w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out text-white text-lg font-[400]">
              <Image loading="eager" src="/icons/user.png" alt="Cart Icon" width={24} height={24} />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="none" className="h-10 w-10 p-1 bg-white hover:bg-white/90 transition-all duration-150 cursor-pointer ease-in-out text-white text-lg font-[400]">
              <Image loading="eager" src="/icons/ru.png" alt="Cart Icon" width={24} height={24} />
            </Button>
          </Link>
        </div>
      </main>
    </header>
  );
}
