import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import CTABanner from "@/components/brand/CTABanner";
import ChannelStrip from "@/components/services/ChannelStrip";
import PackageGrid from "@/components/services/PackageGrid";

export default function AdsServicePage({ title, description, packages, serviceParam }) {
  return (
    <>
      <PageHero
        label="// DỊCH VỤ CHIẾN DỊCH QUẢNG CÁO"
        title={title}
        description={description}
        breadcrumbs={[{ label: "Dịch vụ", to: "/dich-vu" }]}
      />

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ChannelStrip />
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label="// CÁC GÓI DỊCH VỤ QUẢNG CÁO"
            description="Chúng tôi thiết kế và cung cấp giải pháp các gói dịch vụ quảng cáo theo nhu cầu phát triển của doanh nghiệp."
          />

          <div className="mt-10">
            <PackageGrid
              packages={packages}
              ctaLabel="Đăng ký gói"
              searchFor={(pkg) => ({ "dich-vu": serviceParam, goi: pkg.name })}
            />
          </div>
        </div>
      </section>

      <CTABanner
        title="ĐĂNG KÝ NGAY HÔM NAY!"
        description="GMedia Solutions đơn vị triển khai tư vấn Thiết Kế Website - Brand - SEO chuyên nghiệp. Với phương châm: Cùng bạn kiến tạo thành công."
        ctaLabel="Đăng ký tư vấn"
        ctaSearch={{ "dich-vu": serviceParam }}
      />
    </>
  );
}