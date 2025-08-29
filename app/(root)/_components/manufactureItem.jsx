"use client";

import CustomImage from "@/components/shared/customImage";
import { getTranslatedValue } from "@/lib/functions";
import { imageUrl } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ManufactureItem({ item }) {
  const { i18n } = useTranslation();

  return (
    <div className="bg-[var(--partner-bg)] rounded-2xl p-4">
      <div className="space-y-2">
        <div className="relative mx-auto aspect-video rounded-[4px] overflow-hidden">
          <CustomImage
            src={item?.image ? `${imageUrl}${item?.image}` : "/placeholder.svg"}
            alt="banner-img"
            fill
            loading="eager"
            className="w-full mx-auto aspect-video mb-5 object-contain"
            property="true"
          />
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <h1 className="text-md text-[var(--partner-text)] font-medium text-start">
            {item?.name || "No name"}
          </h1>

          <p className="text-xs line-clamp-3 text-[var(--partner-text)] opacity-50">
            {item?.description
              ? getTranslatedValue(item?.description, i18n.language)
              : "Ведущий области интегрированных платформ управления магазинами, специализирующийся на производстве KIOSK и POS оборудования"}
          </p>
        </div>
      </div>
    </div>
  );
}
