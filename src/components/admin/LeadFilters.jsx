import { Download, RotateCcw } from "lucide-react";
import Button from "@/components/brand/Button";
import { SERVICE_OPTIONS } from "@/lib/leadOptions";
import { SOURCE_OPTIONS, STATUS_OPTIONS } from "@/lib/adminLabels";

const controlClass =
  "h-11 w-full min-w-0 max-w-full rounded-xl border border-line bg-paper px-3 font-body text-sm text-ink transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

export default function LeadFilters({ filters, onChange, onReset, onExport, exporting }) {
  const set = (field) => (event) => onChange({ ...filters, [field]: event.target.value });

  return (
    <div className="min-w-0 max-w-full rounded-xl border border-line bg-paper p-4 shadow-luxe">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <input
          type="search"
          aria-label="Tìm theo tên hoặc số điện thoại"
          placeholder="Tìm theo tên hoặc SĐT"
          value={filters.search}
          onChange={set("search")}
          className={`${controlClass} col-span-full xl:col-span-2`}
        />
        <select
          aria-label="Trạng thái"
          value={filters.status}
          onChange={set("status")}
          className={controlClass}
        >
          <option value="">Mọi trạng thái</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Dịch vụ"
          value={filters.service}
          onChange={set("service")}
          className={controlClass}
        >
          <option value="">Mọi dịch vụ</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Nguồn"
          value={filters.source}
          onChange={set("source")}
          className={controlClass}
        >
          <option value="">Mọi nguồn</option>
          {SOURCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div
          role="group"
          aria-label="Từ ngày - Đến ngày"
          className="col-span-full grid min-w-0 grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center"
        >
          <input
            type="date"
            aria-label="Từ ngày"
            value={filters.from}
            onChange={set("from")}
            className={controlClass}
          />
          <span aria-hidden="true" className="hidden text-center font-body text-xs text-ink-soft/50 sm:block">
            →
          </span>
          <input
            type="date"
            aria-label="Đến ngày"
            value={filters.to}
            onChange={set("to")}
            className={controlClass}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl px-3 font-body text-xs text-ink-soft/60 transition-colors hover:text-ink sm:h-auto sm:w-auto sm:py-2"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Xóa lọc
        </button>
        <Button
          type="button"
          size="sm"
          onClick={onExport}
          loading={exporting}
          className="w-full justify-center sm:w-auto"
        >
          <Download className="h-4 w-4" />
          Xuất Excel
        </Button>
      </div>
    </div>
  );
}