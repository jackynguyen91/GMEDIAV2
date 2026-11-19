import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { formatViDate } from "@/lib/date";
import { cn } from "@/lib/utils";

const HEADERS = ["Tiêu đề", "Danh mục", "Trạng thái", "Ngày đăng", "Hành động"];

export default function PostTable({ posts, loading, onTogglePublish, onDelete }) {
  if (loading) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">
        Đang tải bài viết…
      </p>
    );
  }

  if (!posts.length) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">
        Chưa có bài viết nào. Bấm “Viết bài mới” để bắt đầu.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-cream/60">
            {HEADERS.map((title) => (
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
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-line/70 last:border-0">
              <td className="px-3 py-3">
                <Link
                  to="/admin/bai-viet/$postId"
                  params={{ postId: post.id }}
                  className="font-body text-sm font-medium text-ink hover:text-gold-dark"
                >
                  {post.title}
                </Link>
                <p className="font-body text-[11px] text-ink-soft/45">/{post.slug}</p>
              </td>
              <td className="px-3 py-3 font-body text-xs text-ink-soft/70">
                {post.category || "—"}
              </td>
              <td className="px-3 py-3">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.1em]",
                    post.is_published
                      ? "bg-ink text-gold-light"
                      : "bg-cream text-ink-soft"
                  )}
                >
                  {post.is_published ? "Đã xuất bản" : "Nháp"}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-body text-xs text-ink-soft/60">
                {formatViDate(post.published_at) || "—"}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={post.is_published ? "Ẩn bài viết" : "Xuất bản bài viết"}
                    onClick={() => onTogglePublish(post)}
                    className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-cream hover:text-gold-dark"
                  >
                    {post.is_published ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <Link
                    to="/admin/bai-viet/$postId"
                    params={{ postId: post.id }}
                    aria-label="Sửa bài viết"
                    className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-cream hover:text-gold-dark"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    aria-label="Xóa bài viết"
                    onClick={() => onDelete(post)}
                    className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}