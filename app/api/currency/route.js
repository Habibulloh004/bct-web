import { NextResponse } from "next/server";
const currencyApiUrl = process.env.CURRENCY_API || "https://cbu.uz/ru/arkhiv-kursov-valyut/json";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // barcha domenlarga ruxsat
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

// Keep this endpoint dynamic so we always fetch fresh rates
export const dynamic = "force-dynamic";

// OPTIONS (preflight) uchun
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// GET uchun
export async function GET() {
  try {
    const res = await fetch(currencyApiUrl, {
      // avoid cache issues on deploy
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Currency API responded with ${res.status}`);
    }

    const currencyData = await res.json();
    const findData = currencyData.find(cr => cr.Ccy === "USD");
    const data = Number(findData?.Rate);

    // If the API schema changes or USD not found, fall back gracefully
    if (Number.isFinite(data)) {
      return NextResponse.json(data, { headers: CORS_HEADERS });
    }
  } catch (err) {
    console.error("[currency] fetch failed", err);
  }

  // Fallback if the upstream API fails
  return NextResponse.json(12000, { headers: CORS_HEADERS, status: 200 });
}
