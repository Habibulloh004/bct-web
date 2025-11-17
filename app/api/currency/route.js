import { NextResponse } from "next/server";
const currencyApiUrl = process.env.CURRENCY_API || "https://cbu.uz/ru/arkhiv-kursov-valyut/json";
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
  const findData = currencyData.find(cr => cr.Ccy === "USD");
  const data = Number(findData?.Rate) || 12000; // Default qiymat

  return NextResponse.json(data, { headers: CORS_HEADERS });
}
