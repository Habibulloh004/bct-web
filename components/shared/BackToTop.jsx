"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow((window.pageYOffset || document.documentElement.scrollTop) > 200);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <div className="fixed bottom-16 md:bottom-20 right-2 md:right-6 z-[9999]">
      <button
        onClick={scrollToTop}
        className="group relative w-12 h-12 bg-gradient-to-t from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600
                   rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Back to top"
      >
        <div className="absolute inset-0 rounded-full bg-gray-400 opacity-30 animate-ping"></div>
        <div className="absolute inset-1 rounded-full bg-gray-300 opacity-20 animate-pulse"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <ChevronUp className="h-5 w-5 text-white group-hover:animate-bounce" />
        </div>
      </button>
    </div>
  );
}
