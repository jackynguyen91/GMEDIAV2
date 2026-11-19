import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { formatViDate } from "@/lib/date";

export default function BlogCard({ post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper transition-shadow duration-300 hover:shadow-luxe-lg">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={`Ảnh bìa bài viết ${post.title}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-heading text-[11px] uppercase tracking-[0.25em] text-ink-soft/30">
              GMedia
            </div>
          )}
          {post.category && (
            <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              {post.category}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold leading-snug text-ink">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="transition-colors duration-300 hover:text-gold-dark"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-ink-soft/70">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 font-body text-xs text-ink-soft/50">
          <time dateTime={post.published_at ?? undefined}>
            {formatViDate(post.published_at)}
          </time>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark"
          >
            Đọc tiếp
          </Link>
        </div>
      </div>
    </article>
  );
}