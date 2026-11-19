import { Eye, Trash2 } from "lucide-react";
import { SERVICE_OPTIONS } from "@/lib/leadOptions";
import { formatDateTime, sourceLabel, statusInfo } from "@/lib/adminLabels";
import { cn } from "@/lib/utils";

export default function LeadCard({ lead, selected, onSelect, onDelete }) {
  const status = statusInfo(lead.status);
  const service = SERVICE_OPTIONS.find((item) => item.value === lead.service_interest)?.label;

  return (
    <li
      className={cn(
        "px-4 py-4 transition-colors",
        selected ? "bg-cream" : "hover:bg-cream/60"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelect(lead)}
          className="min-w-0 flex-1 text-left"
        >
          <p className="truncate font-body text-sm font-semibold text-ink">{lead.full_name}</p>
          <p className="mt-0.5 truncate font-body text-xs font-medium text-gold-dark">
            {lead.phone}
          </p>
          {lead.email && (
            <p className="mt-0.5 truncate font-body text-xs text-ink-soft/60">{lead.email}</p>
          )}
        </button>

        <span
          className={cn(
            "inline-flex shrink-0 rounded-full border px-2.5 py-1 font-body text-[11px] font-medium",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[11px] text-ink-soft/60">
        <span>{formatDateTime(lead.created_date)}</span>
        {service && (
          <>
            <span aria-hidden="true">·</span>
            <span className="truncate">{service}</span>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span className="truncate">{sourceLabel(lead.source)}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(lead)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-body text-xs text-ink transition-colors hover:border-gold hover:text-gold-dark"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          Xem
        </button>
        <button
          type="button"
          onClick={() => onDelete(lead)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-body text-xs text-ink-soft/70 transition-colors hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Xóa
        </button>
      </div>
    </li>
  );
}