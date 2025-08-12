// components/MobileCategoryMenu.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCategories } from "@/hooks/useCategories";
import { getTranslatedValue } from "@/lib/functions";
import { imageUrl } from "@/lib/utils";
import Image from "next/image";

export default function MobileCategoryMenu({ onLinkClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { categories, loading, hasProducts } = useCategories();

  const toggle = () => setIsOpen((v) => !v);

  return (
    <div className="border-b">
      {/* Trigger */}
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{t("header.categories")}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content (desktopga mos — flat ro'yxat, rasm + nom, 'скоро' disabled) */}
      {isOpen && (
        <div className="bg-gray-50">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mx-auto" />
              <p className="mt-2 text-gray-500 text-sm">{t("common.loading")}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Категории не найдены</div>
          ) : (
            <div className="py-2 max-h-[60vh] overflow-y-auto">
              {categories
                ?.slice()
                ?.reverse()
                ?.map((category) => {
                  const enabled = hasProducts(category.id);
                  const label = getTranslatedValue(category.name, i18n.language);
                  const imgSrc =
                    category?.image ? `${imageUrl}${category.image}` : "/placeholder.svg";

                  return enabled ? (
                    <Link
                      key={category.id}
                      href={`/${category.id}`}
                      onClick={onLinkClick}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Image
                        src={imgSrc}
                        width={30}
                        height={30}
                        alt={label || "image"}
                        className="w-[30px] h-[30px] object-contain"
                      />
                      <span className="font-medium">{label}</span>
                    </Link>
                  ) : (
                    <div
                      key={category.id}
                      className="flex items-center justify-between px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                      title="Скоро"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={imgSrc}
                          width={30}
                          height={30}
                          alt={label || "image"}
                          className="w-[30px] h-[30px] object-contain"
                        />
                        <span className="font-medium">{label}</span>
                      </div>
                      <span className="text-xs">(скоро)</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
