export const SERVICE_OPTIONS = [
  { value: "thiet-ke-website", label: "Thiết kế Website - WebApp", packageKey: "website" },
  { value: "google-ads", label: "Google Ads", packageKey: "google_ads" },
  { value: "facebook-ads", label: "Facebook Ads", packageKey: "facebook_ads" },
  { value: "content", label: "Content Website", packageKey: "content" },
  { value: "digital-marketing", label: "Digital Marketing", packageKey: "digital_marketing" },
  { value: "ssl", label: "Chứng chỉ SSL", packageKey: null },
  { value: "ten-mien-hosting", label: "Tên miền - Hosting", packageKey: "hosting" },
  { value: "khac", label: "Khác", packageKey: null },
];

export const BUDGET_OPTIONS = [
  { value: "duoi-5tr", label: "Dưới 5 triệu" },
  { value: "5-15tr", label: "5 - 15 triệu" },
  { value: "15-50tr", label: "15 - 50 triệu" },
  { value: "tren-50tr", label: "Trên 50 triệu" },
];

export function packagesForService(packages, serviceValue) {
  const option = SERVICE_OPTIONS.find((item) => item.value === serviceValue);
  if (!option?.packageKey) return [];
  return packages.filter((pkg) => pkg.service_key === option.packageKey);
}