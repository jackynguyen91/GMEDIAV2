import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import CTABanner from "@/components/brand/CTABanner";
import PostContent from "@/components/blog/PostContent";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ShareButtons from "@/components/blog/ShareButtons";
import TableOfContents from "@/components/blog/TableOfContents";
import { BlogPostingJsonLd } from "@/components/seo/JsonLd";
import { Image } from "@/components/ui/image";
import { getPublishedPost, listRelatedPosts } from "@/lib/content-fns";
import { formatViDate } from "@/lib/date";
import { absoluteUrl, pageHead } from "@/lib/seo";
import { buildToc, stripHtml } from "@/lib/toc";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();

    const related = await listRelatedPosts({
      data: { slug: post.slug, category: post.category },
    });

    return { post, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return pageHead({
        title: "Bài viết",
        description: "Bài viết không tồn tại hoặc đã bị gỡ khỏi blog GMedia.",
        path: "/blog",
        noindex: true,
      });
    }

    const { post } = loaderData;
    const description =
      post.seo_description ||
      post.excerpt ||
      stripHtml(post.content).slice(0, 160) ||
      "Bài viết chia sẻ kiến thức thiết kế website, SEO và digital marketing từ GMedia.";

    return pageHead({
      title: post.seo_title || post.title,
      description,
      path: `/blog/${post.slug}`,
      image: post.cover_image || undefined,
      type: "article",
      publishedTime: post.published_at || undefined,
    });
  },
  component: PostPage,
});

function PostPage() {
  const { post, related } = Route.useLoaderData();
  const { content, items } = buildToc(post.content);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const tags = post.tags ?? [];

  return (
    <>
      <BlogPostingJsonLd post={post} url={url} />

      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_130%_at_85%_0%,rgba(201,162,77,0.18)_0%,rgba(26,26,26,0)_60%)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 font-body text-xs text-white/70"
          >
            <Link to="/" className="transition-colors hover:text-gold-light">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <Link to="/blog" className="transition-colors hover:text-gold-light">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="line-clamp-1 text-white/80">{post.title}</span>
          </nav>

          {post.category && (
            <span className="mt-7 block font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-light">
              {post.category}
            </span>
          )}

          <h1 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 font-body text-xs text-white/60">
            <time dateTime={post.published_at ?? undefined}>
              {formatViDate(post.published_at)}
            </time>
            {tags.length > 0 && <span className="text-white/40">·</span>}
            {tags.length > 0 && <span>{tags.join(" · ")}</span>}
          </div>
        </div>
      </section>

      {post.cover_image && (
        <div className="bg-ink">
          <div className="mx-auto max-w-5xl px-6 pb-10">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={post.cover_image}
                alt={`Ảnh bìa bài viết ${post.title}`}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,720px)_280px] lg:justify-center">
          <div className="min-w-0">
            <PostContent html={content} />

            <div className="mt-10 border-t border-line pt-6">
              <ShareButtons url={url} />
            </div>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink-soft/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TableOfContents items={items} />
          </aside>
        </div>
      </section>

      <RelatedPosts posts={related} />

      <CTABanner
        title="Cần tư vấn thiết kế website chuẩn SEO?"
        description="Để lại thông tin, đội ngũ GMedia sẽ liên hệ tư vấn giải pháp phù hợp với doanh nghiệp của bạn."
        ctaLabel="Nhận tư vấn"
        ctaHref="/bao-gia"
      />
    </>
  );
}