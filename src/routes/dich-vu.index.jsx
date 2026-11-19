import { createFileRoute } from "@tanstack/react-router";
import {
  Code2,
  Megaphone,
  PenLine,
  Search,
  Server,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import PageHero from "@/components/brand/PageHero";
import ServiceCard from "@/components/brand/ServiceCard";
import CTABanner from "@/components/brand/CTABanner";

export const Route = createFileRoute("/dich-vu/")({
  head: () => ({ meta: [{ title: "Dịch vụ | GMedia - Tech Your Life" }] }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Code2,
    title: "Thiết kế Website - WebApp",
    description: "Website chuẩn SEO, giao diện theo ngành nghề, tối ưu chuyển đổi.",
    to: "/dich-vu/thiet-ke-website",
  },
  {
    icon: Search,
    title: "Dịch vụ Google Ads",
    description: "Tiếp cận đúng khách hàng đang tìm kiếm sản phẩm, dịch vụ của bạn.",
    to: "/dich-vu/google-ads",
  },
  {
    icon: Megaphone,
    title: "Dịch vụ Facebook Ads",
    description: "Quảng cáo đúng người, đúng thời điểm trên Facebook và Instagram.",
    to: "/dich-vu/facebook-ads",
  },
  {
    icon: PenLine,
    title: "Dịch vụ Content Website",
    description: "Nội dung chuẩn SEO, giữ chân người đọc và nuôi dưỡng khách hàng.",
    to: "/dich-vu/content",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Chiến lược tổng thể từ SEO, quảng cáo đến chăm sóc khách hàng.",
    to: "/dich-vu/digital-marketing",
  },
  {
    icon: ShieldCheck,
    title: "Chứng chỉ SSL",
    description: "Mã hóa dữ liệu, bảo vệ website và tăng độ tin cậy với khách hàng.",
    to: "/dich-vu/chung-chi-ssl",
  },
  {
    icon: Server,
    title: "Tên miền - Hosting",
    description: "Đăng ký tên miền và hosting tốc độ cao cho mọi nền tảng.",
    to: "/dich-vu/ten-mien-hosting",
  },
];

function ServicesPage() {
  return (
    <>
      <PageHero label="// DỊCH VỤ" title="Dịch vụ" />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                to={service.to}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Cần tư vấn dịch vụ phù hợp?"
        description="Đội ngũ GMedia sẵn sàng tư vấn giải pháp website và marketing theo đúng nhu cầu doanh nghiệp."
        ctaLabel="Tư vấn và Báo giá"
      />
    </>
  );
}