// lib/getTranslatedValue.ts
export function getTranslatedValue(value, lang) {
  const [en,ru, uz, ] = value?.split("***");

  switch (lang) {
    case "en":
      return en;
    case "uz":
      return uz;
    case "ru":
      return ru;
    default:
      return ru;
  }
}

