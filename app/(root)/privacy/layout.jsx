import JsonLd from "@/components/seo/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности Bar Code Technologies: как мы обрабатываем данные клиентов при заказе оборудования и обращениях через сайт.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Политика конфиденциальности", path: "/privacy" },
        ])}
      />
      {children}
    </>
  );
}
