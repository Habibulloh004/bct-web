export function getTranslatedValue(field, language) {
  if (!field) return "";

  // Handle object format (e.g., { en: "value", ru: "value", uz: "value" })
  if (typeof field === "object" && field !== null) {
    return field[language] || field["en"] || Object.values(field)[0] || "";
  }

  // Handle string format (e.g., "en_value***ru_value***uz_value")
  if (typeof field === "string") {
    const translations = field.split("***");
    const languages = ["en", "ru", "uz"];
    const index = languages.indexOf(language);
    
    // Return the translation for the current language, fallback to en, or first available
    if (index !== -1 && translations[index]) {
      return translations[index];
    }
    // Fallback to English (index 0) or first non-empty value
    return translations[0] || translations.find((val) => val) || "";
  }

  // Return the field as-is if it's neither a string nor an object
  return field;
}
