// app/not-found.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, LifeBuoy, Search } from "lucide-react";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // Kerak bo‘lsa route’ni o‘zingizning qidiruv sahifangizga moslang
    router.push(`/all-products?search=${encodeURIComponent(query)}`);
  };

  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-4">
      {/* Soft gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(60% 60% at 50% 50%, #64748B 0%, transparent 70%)" }} />
        <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full blur-3xl opacity-20"
             style={{ background: "radial-gradient(60% 60% at 50% 50%, #94A3B8 0%, transparent 70%)" }} />
      </div>

      <div className="w-full max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-gray-600 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
          404 — Sahifa topilmadi
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Ops... kerakli sahifani topolmadik
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Havola o‘zgartirilgan bo‘lishi yoki vaqtincha mavjud emas. Quyidagilardan birini sinab ko‘ring:
        </p>

        {/* Search */}
        <form onSubmit={onSearch} className="mt-6 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Mahsulot yoki bo‘lim qidiring..."
              className="w-full rounded-xl border border-gray-200 bg-white px-9 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gray-800 text-white px-4 py-3 text-sm font-medium hover:bg-gray-900 transition"
          >
            Qidirish
          </button>
        </form>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Ortga qaytish
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
          >
            <Home className="h-4 w-4" />
            Bosh sahifa
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <LifeBuoy className="h-4 w-4" />
            Bog‘lanish
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link
            href="/all-products"
            className="group rounded-xl border bg-white/60 p-4 backdrop-blur hover:shadow-md transition"
          >
            <div className="text-sm font-semibold text-gray-900 group-hover:underline">
              Katalogni ko‘rish
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Barcha mahsulotlar ro‘yxati
            </div>
          </Link>
          <Link
            href="/brands"
            className="group rounded-xl border bg-white/60 p-4 backdrop-blur hover:shadow-md transition"
          >
            <div className="text-sm font-semibold text-gray-900 group-hover:underline">
              Brendlar
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Ishonchli hamkorlarimiz
            </div>
          </Link>
          <Link
            href="/about"
            className="group rounded-xl border bg-white/60 p-4 backdrop-blur hover:shadow-md transition"
          >
            <div className="text-sm font-semibold text-gray-900 group-hover:underline">
              Biz haqimizda
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Kompaniya ma’lumotlari
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
