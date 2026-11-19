import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import CTABanner from "@/components/brand/CTABanner";
import BlogCard from "@/components/blog/BlogCard";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogToolbar from "@/components/blog/BlogToolbar";
import { listPublishedPosts } from "@/lib/content-fns";
import { pageHead } from "@/lib/seo";

const DESCRIPTION =
  "Kinh nghiệm thiết kế website, SEO và digital marketing từ đội ngũ GMedia, giúp doanh nghiệp xây dựng hiện diện online chuyên nghiệp và tăng trưởng bền vững.";

export const Route = createFileRoute("/blog/")({
  validateSearch: (search) => {
    const page = Number(search.page);
    return {
      page: Number.isFinite(page) && page > 1 ? Math.floor(page) : undefined,
      category: typeof search.category === "string" && search.category ? search.category : undefined,
      q: typeof search.q === "string" && search.q ? search.q : undefined,
    };
  },
  loaderDeps: ({ search }) => ({ page: search.page, category: search.category, q: search.q }),
  loader: ({ deps }) =>
    listPublishedPosts({
      data: { page: deps.page ?? 1, category: deps.category, q: deps.q },
    }),
  head: () => pageHead({ title: "Blog", description: DESCRIPTION, path: "/blog" }),
  component: BlogPage,
});

function BlogPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const update = (patch) => navigate({ to: "/blog", search: { ...search, ...patch } });

  return (
    <>
      <PageHero
        label="// BLOG"
        title="Blog"
        description="Kiến thức thiết kế website, SEO và digital marketing dành cho doanh nghiệp."
      />

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <BlogToolbar
            categories={data.categories}
            category={search.category ?? ""}
            query={search.q ?? ""}
            onCategoryChange={(category) =>
              update({ category: category || undefined, page: undefined })
            }
            onSearch={(q) => update({ q: q || undefined, page: undefined })}
          />

          {data.items.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-xl border border-line bg-cream/50 px-5 py-12 text-center font-body text-sm text-ink-soft/60">
              Chưa có bài viết nào phù hợp. Vui lòng chọn danh mục khác hoặc quay lại sau.
            </p>
          )}

          <BlogPagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={(page) => update({ page: page > 1 ? page : undefined })}
          />
        </div>
      </section>

      <CTABanner
        title="Cần tư vấn thiết kế website chuẩn SEO?"
        description="Đội ngũ GMedia sẵn sàng tư vấn giải pháp website và digital marketing phù hợp với doanh nghiệp của bạn."
      />
    </>
  );
}