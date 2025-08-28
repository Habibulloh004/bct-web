import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "sonner";
import LanguageProvider from "@/components/providers/LanguageProvider";
import UserMigrationProvider from "@/components/providers/UserMigrationProvider";
import { getData } from "@/actions/get";
import NextTopLoader from "nextjs-toploader";

// Montserrat normal (umumiy)
const poppins = Montserrat({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: "normal",
});

// Montserrat italic
const poppinsItalic = Montserrat({
  variable: "--font-poppins-italic",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: "italic",
});

// ✅ Montserrat REGULAR (alohida var, qulay qo'llash uchun)
const poppinsRegular = Montserrat({
  variable: "--font-poppins-regular",
  subsets: ["latin"],
  weight: ["400"], // xohlasangiz ["300","400","500"] qilib kengaytirishingiz mumkin
  style: "normal",
});

export const metadata = {
  title: "BCT Market – Мобильные телефоны и современная электроника",
  description:
    "BCT Market – надежный онлайн-магазин мобильных телефонов, POS-терминалов, аксессуаров и другой современной техники. Быстрая доставка и гарантия качества!",
};

export default async function RootLayout({ children }) {
  let contact = await getData({
    endpoint: `/api/contacts?page=1&limit=12`,
    tag: ["contacts"],
    revalidate: 3600
  })
  // let products = await getData({
  //   endpoint: `/api/products?page=1&limit=100`,
  //   tag: ["products"],
  //   revalidate: 3600
  // })
  let products = { data: [] }
  const contactInfo = contact?.data[0]
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`${poppins.variable} ${poppinsItalic.variable} ${poppinsRegular.variable} antialiased`}>
        <LanguageProvider>
          <UserMigrationProvider>
            <NextTopLoader
              color="#495058"              // rang
              initialPosition={0.08}    // boshlang‘ich progress
              crawlSpeed={200}
              height={3}                // chiziq balandligi (px)
              crawl                     // sekin “yurish” effekti
              showSpinner={false}       // spinnerni o‘chirib qo‘yish
              easing="ease"
              speed={200}
              shadow="0 0 10px #29D, 0 0 5px #29D" // ixtiyoriy soyalar
            />
            <Header products={products} contactInfo={contactInfo} />
            <Toaster closeButton />
            <div className="min-h-[calc(100vh-242px)] pb-4">{children}</div>
            <Footer contactInfo={contactInfo} />
          </UserMigrationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
