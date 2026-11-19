import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import CTABanner from "@/components/brand/CTABanner";
import FeatureBlock from "@/components/services/FeatureBlock";
import PackageGrid from "@/components/services/PackageGrid";
import ConsultForm from "@/components/services/ConsultForm";
import { listServicePackages } from "@/lib/server-fns";

export const Route = createFileRoute("/dich-vu/thiet-ke-website")({
  loader: () => listServicePackages({ data: { serviceKey: "website" } }),
  head: () => ({ meta: [{ title: "Thiết kế Website & WebApp | GMedia" }] }),
  component: WebsiteDesignPage,
});

const FEATURES = [
  {
    title: "Thiết kế Website với cửa hàng trực tuyến.",
    description:
      "Bắt đầu kinh doanh trực tuyến và phát triển doanh nghiệp của bạn với nền tảng Thương mại Điện tử mạnh mẽ.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    alt: "Cửa hàng trực tuyến trên website",
  },
  {
    title: "Thiết kế Website với Blog chuyên nghiệp.",
    description:
      "Chúng tôi sẽ thiết kế cho bạn blog với các tính năng tích hợp để mở rộng phạm vi tiếp cận của bạn và xây dựng cộng đồng.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    alt: "Blog chuyên nghiệp trên website",
  },
  {
    title: "Tích hợp công cụ SEO.",
    description:
      "Cải thiện khả năng hiển thị của bạn trên các công cụ tìm kiếm với đầy đủ các tính năng SEO.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    alt: "Bảng phân tích hiệu quả SEO",
  },
  {
    title: "Thiết kế tùy chỉnh Website.",
    description: "Bạn có thể tùy chỉnh Website theo ý muốn của bạn.",
    image:
      "https://media.base44.com/images/public/6afe67cf229d726c00590e94/7c838b5f0_generated_image.png",
    alt: "Minh họa giao diện website tùy chỉnh",
  },
];

function WebsiteDesignPage() {
  const packages = Route.useLoaderData();

  return (
    <>
      <PageHero
        label="// DỊCH VỤ"
        title="Thiết kế Website - WebApp"
        breadcrumbs={[{ label: "Dịch vụ", to: "/dich-vu" }]}
      />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-2xl font-semibold leading-tight text-ink md:text-3xl">
            Xây dựng sự hiện diện doanh nghiệp của bạn trực tuyến độc nhất
          </h2>
          <span className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-gold-gradient" />
          <p className="mt-5 font-body text-[15px] leading-relaxed text-ink-soft/75">
            Xây dựng trang web của riêng bạn và thêm các công cụ tích hợp để phát triển doanh
            nghiệp của bạn trực tuyến. Chúng tôi cam kết mang đến cho khách hàng những giải pháp
            website sáng tạo, hiệu quả, giúp khách hàng nâng tầm thương hiệu và gia tăng lợi thế
            cạnh tranh.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-14 px-6 md:space-y-20">
          {FEATURES.map((feature, index) => (
            <FeatureBlock key={feature.title} {...feature} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            label="Thiết kế Website chuyên nghiệp"
            title="THIẾT KẾ WEBSITE PHÙ HỢP VỚI NHU CẦU"
            description="Bảng giá thiết kế Website dựa trên nền tảng CMS WordPress mạnh mẽ và Hosting Pro. Khách hàng sử dụng dịch vụ và gia hạn theo năm, đã bao gồm chi phí bảo hành. Quý khách có yêu cầu thiết kế đặc biệt riêng cho từng nhu cầu doanh nghiệp có thể gửi yêu cầu cụ thể tới GMedia Solutions."
          />

          <div className="mt-10">
            <PackageGrid
              packages={packages}
              ctaLabel="Chọn gói"
              searchFor={(pkg) => ({ "dich-vu": "thiet-ke-website", goi: pkg.name })}
            />
          </div>
        </div>
      </section>

      <CTABanner title="Yêu cầu gọi tư vấn" ctaLabel={null}>
        <ConsultForm />
      </CTABanner>
    </>
  );
}