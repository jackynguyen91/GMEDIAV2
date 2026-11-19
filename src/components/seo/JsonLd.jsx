import { BRAND } from "@/lib/brand";
import { LEGAL_NAME_VI } from "@/lib/seo";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SAME_AS = [BRAND.facebookUrl, BRAND.instagramUrl, BRAND.zaloUrl];

export function BusinessJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: BRAND.addressVi,
    addressLocality: "TP. Hồ Chí Minh",
    addressCountry: "VN",
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${BRAND.website}/#organization`,
            name: LEGAL_NAME_VI,
            alternateName: BRAND.name,
            url: BRAND.website,
            logo: {
              "@type": "ImageObject",
              url: BRAND.logoUrl,
            },
            email: BRAND.email,
            telephone: BRAND.hotlineTel,
            address,
            sameAs: SAME_AS,
          },
          {
            "@type": "LocalBusiness",
            "@id": `${BRAND.website}/#localbusiness`,
            name: LEGAL_NAME_VI,
            image: BRAND.logoUrl,
            url: BRAND.website,
            telephone: BRAND.hotlineTel,
            email: BRAND.email,
            priceRange: "1.000.000₫ - 50.000.000₫",
            address,
            sameAs: SAME_AS,
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
            ],
          },
        ],
      }}
    />
  );
}

export function BlogPostingJsonLd({ post, url }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo_description || post.excerpt || undefined,
        image: post.cover_image || BRAND.logoUrl,
        datePublished: post.published_at || post.created_date || undefined,
        dateModified: post.updated_date || post.published_at || undefined,
        inLanguage: "vi-VN",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": "Organization",
          name: LEGAL_NAME_VI,
          url: BRAND.website,
        },
        publisher: {
          "@type": "Organization",
          name: LEGAL_NAME_VI,
          logo: { "@type": "ImageObject", url: BRAND.logoUrl },
        },
      }}
    />
  );
}