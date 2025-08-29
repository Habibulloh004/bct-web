export function colorsToCSSVars(colors) {
  const lines = (colors || []).map(({ key, color }) => {
    const name = `--${String(key || "").replace(/_/g, "-")}`;
    return `${name}: ${String(color)};`;
  });
  return `:root{${lines.join("")}}`;
}
