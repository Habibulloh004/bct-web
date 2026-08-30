import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/cart",
          "/confirm-order",
          "/login",
          "/profile",
          "/register",
          "/search",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
