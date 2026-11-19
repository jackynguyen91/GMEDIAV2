import { Eye, Trash2 } from "lucide-react";
import LeadCard from "@/components/admin/LeadCard";
import { SERVICE_OPTIONS } from "@/lib/leadOptions";
import { formatDateTime, sourceLabel, statusInfo } from "@/lib/adminLabels";
import { cn } from "@/lib/utils";

const serviceLabel = (value) =>
  SERVICE_OPTIONS.find((item) => item.value === value)?.label ?? "—";

const stop = (event) => event.stopPropagation();

const COLUMNS = [
  {
    key: "time",
    label: "Thời gian",
    width: "w-[124px] min-w-[124px]",
    sticky: "left-0",
    render: (lead) => (
      <span className="whitespace-nowrap text-xs text-ink-soft/70">
        {formatDateTime(lead.created_date)}
      </span>
    ),
  },
  {
    key: "name",
    label: "Họ tên",
    width: "w-[170px] min-w-[170px]",
    sticky: "left-[124px]",
    render: (lead) => (
      <span className="block truncate font-medium text-ink" title={lead.full_name}>
        {lead.full_name}
      </span>
    ),
  },
  {
    key: "phone",
    label: "SĐT",
    width: "w-[130px] min-w-[130px]",
    render: (lead) => (
      <a
        href={`tel:${lead.phone}`}
        onClick={stop}
        title={lead.phone}
        className="block truncate text-gold-dark underline-offset-2 hover:underline"
      >
        {lead.phone}
      </a>
    ),
  },
  {
    key: "email",
    label: "Email",
    width: "w-[200px] min-w-[200px]",
    render: (lead) => (
      <span className="block truncate text-xs text-ink-soft/70" title={lead.email || ""}>
        {lead.email || "—"}
      </span>
    ),
  },
  {
    key: "service",
    label: "Dịch vụ",
    width: "w-[170px] min-w-[170px]",
    render: (lead) => (
      <span className="block truncate text-xs text-ink-soft/70" title={serviceLabel(lead.service_interest)}>
        {serviceLabel(lead.service_interest)}
      </span>
    ),
  },
  {
    key: "package",
    label: "Gói",
    width: "w-[150px] min-w-[150px]",
    render: (lead) => (
      <span className="block truncate text-xs text-ink-soft/70" title={lead.package_name || ""}>
        {lead.package_name || "—"}
      </span>
    ),
  },
  {
    key: "source",
    label: "Nguồn",
    width: "w-[130px] min-w-[130px]",
    render: (lead) => (
      <span className="block truncate text-xs text-ink-soft/70" title={sourceLabel(lead.source)}>
        {sourceLabel(lead.source)}
      </span>
    ),
  },
  {
    key: "status",
    label: "Trạng thái",
    width: "w-[110px] min-w-[110px]",
    render: (lead) => {
      const status = statusInfo(lead.status);
      return (
        <span
          className={cn(
            "inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 font-body text-[11px] font-medium",
            status.className
          )}
        >
          {status.label}
        </span>
      );
    },
  },
];

export default function LeadTable({ leads, loading, selectedId, onSelect, onDelete }) {
  if (loading) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">Đang tải lead…</p>
    );
  }

  if (!leads.length) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">
        Không có lead nào khớp bộ lọc.
      </p>
    );
  }

  return (
    <>
      <ul className="divide-y divide-line md:hidden">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            selected={selectedId === lead.id}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </ul>

      <div className="hidden max-w-full overflow-x-auto md:block">
        <table className="w-[1276px] min-w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-cream">
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-3 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft/55",
                    column.width,
                    column.sticky && `sticky ${column.sticky} z-20 bg-cream`
                  )}
                >
                  {column.label}
                </th>
              ))}
              <th
                scope="col"
                className="w-[92px] whitespace-nowrap px-3 py-2.5 text-right font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft/55"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const selected = selectedId === lead.id;
              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelect(lead)}
                  className={cn(
                    "group cursor-pointer border-b border-line/70 transition-colors last:border-0",
                    selected ? "bg-cream" : "hover:bg-cream"
                  )}
                >
                  {COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-3 py-3 font-body text-sm",
                        column.width,
                        column.sticky &&
                          `sticky ${column.sticky} z-10 ${selected ? "bg-cream" : "bg-paper group-hover:bg-cream"}`
                      )}
                    >
                      {column.render(lead)}
                    </td>
                  ))}
                  <td className="w-[92px] px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label="Xem chi tiết"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelect(lead);
                        }}
                        className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-cream hover:text-gold-dark"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Xóa lead"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDelete(lead);
                        }}
                        className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}