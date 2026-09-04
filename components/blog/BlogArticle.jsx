"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveImageUrl } from "@/lib/utils";

const localeMap = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
};

function localizedValue(values, language) {
  return values?.[language] || values?.ru || values?.en || values?.uz || "";
}

function formatDate(value, language) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(localeMap[language] || localeMap.ru, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function BlogArticle({ blog }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const title = localizedValue(blog?.title, language);
  const text = localizedValue(blog?.text, language);
  const date = formatDate(blog?.created_at, language);
  const image = resolveImageUrl(localizedValue(blog?.image, language));

  return (
    <main className="mx-auto w-11/12 max-w-[1180px] overflow-hidden py-8 sm:py-14 lg:py-20">
      <Link
        href="/blog"
        className="mb-9 inline-flex items-center gap-2 text-sm font-semibold text-[#2e4669] transition hover:-translate-x-1"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("blog.back")}
      </Link>

      <article>
        <header className="mx-auto max-w-4xl text-center">
          {date && (
            <p className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {date}
            </p>
          )}
          <h1 className="break-words text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#203754] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </header>

        {image && (
          <div className="relative mt-10 aspect-[16/8.5] overflow-hidden rounded-[30px] bg-slate-100 shadow-[0_24px_70px_rgba(46,62,89,0.12)] sm:mt-14">
            <Image
              src={image}
              alt={title || t("blog.imageAlt")}
              fill
              priority
              sizes="(max-width: 1200px) 92vw, 1180px"
              className="object-cover"
            />
          </div>
        )}

        <div
          className="blog-prose mx-auto mt-10 max-w-3xl sm:mt-14"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </article>
    </main>
  );
}
