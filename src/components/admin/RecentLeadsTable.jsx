import { Link } from "@tanstack/react-router";
import { SERVICE_OPTIONS } from "@/lib/leadOptions";
import { formatDateTime, statusInfo, sourceLabel } from "@/lib/adminLabels";

export default function RecentLeadsTable({ leads }) {
  if (!leads.length) {
    return (
      <p className="py-8 text-center font-body text-sm text-ink-soft/55">Chưa có lead nào.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {["Thời gian", "Họ tên", "SĐT", "Dịch vụ", "Nguồn", "Trạng thái"].map((title) => (
              <th
                key={title}
                className="whitespace-nowrap px-3 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft/55"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const status = statusInfo(lead.status);
            return (
              <tr key={lead.id} className="border-b border-line/70 last:border-0">
                <td className="whitespace-nowrap px-3 py-3 font-body text-xs text-ink-soft/70">
                  {formatDateTime(lead.created_date)}
                </td>
                <td className="px-3 py-3 font-body text-sm text-ink">{lead.full_name}</td>
                <td className="whitespace-nowrap px-3 py-3 font-body text-sm text-ink-soft/80">
                  {lead.phone}
                </td>
                <td className="px-3 py-3 font-body text-xs text-ink-soft/70">
                  {SERVICE_OPTIONS.find((item) => item.value === lead.service_interest)?.label ?? "—"}
                </td>
                <td className="px-3 py-3 font-body text-xs text-ink-soft/70">
                  {sourceLabel(lead.source)}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 font-body text-[11px] font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}