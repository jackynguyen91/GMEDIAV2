import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogToolbar({ categories, category, query, onCategoryChange, onSearch }) {
  const [term, setTerm] = useState(query ?? "");

  useEffect(() => {
    setTerm(query ?? "");
  }, [query]);

  const submit = (event) => {
    event.preventDefault();
    onSearch(term.trim());
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={cn(
            "rounded-full border px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
            !category
              ? "border-gold-dark bg-gold-gradient text-ink"
              : "border-line bg-paper text-ink-soft/70 hover:border-gold"
          )}
        >
          Tất cả
        </button>
        {categories.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onCategoryChange(item.name)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
              category === item.name
                ? "border-gold-dark bg-gold-gradient text-ink"
                : "border-line bg-paper text-ink-soft/70 hover:border-gold"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="flex w-full items-center gap-2 md:w-72">
        <input
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Tìm bài viết..."
          aria-label="Tìm bài viết"
          className="h-10 w-full rounded-xl border border-line bg-paper px-3 font-body text-sm text-ink placeholder:text-ink-soft/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
        />
        <button
          type="submit"
          aria-label="Tìm kiếm"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-ink-soft/70 transition-colors hover:border-gold hover:text-gold-dark"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}