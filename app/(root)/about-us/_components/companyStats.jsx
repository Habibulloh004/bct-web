"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

const CompanyStats = () => {
  const { t } = useTranslation();

  const stats = t('aboutUs.stats.items', { returnObjects: true });
  const statsTop = stats.slice(0, 4);  
  const statsBottom = stats.slice(4, 8);

  return (
    <div
      className="bg-primary py-12 md:py-16 text-white"
    >
      <div className="max-w-7xl w-11/12 mx-auto space-y-8 md:space-y-12">
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold px-4">
          {t('aboutUs.stats.title')}
        </h2>

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsTop.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white text-black p-4 md:p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between min-h-[120px] md:min-h-36"
            >
              <div className="mb-3 sm:mb-0">
                <h3 className="text-xl md:text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
              <Image
                src={`/stats/${idx + 1}.png`}
                alt={stat.label}
                width={75}
                height={75}
                className="w-12 h-12 md:w-[75px] md:h-[75px] self-center sm:self-auto"
              />
            </div>
          ))}
        </div>

        <h2 className="text-center text-xl md:text-2xl font-semibold mt-8 md:mt-10 px-4">
          {t('aboutUs.stats.soldTitle')}
        </h2>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsBottom.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white text-black p-4 md:p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between min-h-[120px] md:min-h-36"
            >
              <div className="mb-3 sm:mb-0">
                <h3 className="text-xl md:text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
              <Image
                src={`/stats/${idx + 5}.png`}
                alt={stat.label}
                width={75}
                height={75}
                className="w-12 h-12 md:w-[75px] md:h-[75px] self-center sm:self-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;