import { getTranslatedValue } from "@/lib/functions";

const CYRILLIC_TO_LATIN = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  қ: "q",
  ғ: "g",
  ҳ: "h",
  ў: "o",
};

export function extractMongoId(value) {
  return String(value || "").match(/[a-f\d]{24}/i)?.[0] || "";
}

export function slugify(value) {
  const transliterated = String(value || "")
    .toLowerCase()
    .replace(/[а-яёқғҳў]/g, (letter) => CYRILLIC_TO_LATIN[letter] || letter)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return transliterated || "catalog";
}

export function getRouteTitle(value, language = "ru") {
  return getTranslatedValue(value, language)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createCategorySegment(category, language = "ru") {
  const id = extractMongoId(category?.id || category);
  const name = typeof category === "object" ? getRouteTitle(category?.name, language) : "";

  return name ? `${id}-${slugify(name)}` : id;
}

export function createProductSegment(product, language = "ru") {
  const id = extractMongoId(product?.id || product);
  const name = typeof product === "object" ? getRouteTitle(product?.name, language) : "";

  return name ? `${id}-${slugify(name)}` : id;
}

export function createCategoryPath(category, language = "ru") {
  return `/${createCategorySegment(category, language)}`;
}

export function createProductPath(product, language = "ru") {
  return `/${createCategorySegment(
    { id: product?.category_id, name: product?.category_name },
    language
  )}/${createProductSegment(product, language)}`;
}
