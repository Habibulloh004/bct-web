import { NextResponse } from "next/server";
const currencyApiUrl = process.env.CURRENCY_API || "https://v6.exchangerate-api.com/v6/286efca60d3bb4107182a63f/latest/USD";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // barcha domenlarga ruxsat
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

// OPTIONS (preflight) uchun
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// GET uchun
export async function GET() {
  const res = await fetch(
    currencyApiUrl,
  );

  const currencyData = await res.json();
  const data = currencyData.conversion_rates?.UZS || 12000; // Default qiymat

  return NextResponse.json(data, { headers: CORS_HEADERS });
}
