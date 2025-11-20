import { NextResponse } from "next/server";

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
  const message = `📩 Yangi murojaat:\n\n👤 Ism: ${body.name}\n📞 Telefon: ${body.phone}\n✉️ Xabar: ${body.message}`;

  await fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: "<YOUR_CHAT_ID>",
      text: message,
    }),
  });

  return new NextResponse("OK", { headers: CORS_HEADERS });
}
