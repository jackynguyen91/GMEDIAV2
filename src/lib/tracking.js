// Vị trí gắn mã theo dõi của GMedia.
// Điền ID thật khi muốn bật; để trống thì không có script nào được tải và không cookie nào được ghi.
export const GA4_ID = ""; // Ví dụ: "G-XXXXXXXXXX"
export const META_PIXEL_ID = ""; // Ví dụ: "1234567890123456"

// Gọi sau khi một form gửi thành công để ghi nhận chuyển đổi.
// Khi bật GA4 / Meta Pixel, gắn script tương ứng trong __root.jsx và bật banner đồng ý cookie trước.
export function trackLeadConversion({ source, service } = {}) {
  if (typeof window === "undefined") return;
  if (GA4_ID && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      form_source: source ?? "",
      service_interest: service ?? "",
    });
  }
  if (META_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: source ?? "" });
  }
}