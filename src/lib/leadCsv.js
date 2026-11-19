import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/lib/leadOptions";
import { statusInfo, sourceLabel, formatDateTime } from "@/lib/adminLabels";

export const LEAD_COLUMNS = [
  ["Thời gian", (lead) => formatDateTime(lead.created_date)],
  ["Họ tên", (lead) => lead.full_name],
  ["Số điện thoại", (lead) => lead.phone],
  ["Email", (lead) => lead.email],
  ["Công ty", (lead) => lead.company],
  ["Dịch vụ", (lead) => serviceLabel(lead.service_interest)],
  ["Gói", (lead) => lead.package_name],
  ["Ngân sách", (lead) => BUDGET_OPTIONS.find((o) => o.value === lead.budget_range)?.label ?? lead.budget_range],
  ["Tên miền", (lead) => lead.domain_requested],
  ["Nội dung", (lead) => lead.message],
  ["Nguồn", (lead) => sourceLabel(lead.source)],
  ["Trạng thái", (lead) => statusInfo(lead.status).label],
  ["Ghi chú nội bộ", (lead) => lead.internal_note],
  ["UTM source", (lead) => lead.utm_source],
  ["UTM medium", (lead) => lead.utm_medium],
  ["UTM campaign", (lead) => lead.utm_campaign],
  ["Trang gửi", (lead) => lead.page_url],
];

function serviceLabel(value) {
  return SERVICE_OPTIONS.find((item) => item.value === value)?.label ?? value ?? "";
}

function cell(value) {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
}

export function leadsToCsv(leads) {
  const header = LEAD_COLUMNS.map(([title]) => cell(title)).join(",");
  const rows = leads.map((lead) => LEAD_COLUMNS.map(([, getter]) => cell(getter(lead))).join(","));
  return `\uFEFF${[header, ...rows].join("\r\n")}`;
}

export function downloadCsv(leads, filename) {
  const blob = new Blob([leadsToCsv(leads)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}