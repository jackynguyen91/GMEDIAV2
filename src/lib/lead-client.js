export function readAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    page_url: window.location.href.slice(0, 500),
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
  };
}

const KNOWN_PREFIXES = ["Số điện thoại", "Email chưa", "Vui lòng", "Bạn đã gửi"];

export function friendlyError(error) {
  const message = String(error?.message ?? "");
  if (KNOWN_PREFIXES.some((prefix) => message.includes(prefix))) return message;
  return "Gửi yêu cầu chưa thành công. Vui lòng thử lại hoặc gọi hotline 0911 597 086.";
}