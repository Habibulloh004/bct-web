// app/api/currency/route.js
export async function GET() {
  const res = await fetch(
    "https://v6.exchangerate-api.com/v6/286efca60d3bb4107182a63f/latest/USD",
    {
      next: { revalidate: 43200 }, // 12 soat (43200 sekund)
    }
  );

  const data = await res.json();
  return Response.json(data);
}
