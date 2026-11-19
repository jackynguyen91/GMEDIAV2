import { Pencil, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";

const HEADERS = ["Ảnh", "Tên dự án", "Danh mục", "Nổi bật", "Thứ tự", "Hành động"];

export default function ProjectTable({ projects, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">Đang tải dự án…</p>
    );
  }

  if (!projects.length) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">
        Chưa có dự án nào. Bấm “Thêm dự án” để tạo dự án đầu tiên.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
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
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-line/70 last:border-0">
              <td className="px-3 py-2.5">
                <div className="h-12 w-16 overflow-hidden rounded-lg border border-line bg-cream">
                  {project.cover_image && (
                    <Image
                      src={project.cover_image}
                      alt={`Ảnh dự án ${project.title}`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </td>
              <td className="px-3 py-2.5">
                <p className="font-body text-sm font-medium text-ink">{project.title}</p>
                <p className="font-body text-[11px] text-ink-soft/45">/{project.slug}</p>
              </td>
              <td className="px-3 py-2.5 font-body text-xs text-ink-soft/70">
                {project.category || "—"}
              </td>
              <td className="px-3 py-2.5 font-body text-xs text-ink-soft/70">
                {project.is_featured ? "Có" : "—"}
              </td>
              <td className="px-3 py-2.5 font-body text-xs text-ink-soft/70">
                {project.sort_order ?? "—"}
              </td>
              <td className="whitespace-nowrap px-3 py-2.5">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Sửa dự án"
                    onClick={() => onEdit(project)}
                    className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-cream hover:text-gold-dark"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Xóa dự án"
                    onClick={() => onDelete(project)}
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