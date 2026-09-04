import "server-only";
import sanitizeHtml from "sanitize-html";

const BLOG_LANGUAGES = ["en", "ru", "uz"];

export function parseLocalizedBlogField(value) {
  if (value && typeof value === "object") {
    return BLOG_LANGUAGES.reduce((result, language) => {
      result[language] = String(value[language] || "");
      return result;
    }, {});
  }

  const parts = String(value || "").split("***");
  return {
    en: parts[0] || "",
    ru: parts[1] || "",
    uz: parts[2] || "",
  };
}

export function sanitizeLocalizedBlogText(value) {
  const localized = parseLocalizedBlogField(value);

  return BLOG_LANGUAGES.reduce((result, language) => {
    result[language] = sanitizeHtml(localized[language], {
      allowedTags: [
        "p",
        "div",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "blockquote",
        "a",
        "code",
        "pre",
        "hr",
        "span",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        p: ["style"],
        div: ["style"],
        span: ["style"],
      },
      allowedStyles: {
        "*": {
          "text-align": [/^left$/, /^center$/, /^right$/, /^justify$/],
        },
      },
      allowedSchemes: ["http", "https", "mailto", "tel"],
      transformTags: {
        a: (tagName, attribs) => ({
          tagName,
          attribs: {
            ...attribs,
            rel: "noopener noreferrer",
          },
        }),
      },
    });
    return result;
  }, {});
}
