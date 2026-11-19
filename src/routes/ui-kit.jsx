import { createFileRoute } from "@tanstack/react-router";
import {
  Globe,
  Megaphone,
  PenTool,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Button from "@/components/brand/Button";
import CTABanner from "@/components/brand/CTABanner";
import FormField from "@/components/brand/FormField";
import PageHero from "@/components/brand/PageHero";
import PricingCard from "@/components/brand/PricingCard";
import SectionHeading from "@/components/brand/SectionHeading";
import ServiceCard from "@/components/brand/ServiceCard";

export const Route = createFileRoute("/ui-kit")({
  head: () => ({
    meta: [
      { title: "UI Kit | GMedia - Tech Your Life" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UIKitPage,
});

function KitBlock({ title, children }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
          {title}
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const swatches = [
  { name: "ink", hex: "#1A1A1A", className: "bg-ink" },
  { name: "ink-soft", hex: "#2B2B2B", className: "bg-ink-soft" },
  { name: "gold-dark", hex: "#9A7430", className: "bg-gold-dark" },
  { name: "gold", hex: "#C9A24D", className: "bg-gold" },
  { name: "gold-light", hex: "#EAD58E", className: "bg-gold-light" },
  { name: "paper", hex: "#FFFFFF", className: "bg-paper border border-line" },
  { name: "cream", hex: "#FAF7F0", className: "bg-cream border border-line" },
  { name: "line", hex: "#E8E2D3", className: "bg-line" },
];

function UIKitPage() {
  return (
    <>
      <PageHero
        label="// DESIGN SYSTEM"
        title="UI Kit"
        description="Bộ thành phần giao diện dùng chung của GMedia: màu sắc, kiểu chữ, nút, thẻ dịch vụ, bảng giá và biểu mẫu."
      />

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16 md:space-y-20 md:py-20">
        <KitBlock title="Màu sắc & Kiểu chữ">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {swatches.map((swatch) => (
              <div key={swatch.name} className="overflow-hidden rounded-xl border border-line">
                <div className={`h-14 w-full ${swatch.className}`} />
                <div className="px-3 py-2">
                  <p className="font-heading text-xs font-semibold text-ink">{swatch.name}</p>
                  <p className="font-body text-[11px] text-ink-soft/50">{swatch.hex}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-line p-6">
            <p className="font-heading text-3xl font-bold text-ink">Montserrat — Tiêu đề</p>
            <p className="mt-3 font-body text-base leading-relaxed text-ink-soft/80">
              Be Vietnam Pro — nội dung. Thiết kế website, quảng cáo và giải pháp công nghệ cho
              doanh nghiệp sản xuất và nhà cung cấp.
            </p>
            <div className="mt-5 h-[3px] w-40 rounded-full bg-gold-gradient" />
            <p className="mt-2 font-body text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">
              Gradient vàng chữ ký
            </p>
          </div>
        </KitBlock>

        <KitBlock title="Button">
          <div className="rounded-xl border border-line p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Nhận tư vấn</Button>
              <Button variant="secondary">Xem dịch vụ</Button>
              <Button variant="ghost">Tìm hiểu thêm</Button>
              <Button variant="primary" loading>
                Đang gửi
              </Button>
              <Button variant="primary" disabled>
                Không khả dụng
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <p className="mt-5 font-body text-xs text-ink-soft/50">
              Hover: nâng nhẹ kèm đổ bóng. Primary dùng gradient vàng, chữ màu ink.
            </p>
          </div>
        </KitBlock>

        <KitBlock title="SectionHeading">
          <div className="rounded-xl border border-line p-6">
            <SectionHeading
              label="// DỊCH VỤ"
              title="Giải pháp tăng trưởng cho doanh nghiệp"
              description="Mô tả ngắn về nhóm nội dung bên dưới, tối đa hai dòng để giữ nhịp thị giác."
            />
            <div className="mt-10 border-t border-line pt-10">
              <SectionHeading
                align="center"
                label="// QUY TRÌNH"
                title="Căn giữa với thanh vàng 48px"
                description="Biến thể căn giữa dùng cho các khối nội dung toàn trang."
              />
            </div>
          </div>
        </KitBlock>

        <KitBlock title="PageHero">
          <div className="overflow-hidden rounded-xl border border-line">
            <PageHero
              label="// DỊCH VỤ"
              title="Thiết kế Website & WebApp"
              description="Hero nền ink, tiêu đề trắng, breadcrumb và thanh nhấn vàng."
              breadcrumbs={[{ label: "Dịch vụ", to: "/dich-vu" }]}
            />
          </div>
        </KitBlock>

        <KitBlock title="ServiceCard">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              icon={Globe}
              title="Thiết kế Website & WebApp"
              description="Website chuẩn SEO, giao diện riêng theo nhận diện thương hiệu."
              to="/dich-vu/thiet-ke-website"
            />
            <ServiceCard
              icon={Search}
              title="Dịch vụ Google Ads"
              description="Tiếp cận khách hàng đang chủ động tìm kiếm sản phẩm của bạn."
              to="/dich-vu/google-ads"
            />
            <ServiceCard
              icon={Megaphone}
              title="Dịch vụ Facebook Ads"
              description="Xây dựng phễu quảng cáo và tối ưu chi phí trên nền tảng Meta."
              to="/dich-vu/facebook-ads"
            />
            <ServiceCard
              icon={PenTool}
              title="Content Website"
              description="Nội dung chuẩn SEO, đúng giọng thương hiệu và đúng người đọc."
              to="/dich-vu/content"
            />
            <ServiceCard
              icon={Smartphone}
              title="Digital Marketing"
              description="Chiến lược tổng thể từ kênh sở hữu đến kênh trả phí."
              to="/dich-vu/digital-marketing"
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Chứng chỉ SSL"
              description="Bảo mật dữ liệu và tạo niềm tin cho khách truy cập."
              to="/dich-vu/chung-chi-ssl"
            />
          </div>
        </KitBlock>

        <KitBlock title="PricingCard">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <PricingCard
              name="Gói cơ bản"
              price="Từ [GIÁ_GÓI] VND"
              note="Phù hợp doanh nghiệp mới bắt đầu"
              features={[
                "Thiết kế giao diện theo mẫu",
                "Tối ưu hiển thị di động",
                "Bàn giao trong [THỜI_GIAN]",
              ]}
            />
            <PricingCard
              featured
              name="Gói tiêu chuẩn"
              price="Từ [GIÁ_GÓI] VND"
              note="Lựa chọn phổ biến nhất"
              features={[
                "Thiết kế giao diện riêng",
                "Chuẩn SEO on-page",
                "Hỗ trợ kỹ thuật [THỜI_GIAN]",
                "Bàn giao trong [THỜI_GIAN]",
              ]}
            />
            <PricingCard
              name="Gói nâng cao"
              price="Từ [GIÁ_GÓI] VND"
              note="Cho doanh nghiệp cần mở rộng"
              features={[
                "Thiết kế theo yêu cầu riêng",
                "Tích hợp hệ thống quản trị",
                "Tối ưu tốc độ và bảo mật",
              ]}
            />
          </div>
        </KitBlock>

        <KitBlock title="CTABanner">
          <div className="overflow-hidden rounded-xl border border-line">
            <CTABanner
              title="Sẵn sàng khởi động dự án của bạn?"
              description="Đội ngũ GMedia tư vấn miễn phí và gửi báo giá trong vòng 24 giờ làm việc."
            />
          </div>
        </KitBlock>

        <KitBlock title="FormField">
          <div className="grid gap-5 rounded-xl border border-line p-6 md:grid-cols-2">
            <FormField label="Họ và tên" placeholder="Nguyễn Văn A" required />
            <FormField label="Email" type="email" placeholder="ban@congty.vn" />
            <FormField label="Số điện thoại" type="tel" placeholder="09xx xxx xxx" />
            <FormField
              label="Dịch vụ quan tâm"
              type="select"
              placeholder="Chọn dịch vụ"
              options={[
                "Thiết kế Website & WebApp",
                "Dịch vụ Google Ads",
                "Dịch vụ Facebook Ads",
                "Chứng chỉ SSL",
              ]}
            />
            <FormField
              label="Nhu cầu"
              type="textarea"
              placeholder="Mô tả ngắn về dự án của bạn"
              className="md:col-span-2"
            />
            <FormField
              label="Email"
              type="email"
              placeholder="ban@congty.vn"
              defaultValue="sai-dinh-dang"
              error="Vui lòng nhập địa chỉ email hợp lệ."
              className="md:col-span-2"
            />
          </div>
        </KitBlock>
      </div>
    </>
  );
}