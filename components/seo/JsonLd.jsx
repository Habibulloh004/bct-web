export default function JsonLd({ data }) {
  const items = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);

  if (!items.length) {
    return null;
  }

  const payload = items.length === 1 ? items[0] : items;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
