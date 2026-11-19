import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Lock, ShieldCheck, TrendingUp } from "lucide-react";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import CTABanner from "@/components/brand/CTABanner";

export const Route = createFileRoute("/dich-vu/chung-chi-ssl")({
  head: () => ({ meta: [{ title: "Chứng chỉ SSL | GMedia" }] }),
  component: SslPage,
});

const BENEFITS = [
  { icon: ShieldCheck, title: "Bảo mật website trước hacker" },
  { icon: Lock, title: "Các trình duyệt website hiển thị ngay https" },
  { icon: TrendingUp, title: "Nâng cao thứ hạng website trên công cụ tìm kiếm" },
  { icon: HeartHandshake, title: "Tạo sự an tâm, tin tưởng của người dùng khi truy cập website" },
];

function SslPage() {
  return (
    <>
      <PageHero
        label="// DỊCH VỤ"
        title="Chứng chỉ SSL"
        breadcrumbs={[{ label: "Dịch vụ", to: "/dich-vu" }]}
      />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-heading text-2xl font-semibold leading-tight text-ink md:text-3xl">
            DỊCH VỤ ĐĂNG KÝ BẢO MẬT SSL
          </h2>
          <span className="mt-5 block h-[3px] w-12 rounded-full bg-gold-gradient" />

          <div className="mt-8 rounded-xl border border-line bg-cream/60 p-6 md:p-8">
            <h3 className="font-heading text-lg font-semibold text-ink">SSL là gì?</h3>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft/75">
              SSL (Secure Sockets Layer) là một giao thức bảo mật giúp bảo vệ dữ liệu được truyền
              tải giữa website và trình duyệt của người dùng. Khi bạn truy cập một website có sử
              dụng SSL, dữ liệu của bạn sẽ được mã hóa, giúp bảo vệ dữ liệu khỏi bị đánh cắp hoặc
              thay đổi bởi các bên thứ ba.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            label="// LỢI ÍCH SSL"
            title="LỢI ÍCH KHI SỬ DỤNG SSL TẠI GMEDIA"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="flex h-full flex-col rounded-xl border border-line bg-paper p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/60 text-gold-dark">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-body text-sm leading-relaxed text-ink-soft/80">
                  {benefit.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Đăng ký ngay hôm nay!"
        description="Bảo vệ website và dữ liệu khách hàng của bạn bằng chứng chỉ SSL từ GMedia."
        ctaLabel="Đăng ký SSL"
        ctaSearch={{ "dich-vu": "ssl" }}
      />
    </>
  );
}