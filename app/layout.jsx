import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "sonner";
import LanguageProvider from "@/components/providers/LanguageProvider";
import UserMigrationProvider from "@/components/providers/UserMigrationProvider";

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

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`${poppins.variable} ${poppinsItalic.variable} ${poppinsRegular.variable} antialiased`}>
        <LanguageProvider>
          <UserMigrationProvider>
            <Header />
            <Toaster closeButton />
            <div className="min-h-[calc(100vh-242px)]">{children}</div>
            <Footer />
          </UserMigrationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
