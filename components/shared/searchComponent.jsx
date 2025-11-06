"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import CustomImage from "@/components/shared/customImage";
import { convertUsdtoUzb, getTranslatedValue } from "@/lib/functions";
import { getData } from "@/actions/get";
import { extractProductImages, formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchComponent({ currency }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { i18n, t } = useTranslation();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length >= 2) {
      setLoading(true);

      debounceRef.current = setTimeout(async () => {
        try {
          const data = await getData({
            endpoint: `/api/products?page=1&limit=10&search=${encodeURIComponent(query.trim())}`,
            tag: ["products", "categories", "top-categories"],
            revalidate: 3600,
          });
          setResults(data?.data || []);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setLoading(false);
      setResults([]);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Focus input when opening search
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleSelect = (id, categoryId) => {
    handleClose();
    router.push(`/${categoryId}/${id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Search trigger button
  const SearchTrigger = () => (

    <Search
      onClick={handleOpen}

      size={24} className="text-white h-10 w-10 rounded-full p-2 bg-primary hover:bg-primary/90 transition-all duration-150 cursor-pointer ease-in-out" />
  );

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white flex items-center gap-3 p-3">
          <Skeleton className="w-14 h-14 rounded-md shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );

  // No results
  const NoResults = () => (
    <div className="bg-white flex flex-col items-center justify-center py-8 px-4">
      <Search className="w-12 h-12 text-gray-300 mb-3" />
      <p className="text-sm text-gray-500">
        {t("search.no_results") || "No results found"}
      </p>
    </div>
  );

  // Result item
  const ResultItem = ({ item }) => {
    const productImages = extractProductImages(item);
    const primaryImage = productImages[0];

    return (
      <button
        onClick={() => handleSelect(item.id, item.category_id)}
        className="w-full text-left flex items-center gap-3 p-3 bg-gray-50 transition-colors"
      >
        <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-gray-50 border">
          <CustomImage
            src={primaryImage ?? "/placeholder.svg"}
            alt={getTranslatedValue(item.name || "", i18n.language)}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 line-clamp-2">
            {getTranslatedValue(item.name || "", i18n.language)}
          </p>
          <p className="text-sm text-blue-600 font-semibold mt-1">
            {formatNumber(convertUsdtoUzb(item?.price, currency))} {t("common.currency")}
          </p>
        </div>
      </button>
    );
  };

  // Results content
  const ResultsContent = () => {
    if (loading) return <LoadingSkeleton />;
    if (results.length === 0 && query.trim().length >= 2) return <NoResults />;
    return results.map((item) => <ResultItem key={item.id} item={item} />);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <SearchTrigger />

      {isOpen && (
        <>
          {/* Desktop Dropdown */}
          <div className="hidden md:block absolute right-11 -top-0 w-80 md:w-96 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="cursor-pointer flex items-center gap-2 px-3 py-2 h-10 border-b bg-gray-50">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={t("search.input_placeholder") || "Search products..."}
                className="flex-1 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearQuery}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              <ResultsContent />
            </div>
          </div>

          {/* Mobile Modal */}
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b sticky top-0 bg-white">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={t("search.input_placeholder") || "Search products..."}
                  className="flex-1 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearQuery}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto pb-20">
              <ResultsContent />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
