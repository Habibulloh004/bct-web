"use client";

import { imageUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const VENDOR_LOGOS = [
  "/myClients/possible.png",
  "/myClients/biamp.png",
  "/myClients/imu.png",
  "/myClients/point.png",
  "/myClients/sensormatic.png",
  "/myClients/sewoo.png",
  "/myClients/zebra.png",
  "/myClients/cas.jpg",
  "/myClients/hanshow.png",
  "/myClients/shtrix.jpg",
  "/myClients/posbank.jpg",
  "/myClients/dfly.png",
];

export default function Vendors({ vendors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <h1 className="ml-4 md:ml-12 text-start font-bold text-2xl md:text-4xl">
        {t("aboutUs.vendors.title")}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {vendors?.slice()?.reverse()?.map((src, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-xl border bg-white/50 p-4 md:p-6 hover:shadow-md transition w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] xl:w-[calc(16.666%-1rem)]"
          >
            <Image
              src={src ? `${imageUrl}${src?.image}` : "/placeholder.svg"}
              alt="vendor logo"
              width={240}
              height={80}
              className="aspect-[4/3] h-32 w-auto object-contain"
              priority={i < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
