import { getBasicData } from "@/actions/get";
import SearchClient from "./_components/SearchClient";

export default async function SearchPage() {
  const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 43200
  });

  return (
    <div className=" pb-10">
      <SearchClient currency={currency} />
    </div>
  );
}
