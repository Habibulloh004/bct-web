"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTranslatedValue } from "@/lib/functions";
import { resolveImageUrl } from "@/lib/utils";

const localeMap = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
};

function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value, maxLength = 180) {
  const text = stripHtml(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
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

function BlogCard({ blog, featured = false }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const id = blog?.id || blog?._id;
  const title = getTranslatedValue(blog?.title, language);
  const text = getTranslatedValue(blog?.text, language);
  const image = resolveImageUrl(
    getTranslatedValue(blog?.image, language)
  );
  const date = formatDate(blog?.created_at, language);

  if (!id) return null;

  return (
    <article
      className={
        featured
          ? "group grid overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(46,62,89,0.08)] lg:grid-cols-[1.35fr_0.65fr]"
          : "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(46,62,89,0.10)]"
      }
    >
      <Link
        href={`/blog/${id}`}
        className={
          featured
            ? "relative block min-h-[280px] overflow-hidden lg:min-h-[470px]"
            : "relative block aspect-[16/10] overflow-hidden"
        }
        aria-label={title}
      >
        {image ? (
          <Image
            src={image}
            alt={title || t("blog.imageAlt")}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 65vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
            priority={featured}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#344c70] to-[#1f2f49]" />
        )}
      </Link>

      <div className={featured ? "flex flex-col justify-between p-7 sm:p-9 lg:p-10" : "flex flex-1 flex-col p-6"}>
        <div>
          {date && (
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {date}
            </p>
          )}
          <h2 className={featured ? "break-words text-3xl font-semibold leading-tight text-[#2e4669] sm:text-4xl" : "break-words text-xl font-semibold leading-snug text-[#2e4669]"}>
            <Link href={`/blog/${id}`} className="transition-colors hover:text-[#172a47]">
              {title}
            </Link>
          </h2>
          {text && (
            <p className={featured ? "mt-5 text-base leading-7 text-slate-600" : "mt-3 line-clamp-3 text-sm leading-6 text-slate-600"}>
              {excerpt(text, featured ? 260 : 150)}
            </p>
          )}
        </div>

        <Link
          href={`/blog/${id}`}
          className="mt-7 inline-flex w-fit items-center gap-2 border-b border-[#2e4669]/30 pb-1 text-sm font-semibold text-[#2e4669] transition hover:border-[#2e4669]"
        >
          {t("blog.readMore")}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogList({ blogs = [] }) {
  const { t } = useTranslation();
  const [featured, ...rest] = blogs;

  return (
    <main className="mx-auto w-11/12 max-w-[1440px] overflow-hidden py-10 sm:py-16 lg:py-20">
      <header className="mb-10 max-w-3xl sm:mb-14">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#2e4669]/65">
          {t("blog.eyebrow")}
        </p>
        <h1 className="break-words text-4xl font-semibold tracking-[-0.035em] text-[#203754] sm:text-5xl lg:text-6xl">
          {t("blog.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {t("blog.description")}
        </p>
      </header>

      {featured ? (
        <div className="space-y-8 sm:space-y-10">
          <BlogCard blog={featured} featured />
          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((blog) => (
                <BlogCard key={blog.id || blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <section className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold text-[#2e4669]">{t("blog.emptyTitle")}</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-600">{t("blog.emptyDescription")}</p>
        </section>
      )}
    </main>
  );
}
