import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import Button from "@/components/brand/Button";
import CoverUpload from "@/components/admin/CoverUpload";
import { formatViDate } from "@/lib/date";
import { slugify } from "@/lib/slugify";

const RichTextEditor = lazy(() => import("@/components/admin/RichTextEditor"));

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-3 py-2 font-body text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

const EMPTY = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  tags: "",
  is_published: false,
  published_at: "",
  seo_title: "",
  seo_description: "",
};

export default function PostEditorForm({ postId }) {
  const isNew = postId === "moi";
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [slugLocked, setSlugLocked] = useState(!isNew);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    let alive = true;
    setLoading(true);
    base44.entities.BlogPost.get(postId)
      .then((post) => {
        if (!alive) return;
        setValues({
          title: post.title ?? "",
          slug: post.slug ?? "",
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          cover_image: post.cover_image ?? "",
          category: post.category ?? "",
          tags: (post.tags ?? []).join(", "),
          is_published: !!post.is_published,
          published_at: post.published_at ?? "",
          seo_title: post.seo_title ?? "",
          seo_description: post.seo_description ?? "",
        });
      })
      .catch((err) => {
        if (alive) setError(err?.message ?? "Không tải được bài viết.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [postId, isNew]);

  const set = (field) => (event) => {
    const value = event.target.value;
    setValues((current) => {
      const next = { ...current, [field]: value };
      if (field === "title" && !slugLocked) next.slug = slugify(value);
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const slug = slugify(values.slug || values.title);
    if (!values.title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }
    if (!slug) {
      setError("Slug không hợp lệ, vui lòng nhập lại.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const duplicates = await base44.entities.BlogPost.filter({ slug }, { limit: 5 });
      const conflict = (duplicates?.items ?? []).some((item) => item.id !== postId);
      if (conflict) {
        setError("Slug đã tồn tại, vui lòng chọn slug khác.");
        setSaving(false);
        return;
      }

      const payload = {
        title: values.title.trim(),
        slug,
        excerpt: values.excerpt.trim(),
        content: values.content,
        cover_image: values.cover_image,
        category: values.category.trim(),
        tags: values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        is_published: values.is_published,
        published_at: values.published_at || "",
        seo_title: values.seo_title.trim(),
        seo_description: values.seo_description.trim(),
      };

      if (isNew) await base44.entities.BlogPost.create(payload);
      else await base44.entities.BlogPost.update(postId, payload);

      toast.success(isNew ? "Đã tạo bài viết." : "Đã lưu bài viết.");
      navigate({ to: "/admin/bai-viet" });
    } catch (err) {
      setError(err?.message ?? "Lưu bài viết thất bại.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="font-body text-sm text-ink-soft/55">Đang tải bài viết…</p>;
  }

  const seoLength = values.seo_description.trim().length;

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4 rounded-xl border border-line bg-paper p-5 shadow-luxe">
        <label className="block">
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            Tiêu đề *
          </span>
          <input
            id="post-title"
            value={values.title}
            onChange={set("title")}
            placeholder="Nhập tiêu đề bài viết"
            className={`mt-1.5 font-heading text-base ${inputClass}`}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Slug
            </span>
            <input
              id="post-slug"
              value={values.slug}
              onChange={(event) => {
                setSlugLocked(true);
                set("slug")(event);
              }}
              className={`mt-1.5 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Danh mục
            </span>
            <input
              id="post-category"
              value={values.category}
              onChange={set("category")}
              placeholder="Tin tức, SEO, Thiết kế..."
              className={`mt-1.5 ${inputClass}`}
            />
          </label>
        </div>

        <label className="block">
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            Trích đoạn
          </span>
          <textarea
            id="post-excerpt"
            rows={2}
            value={values.excerpt}
            onChange={set("excerpt")}
            placeholder="Mô tả ngắn hiển thị ở danh sách bài viết"
            className={`mt-1.5 resize-y ${inputClass}`}
          />
        </label>

        <div>
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            Nội dung
          </span>
          <div className="mt-1.5">
            <Suspense
              fallback={
                <div className="flex h-[340px] items-center justify-center rounded-xl border border-line bg-cream/40 font-body text-sm text-ink-soft/50">
                  Đang tải trình soạn thảo…
                </div>
              }
            >
              <RichTextEditor
                value={values.content}
                onChange={(html) => setValues((current) => ({ ...current, content: html }))}
              />
            </Suspense>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-cream/40 p-4">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            SEO
          </p>
          <div className="mt-3 space-y-3">
            <label className="block">
              <span className="font-body text-xs text-ink-soft/70">Tiêu đề SEO</span>
              <input
                id="post-seo-title"
                value={values.seo_title}
                onChange={set("seo_title")}
                placeholder={values.title || "Mặc định dùng tiêu đề bài viết"}
                className={`mt-1 ${inputClass}`}
              />
            </label>
            <label className="block">
              <span className="font-body text-xs text-ink-soft/70">
                Meta description ({seoLength}/160)
              </span>
              <textarea
                id="post-seo-description"
                rows={2}
                value={values.seo_description}
                onChange={set("seo_description")}
                placeholder={values.excerpt || "Mặc định dùng trích đoạn"}
                className={`mt-1 resize-y ${inputClass}`}
              />
            </label>
          </div>
        </div>

        {error && <p className="font-body text-sm text-destructive">{error}</p>}
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
          <label className="flex items-center gap-2 font-body text-sm text-ink">
            <input
              id="post-published"
              type="checkbox"
              checked={values.is_published}
              onChange={(event) => {
                const checked = event.target.checked;
                setValues((current) => ({
                  ...current,
                  is_published: checked,
                  published_at:
                    checked && !current.published_at
                      ? new Date().toISOString()
                      : current.published_at,
                }));
              }}
              className="h-4 w-4 accent-gold-dark"
            />
            Xuất bản bài viết
          </label>
          <p className="mt-2 font-body text-xs text-ink-soft/55">
            {values.is_published
              ? `Hiển thị công khai từ ${formatViDate(values.published_at)}.`
              : "Bài nháp chỉ bạn thấy trong khu quản trị."}
          </p>
          <Button type="submit" size="md" loading={saving} className="mt-4 w-full">
            {isNew ? "Tạo bài viết" : "Lưu thay đổi"}
          </Button>
        </div>

        <div className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
          <CoverUpload
            value={values.cover_image}
            onChange={(url) => setValues((current) => ({ ...current, cover_image: url }))}
            label="Ảnh bìa"
            inputId="post-cover"
          />
        </div>

        <div className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
          <label className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              Thẻ (phân cách bằng dấu phẩy)
            </span>
            <input
              id="post-tags"
              value={values.tags}
              onChange={set("tags")}
              placeholder="seo, website, marketing"
              className={`mt-1.5 ${inputClass}`}
            />
          </label>
        </div>
      </aside>
    </form>
  );
}