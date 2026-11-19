import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";

export const Route = createFileRoute("/chinh-sach-bao-mat")({
  head: () => ({ meta: [{ title: "Chính sách bảo mật | GMedia" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero label="// BẢO MẬT" title="Chính sách bảo mật thông tin" />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-xl border border-line bg-cream/60 p-6 md:p-8">
            <p className="font-body text-[15px] leading-relaxed text-ink-soft/75">
              [NỘI_DUNG_CHÍNH_SÁCH_BẢO_MẬT]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}