import {  getCurrencyData } from "@/actions/get";
import SearchClient from "./_components/SearchClient";

export default async function SearchPage() {
   const currency = await getCurrencyData()


  return (
    <div className="pb-10">
      <SearchClient currency={currency} />
    </div>
  );
}
