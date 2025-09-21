import { NextResponse } from "next/server";

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
    "https://v6.exchangerate-api.com/v6/286efca60d3bb4107182a63f/latest/USD",
    {
      next: { revalidate: 43200 }, // 12 soat cache
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { headers: CORS_HEADERS });
}
