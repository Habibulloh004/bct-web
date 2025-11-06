import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const imageUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export function resolveImageUrl(path) {
  if (typeof path !== "string") {
    return null;
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const base = (imageUrl ?? "").replace(/\/$/, "");
  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  if (!base) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}

function collectFromRawImages(raw) {
  if (!raw) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw;
  }

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      return collectFromRawImages(parsed);
    } catch {
      return [trimmed];
    }
  }

  if (typeof raw === "object") {
    const { value, values, data, url, image, src } = raw;

    if (Array.isArray(value)) {
      return collectFromRawImages(value);
    }

    if (Array.isArray(values)) {
      return collectFromRawImages(values);
    }

    if (Array.isArray(data)) {
      return collectFromRawImages(data);
    }

    if (typeof url === "string") {
      return [url];
    }

    if (typeof image === "string") {
      return [image];
    }

    if (typeof src === "string") {
      return [src];
    }

    const nested = Object.values(raw || {}).flatMap((nestedValue) =>
      collectFromRawImages(nestedValue)
    );

    if (nested.length) {
      return nested;
    }
  }

  return [];
}

export function extractProductImages(product) {
  if (!product) {
    return [];
  }

  const potentialSources = [
    product.images,
    product.image,
    product.fields?.images,
    product.fields?.image,
    product.fields?.gallery,
    product.fields?.Images,
  ];

  const resolved = [];

  potentialSources.forEach((source) => {
    collectFromRawImages(source)
      .map((entry) => {
        if (typeof entry === "string") {
          return entry;
        }

        if (entry && typeof entry === "object") {
          if (typeof entry.url === "string") {
            return entry.url;
          }

          if (typeof entry.image === "string") {
            return entry.image;
          }

          if (typeof entry.src === "string") {
            return entry.src;
          }
        }

        return null;
      })
      .map((entry) => resolveImageUrl(entry))
      .filter(Boolean)
      .forEach((url) => {
        if (!resolved.includes(url)) {
          resolved.push(url);
        }
      });
  });

  return resolved;
}

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

export const lngItems = [
  {
    id: 1,
    title: "Рус",
    icon: "/assets/ruIcon.svg",
    locale: "ru",
  },
  {
    id: 2,
    title: "Uzb",
    icon: "/assets/uzIcon.webp",
    locale: "uz",
  },
  {
    id: 3,
    title: "Eng",
    icon: "/assets/enIcon.svg",
    locale: "en",
  },
];
