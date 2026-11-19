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
import CoverUpload from "@/components/admin/CoverUpload";
import { slugify } from "@/lib/slugify";

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-3 py-2 font-body text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

const EMPTY = {
  title: "",
  slug: "",
  category: "Website",
  description: "",
  project_url: "",
  is_featured: false,
  sort_order: 1,
  cover_image: "",
};

export default function ProjectDialog({ open, project, onClose, onSave }) {
  const [values, setValues] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    setValues(
      project
        ? {
            title: project.title ?? "",
            slug: project.slug ?? "",
            category: project.category ?? "Website",
            description: project.description ?? "",
            project_url: project.project_url ?? "",
            is_featured: !!project.is_featured,
            sort_order: project.sort_order ?? 1,
            cover_image: project.cover_image ?? "",
          }
        : EMPTY
    );
  }, [open, project]);

  const set = (field) => (event) => {
    const value = event.target.value;
    setValues((current) => {
      const next = { ...current, [field]: value };
      if (field === "title") next.slug = slugify(value);
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const slug = slugify(values.slug || values.title);
    if (!values.title.trim() || !slug) {
      setError("Vui lòng nhập tên dự án.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({
        ...(project ? { id: project.id } : {}),
        title: values.title.trim(),
        slug,
        category: values.category.trim(),
        description: values.description.trim(),
        project_url: values.project_url.trim(),
        is_featured: values.is_featured,
        sort_order: Number(values.sort_order) || 1,
        cover_image: values.cover_image,
      });
    } catch (err) {
      setError(err?.message ?? "Lưu dự án thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Sửa dự án" : "Thêm dự án"}</DialogTitle>
          <DialogDescription>Dự án hiển thị trên trang Dự án và Trang chủ.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Tên dự án *
            </span>
            <input id="proj-title" value={values.title} onChange={set("title")} className={`mt-1.5 ${inputClass}`} />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                Slug
              </span>
              <input id="proj-slug" value={values.slug} onChange={set("slug")} className={`mt-1.5 ${inputClass}`} />
            </label>
            <label className="block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                Danh mục
              </span>
              <input
                id="proj-category"
                value={values.category}
                onChange={set("category")}
                placeholder="Website"
                className={`mt-1.5 ${inputClass}`}
              />
            </label>
          </div>

          <CoverUpload
            value={values.cover_image}
            onChange={(url) => setValues((current) => ({ ...current, cover_image: url }))}
            label="Ảnh dự án"
            inputId="proj-cover"
          />

          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Mô tả
            </span>
            <textarea
              id="proj-desc"
              rows={3}
              value={values.description}
              onChange={set("description")}
              className={`mt-1.5 resize-y ${inputClass}`}
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                Link dự án
              </span>
              <input
                id="proj-url"
                value={values.project_url}
                onChange={set("project_url")}
                placeholder="https://"
                className={`mt-1.5 ${inputClass}`}
              />
            </label>
            <label className="block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                Thứ tự
              </span>
              <input
                id="proj-sort"
                type="number"
                min="1"
                value={values.sort_order}
                onChange={set("sort_order")}
                className={`mt-1.5 ${inputClass}`}
              />
            </label>
          </div>

          <label className="flex items-center gap-2 font-body text-sm text-ink">
            <input
              type="checkbox"
              checked={values.is_featured}
              onChange={(event) =>
                setValues((current) => ({ ...current, is_featured: event.target.checked }))
              }
              className="h-4 w-4 accent-gold-dark"
            />
            Hiển thị ở mục “Dự án nổi bật” trên Trang chủ
          </label>

          {error && <p className="font-body text-sm text-destructive">{error}</p>}

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="secondary" size="md" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" size="md" loading={saving}>
              Lưu dự án
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}