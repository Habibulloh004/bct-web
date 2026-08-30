import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata(
  "Вход в аккаунт",
  "Страница входа клиента Bar Code Technologies.",
  "/login"
);

export default function LoginLayout({ children }) {
  return children;
}
