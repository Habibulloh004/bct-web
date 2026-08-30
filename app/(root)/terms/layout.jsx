import JsonLd from "@/components/seo/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Условия использования",
  description:
    "Условия использования сайта Bar Code Technologies для покупателей оборудования автоматизации бизнеса в Узбекистане.",
  path: "/terms",
});

export default function TermsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Условия использования", path: "/terms" },
        ])}
      />
      {children}
    </>
  );
}
