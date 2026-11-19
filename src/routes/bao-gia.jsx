import { createFileRoute } from "@tanstack/react-router";
import { Clock, Phone } from "lucide-react";
import PageHero from "@/components/brand/PageHero";
import { buttonVariants } from "@/components/brand/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import { listAllServicePackages } from "@/lib/server-fns";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/bao-gia")({
  validateSearch: (search) => ({
    "dich-vu": typeof search["dich-vu"] === "string" ? search["dich-vu"] : undefined,
    goi: typeof search.goi === "string" ? search.goi : undefined,
  }),
  loader: () => listAllServicePackages(),
  head: () => ({ meta: [{ title: "Tư vấn và Báo giá | GMedia" }] }),
  component: QuotePage,
});

function QuotePage() {
  const packages = Route.useLoaderData();
  const search = Route.useSearch();

  return (
    <>
      <PageHero
        label="// BÁO GIÁ"
        title="Tư vấn và Báo giá"
        description="Để lại thông tin, chuyên viên GMedia sẽ liên hệ tư vấn giải pháp phù hợp với doanh nghiệp của bạn."
      />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_340px]">
          <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-ink">Thông tin yêu cầu</h2>
            <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
            <div className="mt-6">
              <QuoteForm
                packages={packages}
                initialService={search["dich-vu"] ?? ""}
                initialPackage={search.goi ?? ""}
              />
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-gold/50 bg-cream/60 p-6 md:p-8">
            <h2 className="font-heading text-lg font-semibold text-ink">Tư vấn trực tiếp</h2>
            <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />

            <a
              href={`tel:${BRAND.hotlineTel}`}
              className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3.5 transition-colors hover:border-gold/60"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/60 text-gold-dark">
                <Phone className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="font-body text-[11px] uppercase tracking-[0.15em] text-ink-soft/60">
                  Hotline
                </span>
                <span className="font-heading text-lg font-semibold text-ink">
                  {BRAND.hotline}
                </span>
              </span>
            </a>

            <a
              href={BRAND.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", className: "mt-4 w-full" })}
            >
              Chat Zalo
            </a>

            <p className="mt-5 flex items-start gap-2 font-body text-xs leading-relaxed text-ink-soft/65">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
              Giờ phản hồi: [GIỜ_LÀM_VIỆC]
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}