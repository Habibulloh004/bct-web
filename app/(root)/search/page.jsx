import {  getCurrencyData } from "@/actions/get";
import SearchClient from "./_components/SearchClient";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata(
  "Поиск товаров",
  "Внутренний поиск товаров Bar Code Technologies.",
  "/search"
);

export default async function SearchPage() {
   const currency = await getCurrencyData()


  return (
    <div className="pb-10">
      <SearchClient currency={currency} />
    </div>
  );
}
