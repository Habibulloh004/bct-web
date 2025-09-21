export function getTranslatedValue(field, language) {
  if (!field) return "";

  // Handle object format (e.g., { en: "value", ru: "value", uz: "value" })
  if (typeof field === "object" && field !== null) {
    let value = field[language];

    // Agar value yo'q yoki bo'sh bo'lsa rus tilidagini olish
    if (value === null || value === undefined || value === "") {
      value = field["ru"];
    }

    return value || field["en"] || Object.values(field)[0] || "";
  }

  // Handle string format (e.g., "en_value***ru_value***uz_value")
  if (typeof field === "string") {
    const translations = field.split("***");
    const languages = ["en", "ru", "uz"];
    const index = languages.indexOf(language);

    let value = (index !== -1 && translations[index]) ? translations[index] : "";

    // Agar value bo'sh bo'lsa rus tilidagisini olish
    if (!value) {
      const ruIndex = languages.indexOf("ru");
      value = translations[ruIndex];
    }

    // Fallback: English yoki birinchi mavjud bo'lgan qiymat
    return value || translations[0] || translations.find((val) => val) || "";
  }

  // Return the field as-is if it's neither a string nor an object
  return field;
}


// 1 USD -> UZS kursini olish (exchangerate-api dan)
async function getUsdToUzsRate() {
  const res = await fetch("https://v6.exchangerate-api.com/v6/286efca60d3bb4107182a63f/latest/USD");
  const data = await res.json();
  if (!data || !data.conversion_rates || !data.conversion_rates.UZS) {
    throw new Error("UZS kursi topilmadi");
  }
  return data.conversion_rates.UZS;
}

// Mahsulot narxini USD -> UZS ga aylantirish
export async function convertPriceToUzs(priceUsd) {
  const rate = await getUsdToUzsRate();
  const rateWithMarkup = rate * 1.01; // 1% ustiga qo'yish
  const raw = priceUsd * rateWithMarkup;
  const rounded = Math.round(raw / 1000) * 1000; // 1000 ga yaxlitlash
  return rounded;
}



