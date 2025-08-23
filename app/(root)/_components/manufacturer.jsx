"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import ManufactureItem from "./manufactureItem"

export default function Manufacture({ categories }) {
  const { t } = useTranslation();
  if (!categories?.length) return null;

  return (
    <main className="space-y-4">
      <h1 className="ml-4 md:ml-12 text-start font-bold text-4xl">
        {t("homePage.manufacturerTitle")}
      </h1>

      {/* GRID: responsive ustunlar soni + markazlash */}
      <div
        className="
          pt-5 grid gap-4 justify-items-center
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {categories.slice().reverse().map((item, index) => (
          <ManufactureItem key={index} item={item} />
        ))}
      </div>
    </main>
  );
}
