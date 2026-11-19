import { BRAND } from "@/lib/brand";

export const LEGAL_NAME_VI = "Công ty TNHH Công nghệ G Media";

export function absoluteUrl(path = "/") {
  return `${BRAND.website}${path === "/" ? "" : path}`;
}

export function pageHead({
  title,
  description,
  path = "/",
  image = BRAND.logoUrl,
  type = "website",
  publishedTime,
  noindex = false,
}) {
  const fullTitle = `${title} | ${BRAND.appName}`;
  const url = absoluteUrl(path);

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: BRAND.appName },
      { property: "og:locale", content: "vi_VN" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      ...(publishedTime
        ? [{ property: "article:published_time", content: publishedTime }]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}