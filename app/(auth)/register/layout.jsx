import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata(
  "Регистрация аккаунта",
  "Страница регистрации клиента Bar Code Technologies.",
  "/register"
);

export default function RegisterLayout({ children }) {
  return children;
}
