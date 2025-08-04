"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import ProductItem from "@/app/_components/productItem";
import PaginationComponent from "./paginationComponent";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";

const sortOptions = [
  { label: "По популярности", value: "popularity" },
  { label: "По возрастанию цены", value: "price_asc" },
  { label: "По убыванию цены", value: "price_desc" },
  { label: "По алфавиту (А-Я)", value: "alpha_asc" },
  { label: "По алфавиту (Я-А)", value: "alpha_desc" },
];

export default function ProductsList({ categoryData, page, products }) {
  const { t, i18n } = useTranslation();
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
    // TODO: you can call a sorting handler here
    console.log("Selected sort:", option.value);
  };
  const totalPages = Math.ceil(products.total / products?.limit);


  return (
    <div className="max-w-[1440px] mx-auto w-11/12 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-center font-bold text-2xl">
          {getTranslatedValue(categoryData?.name, i18n.language) || "Все товары"}
        </h1>
        <div className="flex justify-end items-center gap-3">
          <span className="text-base font-medium text-[#666666]">Сортировка:</span>

          <DropdownMenu onOpenChange={setOpen}>
            <DropdownMenuTrigger
              ref={triggerRef}
              className="bg-[#F3F3F3] px-3 py-2 rounded-md min-w-[180px] text-sm font-medium text-left"
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
                  className={`cursor-pointer ${selected.value === option.value ? "bg-muted" : ""
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
      {products?.data?.length > 0 ? (
        <div className='pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {products?.data?.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">
            {t("common.noProductsFound")}
          </p>
        </div>
      )}
      <PaginationComponent
        url={"/products"}
        currentPage={page}
        totalPages={totalPages}
        totalPagesCount={products?.total}
      />

    </div>
  );
}
