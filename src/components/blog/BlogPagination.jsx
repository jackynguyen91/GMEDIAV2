import { cn } from "@/lib/utils";

export default function BlogPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Phân trang bài viết" className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-xl border border-line px-3 py-2 font-body text-xs text-ink transition-colors hover:border-gold disabled:opacity-40"
      >
        Trước
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPageChange(item)}
          aria-current={item === page ? "page" : undefined}
          className={cn(
            "h-9 w-9 rounded-xl border font-body text-xs transition-colors",
            item === page
              ? "border-gold-dark bg-gold-gradient font-semibold text-ink"
              : "border-line text-ink-soft/70 hover:border-gold"
          )}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-xl border border-line px-3 py-2 font-body text-xs text-ink transition-colors hover:border-gold disabled:opacity-40"
      >
        Sau
      </button>
    </nav>
  );
}