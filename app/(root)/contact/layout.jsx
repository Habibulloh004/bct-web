import JsonLd from "@/components/seo/JsonLd";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  SUPPORT_PHONE_DISPLAY,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Контакты Bar Code Technologies в Ташкенте",
  description: `Свяжитесь с Bar Code Technologies в Узбекистане: консультация по POS-оборудованию, сканерам штрих-кода, терминалам сбора данных и автоматизации бизнеса. Телефон: ${SUPPORT_PHONE_DISPLAY}.`,
  path: "/contact",
  keywords: [
    "контакты Bar Code Technologies",
    "POS оборудование Ташкент контакты",
    "автоматизация бизнеса консультация",
  ],
});

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Контакты", path: "/contact" },
        ])}
      />
      {children}
    </>
  );
}
