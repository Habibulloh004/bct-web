import { NextResponse } from "next/server";
import { formatTelegramContactMessage, sendTelegramMessage } from "@/lib/telegram";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // allow all origins/ports
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req) {
  const body = await req.json();
  await sendTelegramMessage(formatTelegramContactMessage(body));

  return new NextResponse("OK", { headers: CORS_HEADERS });
}
