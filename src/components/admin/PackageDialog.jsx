import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/brand/Button";
import { SERVICE_KEY_OPTIONS } from "@/lib/adminLabels";

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-3 py-2 font-body text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

const EMPTY = {
  name: "",
  service_key: "website",
  price_label: "",
  price_note: "",
  features: "",
  highlight: false,
  is_active: true,
  sort_order: 1,
};

export default function PackageDialog({ open, pkg, onClose, onSave }) {
  const [values, setValues] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    setValues(
      pkg
        ? {
            name: pkg.name ?? "",
            service_key: pkg.service_key ?? "website",
            price_label: pkg.price_label ?? "",
            price_note: pkg.price_note ?? "",
            features: (pkg.features ?? []).join("\n"),
            highlight: !!pkg.highlight,
            is_active: pkg.is_active !== false,
            sort_order: pkg.sort_order ?? 1,
          }
        : EMPTY
    );
  }, [open, pkg]);

  const set = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.name.trim() || !values.price_label.trim()) {
      setError("Vui lòng nhập tên gói và giá hiển thị.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({
        ...(pkg ? { id: pkg.id } : {}),
        name: values.name.trim(),
        service_key: values.service_key,
        price_label: values.price_label.trim(),
        price_note: values.price_note.trim(),
        features: values.features
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        highlight: values.highlight,
        is_active: values.is_active,
        sort_order: Number(values.sort_order) || 1,
      });
    } catch (err) {
      setError(err?.message ?? "Lưu gói thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{pkg ? "Sửa gói dịch vụ" : "Thêm gói dịch vụ"}</DialogTitle>
          <DialogDescription>
            Thông tin này hiển thị ngay trên các trang dịch vụ công khai.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Tên gói *
            </span>
            <input
              id="pkg-name"
              value={values.name}
              onChange={set("name")}
              className={`mt-1.5 ${inputClass}`}
            />
          </label>

          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Dịch vụ *
            </span>
            <select
              id="pkg-service"
              value={values.service_key}
              onChange={set("service_key")}
              className={`mt-1.5 ${inputClass}`}
            >
              {SERVICE_KEY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                Giá hiển thị *
              </span>
              <input
                id="pkg-price"
                value={values.price_label}
                onChange={set("price_label")}
                placeholder="4.900.000đ"
                className={`mt-1.5 ${inputClass}`}
              />
            </label>
            <label className="block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                Thứ tự
              </span>
              <input
                id="pkg-sort"
                type="number"
                min="1"
                value={values.sort_order}
                onChange={set("sort_order")}
                className={`mt-1.5 ${inputClass}`}
              />
            </label>
          </div>

          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Ghi chú giá
            </span>
            <input value={values.price_note} onChange={set("price_note")} className={`mt-1.5 ${inputClass}`} />
          </label>

          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Quyền lợi (mỗi dòng một mục)
            </span>
            <textarea
              id="pkg-features"
              rows={5}
              value={values.features}
              onChange={set("features")}
              className={`mt-1.5 resize-y ${inputClass}`}
            />
          </label>

          <div className="flex flex-wrap gap-5 pt-1">
            <label className="flex items-center gap-2 font-body text-sm text-ink">
              <input
                type="checkbox"
                checked={values.highlight}
                onChange={(event) =>
                  setValues((current) => ({ ...current, highlight: event.target.checked }))
                }
                className="h-4 w-4 accent-gold-dark"
              />
              Gói nổi bật
            </label>
            <label className="flex items-center gap-2 font-body text-sm text-ink">
              <input
                type="checkbox"
                checked={values.is_active}
                onChange={(event) =>
                  setValues((current) => ({ ...current, is_active: event.target.checked }))
                }
                className="h-4 w-4 accent-gold-dark"
              />
              Hiển thị trên website
            </label>
          </div>

          {error && <p className="font-body text-sm text-destructive">{error}</p>}

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="secondary" size="md" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" size="md" loading={saving}>
              Lưu gói
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}