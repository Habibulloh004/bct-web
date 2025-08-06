import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "sonner";
import LanguageProvider from "@/components/providers/LanguageProvider";

// Poppins fontini kerakli og‘irliklar (weights) bilan chaqirish
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});


export const metadata = {
  title: "BCT Market – Мобильные телефоны и современная электроника",
  description: "BCT Market – надежный онлайн-магазин мобильных телефонов, POS-терминалов, аксессуаров и другой современной техники. Быстрая доставка и гарантия качества!",
};


export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          <Toaster closeButton />
          <div className="min-h-[calc(100vh-242px)]">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
