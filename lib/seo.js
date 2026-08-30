import { getTranslatedValue } from "@/lib/functions";
import { extractProductImages } from "@/lib/utils";

export const SITE_NAME = "Bar Code Technologies";
export const SITE_TITLE =
  "Bar Code Technologies - автоматизация торговли, HoReCa и складов в Узбекистане";
export const SITE_DESCRIPTION =
  "Bar Code Technologies поставляет POS-оборудование, сканеры штрих-кода, терминалы сбора данных, решения для маркировки и автоматизации Retail, HoReCa, складов и производства в Узбекистане.";
export const SITE_KEYWORDS = [
  "автоматизация торговли Узбекистан",
  "автоматизация HoReCa Ташкент",
  "POS оборудование Узбекистан",
  "сканеры штрих кода Ташкент",
  "терминалы сбора данных Узбекистан",
  "кассовое оборудование",
  "оборудование для маркировки",
  "автоматизация склада",
  "retail automation Uzbekistan",
  "barcode scanner Uzbekistan",
  "Bar Code Technologies",
  "BCT",
];

export const SUPPORT_PHONE_DISPLAY = "+998 91 162 35 99";
export const SUPPORT_PHONE_E164 = "+998911623599";
export const COMPANY_EMAIL = "info@bct.uz";
export const COMPANY_ADDRESS = {
  streetAddress: "ул. Афросиаб, 16",
  addressLocality: "Ташкент",
  addressRegion: "Ташкент",
  postalCode: "100031",
  addressCountry: "UZ",
};
export const COMPANY_GEO = {
  latitude: 41.298993,
  longitude: 69.272349,
};

const DEFAULT_SITE_URL = "https://www.bct-shop.uz";
export const OG_IMAGE_PATH = "/og-image.png";

function normalizeSiteUrl(value) {
  try {
    const url = new URL(value || DEFAULT_SITE_URL);
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL
);

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function compactText(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value, maxLength = 160) {
  const text = compactText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}...`;
}

export function getSeoText(value, language = "ru") {
  return compactText(getTranslatedValue(value, language));
}

export const indexRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_UZ",
    alternateLocale: ["uz_UZ", "en_US"],
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - автоматизация бизнеса в Узбекистане`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: indexRobots,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = OG_IMAGE_PATH,
  robots = indexRobots,
  keywords = [],
}) {
  const metaTitle = compactText(title || SITE_NAME);
  const metaDescription = truncateText(description || SITE_DESCRIPTION);
  const ogTitle = metaTitle.includes(SITE_NAME) ? metaTitle : `${metaTitle} | ${SITE_NAME}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...SITE_KEYWORDS, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "ru_UZ",
      siteName: SITE_NAME,
      title: ogTitle,
      description: metaDescription,
      url: path,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: metaDescription,
      images: [image],
    },
    robots,
  };
}

export function createNoIndexMetadata(title, description, path) {
  return createPageMetadata({
    title,
    description,
    path,
    robots: noIndexRobots,
  });
}

export function createCategoryMetadata({ category, categoryId, page = 1 }) {
  const categoryName = getSeoText(category?.name) || "Каталог оборудования";
  const pageLabel = page > 1 ? ` - страница ${page}` : "";
  const path = page > 1 ? `/${categoryId}?page=${page}` : `/${categoryId}`;

  return createPageMetadata({
    title: `${categoryName} в Узбекистане${pageLabel}`,
    description: `${categoryName}: оборудование и решения для автоматизации торговли, HoReCa, склада и производства в Ташкенте и по Узбекистану. Подбор, поставка и внедрение от ${SITE_NAME}.`,
    path,
    keywords: [categoryName, `${categoryName} Ташкент`, `${categoryName} купить`],
  });
}

export function getPrimaryProductImage(product) {
  const productImage = extractProductImages(product).find(
    (url) => url && !/localhost|127\.0\.0\.1/i.test(url)
  );

  return productImage || OG_IMAGE_PATH;
}

export function createProductMetadata({ product, categoryId, productId }) {
  const productName = getSeoText(product?.name) || "Оборудование для автоматизации";
  const categoryName = getSeoText(product?.category_name);
  const lead = getSeoText(product?.ads_title);
  const description =
    lead ||
    `${productName}: купить в Ташкенте и Узбекистане. ${SITE_NAME} подберет оборудование для автоматизации Retail, HoReCa, склада и производства.`;

  return createPageMetadata({
    title: `${productName} купить в Узбекистане`,
    description,
    path: `/${categoryId}/${productId}`,
    image: getPrimaryProductImage(product),
    keywords: [
      productName,
      `${productName} цена`,
      `${productName} Ташкент`,
      categoryName,
    ].filter(Boolean),
  });
}

export function createBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: compactText(item.name),
      item: absoluteUrl(item.path),
    })),
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["BCT", "BarCodeTechnologies", "Bar Code Technologies Uzbekistan"],
    url: SITE_URL,
    sameAs: ["https://bct.uz/"],
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl(OG_IMAGE_PATH),
    email: COMPANY_EMAIL,
    telephone: SUPPORT_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      ...COMPANY_ADDRESS,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SUPPORT_PHONE_E164,
      contactType: "customer support",
      areaServed: "UZ",
      availableLanguage: ["ru", "uz", "en"],
    },
  };
}

export function createLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#local-business`,
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: ["https://bct.uz/"],
    image: absoluteUrl(OG_IMAGE_PATH),
    logo: absoluteUrl("/logo.png"),
    telephone: SUPPORT_PHONE_E164,
    email: COMPANY_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...COMPANY_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_GEO.latitude,
      longitude: COMPANY_GEO.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "Uzbekistan",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["ru-UZ", "uz-UZ", "en-US"],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function createProductJsonLd({ product, categoryId, productId, price }) {
  const productName = getSeoText(product?.name);

  if (!productName) {
    return null;
  }

  const path = `/${categoryId}/${productId}`;
  const categoryName = getSeoText(product?.category_name);
  const lead = getSeoText(product?.ads_title);
  const images = extractProductImages(product).filter(
    (url) => url && !/localhost|127\.0\.0\.1/i.test(url)
  );
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(path)}#product`,
    name: productName,
    description:
      lead ||
      `${productName} для автоматизации бизнеса. Поставка и внедрение в Узбекистане.`,
    image: images.length ? images : [absoluteUrl(OG_IMAGE_PATH)],
    category: categoryName || undefined,
    url: absoluteUrl(path),
  };

  if (price) {
    productJsonLd.offers = {
      "@type": "Offer",
      url: absoluteUrl(path),
      priceCurrency: "UZS",
      price: String(price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    };
  }

  return productJsonLd;
}

export function createCollectionPageJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: compactText(name),
    description: truncateText(description),
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };
}
