import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone, Trash2, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/leadOptions";
import { STATUS_OPTIONS, formatDateTime, sourceLabel, statusInfo } from "@/lib/adminLabels";
import { cn } from "@/lib/utils";

function InfoRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/70 py-2 last:border-0">
      <span className="font-body text-xs uppercase tracking-[0.1em] text-ink-soft/50">{label}</span>
      <span className="max-w-[62%] break-words text-right font-body text-sm text-ink">{children || "—"}</span>
    </div>
  );
}

export default function LeadDrawer({ lead, onClose, onUpdated, onDeleteRequest }) {
  const [note, setNote] = useState(lead.internal_note ?? "");
  const [savedNote, setSavedNote] = useState(lead.internal_note ?? "");
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    setNote(lead.internal_note ?? "");
    setSavedNote(lead.internal_note ?? "");
    setSaveState("idle");
  }, [lead.id]);

  useEffect(() => {
    if (note === savedNote) return;
    setSaveState("saving");
    const timer = setTimeout(async () => {
      try {
        await base44.entities.Lead.update(lead.id, { internal_note: note });
        setSavedNote(note);
        setSaveState("saved");
        onUpdated({ internal_note: note });
      } catch {
        setSaveState("error");
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [note, savedNote, lead.id, onUpdated]);

  const status = statusInfo(lead.status);
  const zaloUrl = `https://zalo.me/${String(lead.phone ?? "").replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Đóng chi tiết"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-paper shadow-luxe-lg">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-line bg-paper px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">{lead.full_name}</h2>
            <p className="mt-1 font-body text-xs text-ink-soft/55">
              {formatDateTime(lead.created_date)} · {sourceLabel(lead.source)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-cream hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="space-y-5 px-5 py-5">
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 font-body text-xs text-ink transition-colors hover:border-gold hover:text-gold-dark"
            >
              <Phone className="h-3.5 w-3.5" />
              Gọi {lead.phone}
            </a>
            <a
              href={zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gold/60 bg-cream px-3 py-2 font-body text-xs text-gold-dark transition-colors hover:bg-gold/10"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Mở Zalo
            </a>
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 font-body text-xs text-ink transition-colors hover:border-gold hover:text-gold-dark"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            )}
          </div>

          <section>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft/55">
              Trạng thái
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onUpdated({ status: option.value })}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-body text-[11px] font-medium transition-all",
                    option.className,
                    lead.status === option.value
                      ? "ring-2 ring-gold-dark/60 ring-offset-1"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft/55">
              Thông tin lead
            </h3>
            <div className="mt-2">
              <InfoRow label="Họ tên">{lead.full_name}</InfoRow>
              <InfoRow label="SĐT">{lead.phone}</InfoRow>
              <InfoRow label="Email">{lead.email}</InfoRow>
              <InfoRow label="Công ty">{lead.company}</InfoRow>
              <InfoRow label="Dịch vụ">
                {SERVICE_OPTIONS.find((item) => item.value === lead.service_interest)?.label}
              </InfoRow>
              <InfoRow label="Gói">{lead.package_name}</InfoRow>
              <InfoRow label="Ngân sách">
                {BUDGET_OPTIONS.find((item) => item.value === lead.budget_range)?.label}
              </InfoRow>
              <InfoRow label="Tên miền">{lead.domain_requested}</InfoRow>
              <InfoRow label="Nguồn">{sourceLabel(lead.source)}</InfoRow>
              <InfoRow label="Trạng thái">
                <span className={cn("rounded-full border px-2 py-0.5 text-[11px]", status.className)}>
                  {status.label}
                </span>
              </InfoRow>
              <InfoRow label="Đồng ý nhận tư vấn">{lead.consent ? "Có" : "Không"}</InfoRow>
            </div>
          </section>

          {lead.message && (
            <section>
              <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft/55">
                Nội dung
              </h3>
              <p className="mt-2 whitespace-pre-line rounded-xl border border-line bg-cream/60 p-3 font-body text-sm leading-relaxed text-ink-soft/85">
                {lead.message}
              </p>
            </section>
          )}

          <section>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft/55">
              Ghi chú nội bộ
            </h3>
            <textarea
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ghi chú về quá trình tư vấn…"
              className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-3 py-2.5 font-body text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
            />
            <p className="mt-1 font-body text-[11px] text-ink-soft/50">
              {saveState === "saving" && "Đang lưu…"}
              {saveState === "saved" && "Đã lưu tự động"}
              {saveState === "error" && "Lưu thất bại, vui lòng thử lại"}
              {saveState === "idle" && "Tự động lưu sau khi ngừng nhập"}
            </p>
          </section>

          <section>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft/55">
              Nguồn truy cập
            </h3>
            <div className="mt-2">
              <InfoRow label="Trang gửi">{lead.page_url}</InfoRow>
              <InfoRow label="UTM source">{lead.utm_source}</InfoRow>
              <InfoRow label="UTM medium">{lead.utm_medium}</InfoRow>
              <InfoRow label="UTM campaign">{lead.utm_campaign}</InfoRow>
            </div>
          </section>

          <button
            type="button"
            onClick={() => onDeleteRequest(lead)}
            className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 px-3 py-2 font-body text-xs text-destructive transition-colors hover:bg-destructive/5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Xóa lead này
          </button>
        </div>
      </aside>
    </div>
  );
}