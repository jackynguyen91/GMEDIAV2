import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import CTABanner from "@/components/brand/CTABanner";
import ProjectCard from "@/components/projects/ProjectCard";
import { listProjects } from "@/lib/content-fns";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "Tổng hợp dự án thiết kế website GMedia đã triển khai cho doanh nghiệp: website giới thiệu công ty, thương mại điện tử, nội thất và nhiều lĩnh vực khác.";

export const Route = createFileRoute("/du-an")({
  validateSearch: (search) => ({
    category: typeof search.category === "string" && search.category ? search.category : undefined,
  }),
  loaderDeps: ({ search }) => ({ category: search.category }),
  loader: ({ deps }) => listProjects({ data: { category: deps.category } }),
  head: () => pageHead({ title: "Dự án", description: DESCRIPTION, path: "/du-an" }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const selectCategory = (category) =>
    navigate({ to: "/du-an", search: { category: category || undefined } });

  return (
    <>
      <PageHero
        label="// DỰ ÁN"
        title="Dự án"
        description="Những sản phẩm website GMedia đã đồng hành cùng khách hàng trên hành trình chuyển đổi số."
      />

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => selectCategory("")}
              className={cn(
                "rounded-full border px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                !search.category
                  ? "border-gold-dark bg-gold-gradient text-ink"
                  : "border-line bg-paper text-ink-soft/70 hover:border-gold"
              )}
            >
              Tất cả
            </button>
            {data.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                  search.category === category
                    ? "border-gold-dark bg-gold-gradient text-ink"
                    : "border-line bg-paper text-ink-soft/70 hover:border-gold"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {data.items.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-xl border border-line bg-cream/50 px-5 py-12 text-center font-body text-sm text-ink-soft/60">
              Chưa có dự án nào trong danh mục này.
            </p>
          )}
        </div>
      </section>

      <CTABanner
        title="Bạn muốn có một website như những dự án trên?"
        description="GMedia tư vấn miễn phí giải pháp website phù hợp với ngành nghề và ngân sách của doanh nghiệp."
      />
    </>
  );
}