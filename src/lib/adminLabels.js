export const STATUS_OPTIONS = [
  { value: "new", label: "Mới", className: "bg-cream text-ink border-line" },
  { value: "contacted", label: "Đã liên hệ", className: "bg-gold-light text-ink border-gold-dark" },
  { value: "quoted", label: "Đã báo giá", className: "bg-gold text-ink border-gold-dark" },
  { value: "won", label: "Đã chốt", className: "bg-ink text-gold-light border-ink" },
  { value: "lost", label: "Không chốt", className: "bg-white text-ink-soft border-line" },
];

export const STATUS_MAP = Object.fromEntries(STATUS_OPTIONS.map((item) => [item.value, item]));

export const SOURCE_OPTIONS = [
  { value: "contact_form", label: "Form liên hệ" },
  { value: "quote_form", label: "Form báo giá" },
  { value: "domain_form", label: "Form tên miền" },
  { value: "quick_form", label: "Form gọi tư vấn" },
  { value: "apply_form", label: "Form ứng tuyển" },
  { value: "booking_form", label: "Form đặt lịch tư vấn" },
];

export const SERVICE_KEY_OPTIONS = [
  { value: "website", label: "Thiết kế Website" },
  { value: "hosting", label: "Tên miền - Hosting" },
  { value: "google_ads", label: "Google Ads" },
  { value: "facebook_ads", label: "Facebook Ads" },
  { value: "content", label: "Content Website" },
  { value: "digital_marketing", label: "Digital Marketing" },
];

export function statusInfo(value) {
  return STATUS_MAP[value] ?? { value, label: value ?? "—", className: "bg-cream text-ink-soft border-line" };
}

export function sourceLabel(value) {
  return SOURCE_OPTIONS.find((item) => item.value === value)?.label ?? value ?? "—";
}

export function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}