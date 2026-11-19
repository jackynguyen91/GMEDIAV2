import { slugify } from "@/lib/slugify";

const HEADING_PATTERN = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;

function plainText(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Injects stable ids into H2/H3 so the table of contents can link to them.
export function buildToc(html) {
  const items = [];

  const content = String(html ?? "").replace(
    HEADING_PATTERN,
    (match, level, attrs, inner) => {
      const text = plainText(inner);
      if (!text) return match;
      const base = slugify(text) || `muc-${items.length + 1}`;
      let id = base;
      let suffix = 2;
      while (items.some((item) => item.id === id)) {
        id = `${base}-${suffix}`;
        suffix += 1;
      }
      items.push({ id, text, level: Number(level) });
      const cleanAttrs = String(attrs ?? "").replace(/\sid=("[^"]*"|'[^']*')/gi, "");
      return `<h${level}${cleanAttrs} id="${id}">${inner}</h${level}>`;
    }
  );

  return { content, items };
}

export function stripHtml(html) {
  return plainText(html);
}