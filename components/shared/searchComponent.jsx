"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";
import CustomImage from "@/components/shared/customImage";
import { getData } from "@/actions/get";

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { i18n } = useTranslation();
  const router = useRouter();

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 2) {
        const data = await getData({ endpoint: `/api/products?page=1&limit=10&search=${query}`, tag: "search", revalidate: 0 });
        setResults(data?.data || []);
        console.log("Search results:", data);
      } else {
        setResults([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (id, category_id) => {
    setOpen(false);
    router.push(`/${category_id}/${id}`);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="none"
        className="h-8 w-8 sm:h-10 sm:w-10 p-1 bg-white hover:bg-white/90"
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl w-full rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>Поиск товаров</DialogTitle>
          </DialogHeader>

          <Input
            autoFocus
            placeholder="Введите название..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-2"
          />

          <div className="max-h-[300px] overflow-y-auto mt-4 space-y-2">
            {results.length === 0 && query.length >= 2 && (
              <p className="text-sm text-muted-foreground">
                Ничего не найдено.
              </p>
            )}
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id, item.category_id)}
                className="flex items-center gap-3 cursor-pointer hover:bg-muted rounded-md p-2 transition-all"
              >
                <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-white border">
                  <CustomImage
                    src={
                      item?.image?.length > 0
                        ? `https://q-bit.uz${item.image[0]}`
                        : "/placeholder.svg"
                    }
                    alt="product"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {getTranslatedValue(item.name || "", i18n.language)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.price?.toLocaleString("ru-RU")} сум
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
