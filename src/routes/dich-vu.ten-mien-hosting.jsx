import { createFileRoute } from "@tanstack/react-router";
import { Globe, HardDrive, Zap } from "lucide-react";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import ServiceCard from "@/components/brand/ServiceCard";
import DomainRequestForm from "@/components/services/DomainRequestForm";
import PackageGrid from "@/components/services/PackageGrid";
import { listServicePackages } from "@/lib/server-fns";

export const Route = createFileRoute("/dich-vu/ten-mien-hosting")({
  loader: () => listServicePackages({ data: { serviceKey: "hosting" } }),
  head: () => ({ meta: [{ title: "Tên miền & Hosting | GMedia" }] }),
  component: DomainHostingPage,
});

const HOSTING_SERVICES = [
  {
    icon: Zap,
    title: "WordPress Hosting",
    description: "Hosting tốc độ cao tối ưu riêng cho Website WordPress.",
  },
  {
    icon: HardDrive,
    title: "SSD Hosting",
    description: "Vận hành Website với chi phí hợp lý nhất.",
  },
  {
    icon: Globe,
    title: "SEO Hosting",
    description: "Hosting cho nhiều IP Class C cho Website vệ tinh.",
  },
];

const PLATFORMS = ["Laravel", "WordPress", "Joomla", "OpenCart"];

function DomainHostingPage() {
  const packages = Route.useLoaderData();

  return (
    <>
      <PageHero
        label="// HẠ TẦNG"
        title="Tên miền - Hosting"
        breadcrumbs={[{ label: "Dịch vụ", to: "/dich-vu" }]}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-xl border border-line bg-cream/60 p-6 md:p-9">
            <h2 className="font-heading text-xl font-semibold text-ink md:text-2xl">
              ĐĂNG KÝ TÊN MIỀN
            </h2>
            <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink-soft/70">
              Quý khách vui lòng để lại tên miền mong muốn, tư vấn viên GMedia sẽ kiểm tra và liên
              hệ tư vấn chi tiết.
            </p>
            <div className="mt-6 max-w-2xl">
              <DomainRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label="// LƯU TRỮ"
            title="Dịch vụ lưu trữ hosting"
            description="GMedia là công ty cung cấp dịch vụ lưu trữ hosting website uy tín tại Việt Nam. Với nhiều năm kinh nghiệm và đội ngũ nhân viên chuyên nghiệp, GMedia đã phục vụ cho hơn 150 khách hàng trên toàn quốc."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HOSTING_SERVICES.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                to="/bao-gia"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label="// BẢNG GIÁ HOSTING"
            title="BẢNG GIÁ DỊCH VỤ HOSTING GM HOST"
            description="Bảng giá áp dụng khi đăng ký kỳ 12 tháng, chưa bao gồm thuế VAT và ưu đãi giảm giá (nếu có)"
          />

          <div className="mt-10">
            <PackageGrid packages={packages} />
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <p className="max-w-3xl font-heading text-lg font-semibold leading-snug text-white md:text-xl">
            Duy nhất 1 Hosting cho mọi nền tảng Linux - CHẠY TRÊN MỌI ỨNG DỤNG
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-4">
            {PLATFORMS.map((platform) => (
              <span
                key={platform}
                className="font-heading text-xl font-semibold tracking-wide text-white/50"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}