"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductItem from "@/app/_components/productItem";
import PaginationComponent from "./paginationComponent";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";

export default function ProductsList({ categoryData, page, products }) {
  const { t, i18n } = useTranslation();

  const sortOptions = [
    { label: t("category.sort.popularity"), value: "popularity" },
    { label: t("category.sort.priceAsc"), value: "price_asc" },
    { label: t("category.sort.priceDesc"), value: "price_desc" },
    { label: t("category.sort.alphaAsc"), value: "alpha_asc" },
    { label: t("category.sort.alphaDesc"), value: "alpha_desc" },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]); // default: popularity
  const triggerRef = useRef(null);
  const [width, setWidth] = useState(150);

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  const totalPages = Math.ceil(products.total / products.limit);

  const sortedProducts = useMemo(() => {
    if (!products?.data) return [];

    const productCopy = [...products.data];

    switch (selected.value) {
      case "price_asc":
        return productCopy.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price_desc":
        return productCopy.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      case "alpha_asc":
        return productCopy.sort((a, b) =>
          getTranslatedValue(a.name, i18n.language)
            .toLowerCase()
            .localeCompare(getTranslatedValue(b.name, i18n.language).toLowerCase())
        );
      case "alpha_desc":
        return productCopy.sort((a, b) =>
          getTranslatedValue(b.name, i18n.language)
            .toLowerCase()
            .localeCompare(getTranslatedValue(a.name, i18n.language).toLowerCase())
        );
      default:
        return productCopy;
    }
  }, [products, selected, i18n.language]);

  return (
    <div className="max-w-[1440px] mx-auto w-11/12 space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="font-bold text-2xl">
          {getTranslatedValue(categoryData?.name, i18n.language) || "Все товары"}
        </h1>
        <div className="flex justify-end items-center gap-3">
          <span className="max-md:hidden text-base font-medium text-[#666666]">
            {t("category.sort.label")}
          </span>

          <DropdownMenu onOpenChange={setOpen}>
            <DropdownMenuTrigger
              ref={triggerRef}
              className="bg-[#F3F3F3] px-3 py-2 rounded-md w-full sm:w-auto text-sm font-medium text-left"
            >
              <div className="flex justify-between items-center w-full">
                <span>{selected.label}</span>
                {open ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              style={{ width: `${width}px` }}
              className="p-1"
            >
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer ${
                    selected.value === option.value ? "bg-muted" : ""
                  }`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      {sortedProducts.length > 0 ? (
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">{t("common.noProductsFound")}</p>
        </div>
      )}

      <PaginationComponent
        url="/products"
        currentPage={page}
        totalPages={totalPages}
        totalPagesCount={products.total}
      />
    </div>
  );
}
