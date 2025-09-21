import { getBasicData } from "@/actions/get";
import SearchClient from "./_components/SearchClient";

export default async function SearchPage() {
     const currency = await getBasicData({
      endpoint: `/api/currency`,
      revalidate: 3600,
    });
    const currencyData = currency?.conversion_rates?.UZS || 13000; // Default qiymat
  
  return (
    <div className=" pb-10">
      <SearchClient currency={currencyData} />
    </div>
  );
}
