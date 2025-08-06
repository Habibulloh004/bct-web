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
import { formatNumber, imageUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { i18n, t } = useTranslation();
  const router = useRouter();

  // Yozishda loading yoqiladi
  useEffect(() => {
    if (query.trim().length >= 2) {
      setLoading(true);
    } else {
      setLoading(false);
      setResults([]);
    }

    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 2) {
        try {
          const data = await getData({
            endpoint: `/api/products?page=1&limit=10&search=${query}`,
            tag: ["products", "categories", "top-categories"],
            revalidate: 3600,
          });
          setResults(data?.data || []);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
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
        <DialogContent className="max-w-xl w-11/12 rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{t("search.dialog_title")}</DialogTitle>
          </DialogHeader>

          <Input
            autoFocus
            placeholder={t("search.input_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-2"
          />

          <div className="max-h-[300px] overflow-y-auto mt-4 space-y-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="w-14 h-14 rounded-md" />
                  <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-3/5" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))
            ) : results.length === 0 && query.length >= 2 ? (
              <p className="text-sm text-muted-foreground">
                {t("search.no_results")}
              </p>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id, item.category_id)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted rounded-md p-2 transition-all"
                >
                  <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-white border">
                    <CustomImage
                      src={
                        item?.image?.length > 0
                          ? `${imageUrl}${item.image[0]}`
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
                      {formatNumber(item.price)} {t("common.currency")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
