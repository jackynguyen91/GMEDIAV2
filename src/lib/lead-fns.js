import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BRAND } from "@/lib/brand";

const SERVICE_VALUES = [
  "thiet-ke-website",
  "google-ads",
  "facebook-ads",
  "content",
  "digital-marketing",
  "ssl",
  "ten-mien-hosting",
  "khac",
];

const SOURCE_LABELS = {
  contact_form: "Form liên hệ",
  quote_form: "Form báo giá",
  domain_form: "Form đăng ký tên miền",
  quick_form: "Form gọi tư vấn",
  apply_form: "Form ứng tuyển",
  booking_form: "Form đặt lịch tư vấn",
};

const LeadInput = z.object({
  full_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(30),
  email: z.string().trim().max(160).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  service_interest: z.enum(SERVICE_VALUES).optional(),
  package_name: z.string().trim().max(160).optional().default(""),
  budget_range: z.enum(["duoi-5tr", "5-15tr", "15-50tr", "tren-50tr"]).optional(),
  domain_requested: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.enum([
    "contact_form",
    "quote_form",
    "domain_form",
    "quick_form",
    "apply_form",
    "booking_form",
  ]),
  consent: z.boolean(),
  page_url: z.string().trim().max(500).optional().default(""),
  utm_source: z.string().trim().max(120).optional().default(""),
  utm_medium: z.string().trim().max(120).optional().default(""),
  utm_campaign: z.string().trim().max(120).optional().default(""),
  honeypot: z.string().max(200).optional().default(""),
});

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function adminUrlFrom(pageUrl) {
  try {
    return `${new URL(pageUrl).origin}/admin`;
  } catch {
    return "/admin";
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .validator(LeadInput)
  .handler(async ({ data, context }) => {
    if (data.honeypot) return { ok: true };

    const phone = data.phone.replace(/[\s.-]/g, "");
    if (!/^0\d{9}$/.test(phone)) {
      throw new Error("Số điện thoại chưa hợp lệ. Vui lòng nhập 10 số và bắt đầu bằng 0.");
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      throw new Error("Email chưa đúng định dạng. Vui lòng kiểm tra lại.");
    }
    if (data.consent !== true) {
      throw new Error("Vui lòng đồng ý để GMedia liên hệ tư vấn theo thông tin đã cung cấp.");
    }

    // Chạy ngoài Base44 nên không có service role: dùng client của khách (ẩn danh) + RLS cho phép tạo Lead công khai.
    const service = context.getBase44();

    try {
      const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const recent = await service.entities.Lead.count({
        phone,
        created_date: { $gte: since },
      });
      if (recent >= 3) {
        throw new Error(
          `Bạn đã gửi yêu cầu nhiều lần. Vui lòng thử lại sau ít phút hoặc gọi hotline ${BRAND.hotline}.`
        );
      }
    } catch (error) {
      if (String(error?.message ?? "").startsWith("Bạn đã gửi")) throw error;
      console.log("Lead rate-limit check failed:", error?.message);
    }

    const lead = await service.entities.Lead.create({
      full_name: data.full_name,
      phone,
      email: data.email,
      company: data.company,
      service_interest: data.service_interest,
      package_name: data.package_name,
      budget_range: data.budget_range,
      domain_requested: data.domain_requested,
      message: data.message,
      source: data.source,
      status: "new",
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      page_url: data.page_url,
      consent: true,
    });

    const adminUrl = adminUrlFrom(data.page_url);
    const rows = [
      ["Họ tên", data.full_name],
      ["Số điện thoại", phone],
      ["Email", data.email],
      ["Công ty", data.company],
      ["Dịch vụ quan tâm", data.service_interest],
      ["Gói dịch vụ", data.package_name],
      ["Ngân sách dự kiến", data.budget_range],
      ["Tên miền yêu cầu", data.domain_requested],
      ["Nội dung", data.message],
      ["Nguồn", SOURCE_LABELS[data.source]],
      ["Trang gửi", data.page_url],
      ["UTM", [data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")],
    ].filter(([, value]) => value);

    try {
      await service.integrations.Core.SendEmail({
        to: BRAND.email,
        from_name: "GMedia Website",
        subject: `Lead mới (${SOURCE_LABELS[data.source]}): ${data.full_name} - ${phone}`,
        html: `
          <h2>Lead mới từ website GMedia</h2>
          <table cellpadding="6" cellspacing="0" border="0">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
              )
              .join("")}
          </table>
          <p><a href="${escapeHtml(adminUrl)}">Mở trang quản trị</a></p>
        `,
        text: `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nTrang quản trị: ${adminUrl}`,
      });
    } catch (error) {
      console.log("Lead notification email failed:", error?.message);
    }

    return { ok: true, id: lead.id };
  });