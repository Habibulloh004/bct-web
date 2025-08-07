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

  return new Response("OK");
}
