import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import CTABanner from "@/components/brand/CTABanner";
import ContentOfferBanner from "@/components/services/ContentOfferBanner";
import PackageGrid from "@/components/services/PackageGrid";
import { listServicePackages } from "@/lib/server-fns";

export const Route = createFileRoute("/dich-vu/content")({
  loader: () => listServicePackages({ data: { serviceKey: "content" } }),
  head: () => ({ meta: [{ title: "Dịch vụ Content Website | GMedia" }] }),
  component: ContentPage,
});

function ContentPage() {
  const packages = Route.useLoaderData();

  return (
    <>
      <PageHero
        label="// DỊCH VỤ VIẾT NỘI DUNG WEBSITE CHUYÊN NGHIỆP"
        title="Dịch vụ Content Website"
        description="GMedia sẽ giúp bạn tạo ra những nội dung content thu hút, độc đáo và hấp dẫn người đọc, góp phần nâng cao hiệu quả SEO và thu hút khách hàng tiềm năng cho website của bạn."
        breadcrumbs={[{ label: "Dịch vụ", to: "/dich-vu" }]}
      />

      <ContentOfferBanner />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="Dịch vụ website content" />

          <div className="mt-10">
            <PackageGrid
              packages={packages}
              ctaLabel="Đăng ký gói"
              searchFor={(pkg) => ({ "dich-vu": "content", goi: pkg.name })}
            />
          </div>
        </div>
      </section>

      <CTABanner
        title="ĐĂNG KÝ NGAY HÔM NAY!"
        description="GMedia Solutions đơn vị triển khai tư vấn Thiết Kế Website - Brand - SEO chuyên nghiệp. Với phương châm: Cùng bạn kiến tạo thành công."
        ctaLabel="Đăng ký tư vấn"
        ctaSearch={{ "dich-vu": "content" }}
      />
    </>
  );
}