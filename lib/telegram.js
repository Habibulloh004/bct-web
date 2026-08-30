const TELEGRAM_API_BASE = "https://api.telegram.org";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatTelegramOrderMessage({ order, orderDetails, result }) {
  const products = Array.isArray(orderDetails?.products) ? orderDetails.products : [];
  const total = orderDetails?.totalAmount;
  const orderId = result?.id || result?._id || result?.data?.id || result?.data?._id;

  const productLines = products.length
    ? products
        .map((item, index) => {
          const name = escapeHtml(item?.name || item?.product_id || `Товар ${index + 1}`);
          const count = Number(item?.count || 1);
          const price = item?.price ? ` - ${escapeHtml(item.price)} сум` : "";
          return `${index + 1}. ${name} x ${count}${price}`;
        })
        .join("\n")
    : (Array.isArray(order?.products) ? order.products : [])
        .map((item, index) => `${index + 1}. ID: ${escapeHtml(item.product_id)} x ${item.count || 1}`)
        .join("\n") || "Нет данных о товарах";

  return [
    "🛒 <b>Новый заказ с сайта BCT</b>",
    "",
    orderId ? `🧾 <b>ID заказа:</b> ${escapeHtml(orderId)}` : null,
    `📞 <b>Телефон:</b> ${escapeHtml(order.phone)}`,
    `💳 <b>Оплата:</b> ${escapeHtml(order.pay_type)}`,
    order.client_id ? `👤 <b>Клиент ID:</b> ${escapeHtml(order.client_id)}` : "👤 <b>Клиент:</b> гость",
    "",
    "<b>Товары:</b>",
    productLines,
    total ? `\n💰 <b>Итого:</b> ${escapeHtml(total)} сум` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatTelegramContactMessage(body) {
  return [
    "📩 <b>Новая заявка с сайта BCT</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(body?.name || "-")}`,
    `📞 <b>Телефон:</b> ${escapeHtml(body?.phone || "-")}`,
    `✉️ <b>Сообщение:</b> ${escapeHtml(body?.message || "-")}`,
  ].join("\n");
}

export async function sendTelegramMessage(text, chatId = process.env.TELEGRAM_ORDERS_CHAT_ID) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token || !chatId) {
    console.warn("Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_ORDERS_CHAT_ID is missing");
    return { ok: false, skipped: true };
  }

  const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Telegram sendMessage failed: ${response.status} ${errorText}`);
  }

  return response.json();
}
