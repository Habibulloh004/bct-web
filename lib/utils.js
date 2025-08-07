import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const imageUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
export function formatNumber(number) {
  
  return String(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
export function getInitialsFromName(name) {
  if (!name) return "";
  return name
    .split(" ")                 // so‘zlarga ajratish
    .filter(Boolean)           // bo‘sh stringlarni olib tashlash
    .map(word => word[0]?.toUpperCase()) // har birining bosh harfi
    .join("");                 // birlashtirish
}

