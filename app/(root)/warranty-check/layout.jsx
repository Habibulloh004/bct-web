import JsonLd from "@/components/seo/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Проверка гарантии оборудования",
  description:
    "Проверьте гарантию оборудования, купленного у Bar Code Technologies: POS-оборудование, сканеры штрих-кода, терминалы сбора данных и решения автоматизации.",
  path: "/warranty-check",
  keywords: ["проверка гарантии оборудования", "гарантия POS оборудования", "гарантия сканера штрих кода"],
});

export default function WarrantyCheckLayout({ children }) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Проверка гарантии", path: "/warranty-check" },
        ])}
      />
      {children}
    </>
  );
}
