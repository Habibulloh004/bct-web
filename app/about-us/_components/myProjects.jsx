"use client";

import InfinityCardImage from '@/components/shared/infinityCardImage';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MyProjects() {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="pb-5 flex justify-center items-center pt-5">
        <h1 className="text-base md:text-lg font-semibold">{t('aboutUs.projects.title')}</h1>
      </div>
      <InfinityCardImage
        className="gap-3"
        classNameImage="object-cover h-52 w-full"
        classNameImageContainer="max-w-full w-full min-w-[300px] md:min-w-[500px]"
        data={[
          { image: "/myProjects/1.jpg" },
          { image: "/myProjects/2.jpg" },
          { image: "/myProjects/1.jpg" },
          { image: "/myProjects/2.jpg" },
        ]}
      />
      <InfinityCardImage
        reverse
        className="gap-3"
        classNameImage="object-cover h-52 w-full"
        classNameImageContainer="w-full min-w-[250px] md:min-w-[300px]"
        data={[
          { image: "/myProjects/1.jpg" },
          { image: "/myProjects/2.jpg" },
          { image: "/myProjects/1.jpg" },
          { image: "/myProjects/2.jpg" },
        ]}
      />
    </div>
  );
}