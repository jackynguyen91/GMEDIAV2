import { BRAND } from "@/lib/brand";

export const SITE_SETTING_DEFAULTS = {
  hotline: BRAND.hotline,
  email: BRAND.email,
  address: BRAND.addressVi,
  zalo_url: BRAND.zaloUrl,
  facebook_url: BRAND.facebookUrl,
  instagram_url: BRAND.instagramUrl,
};

export function telFromHotline(hotline) {
  const digits = String(hotline ?? "").replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) return `+84${digits.slice(1)}`;
  return digits;
}

export function zaloFromHotline(hotline) {
  return `https://zalo.me/${String(hotline ?? "").replace(/\D/g, "")}`;
}

export function withDefaults(record) {
  const merged = { ...SITE_SETTING_DEFAULTS };
  Object.entries(record ?? {}).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim()) merged[key] = value.trim();
  });
  return {
    ...merged,
    hotlineTel: telFromHotline(merged.hotline),
    zaloUrl: merged.zalo_url || zaloFromHotline(merged.hotline),
  };
}