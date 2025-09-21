"use client";

import { Input } from "@/components/ui/input";
import CustomImage from "@/components/shared/customImage";
import { useTranslation } from "react-i18next";
import { convertUsdtoUzb, getTranslatedValue } from "@/lib/functions";
import { useState, useEffect } from "react";
import { imageUrl } from "@/lib/utils";

export default function SearchClient({ currency }) {
  const { i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchProducts = async (searchTerm) => {
    const res = await fetch(`/api/search-proxy?search=${searchTerm}`);
    const json = await res.json();
    setResults(json?.data || []);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        searchProducts(query);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="max-w-[1440px] w-11/12 mx-auto space-y-6">
      <Input
        placeholder="Поиск товара..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 text-base"
      />

      {results.length === 0 && query.length >= 2 && (
        <p className="text-center text-gray-500 pt-4">Ничего не найдено</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {results.map((item) => (
          <div key={item.id} className="border rounded-lg bg-white shadow-sm p-3 space-y-2">
            <div className="relative aspect-[4/3] w-full">
              <CustomImage
                src={
                  item?.image?.length > 0
                    ? `${imageUrl}${item.image[0]}`
                    : "/placeholder.svg"
                }
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold">
              {getTranslatedValue(item.name || "", i18n.language)}
            </h3>
            <p className="text-red-500 font-semibold text-sm">
              {convertUsdtoUzb(item?.price, currency)?.toLocaleString("ru-RU")} сум
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
