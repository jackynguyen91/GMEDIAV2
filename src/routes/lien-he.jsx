import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import CompanyInfoCard from "@/components/info/CompanyInfoCard";
import ContactForm from "@/components/info/ContactForm";
import BookingForm from "@/components/forms/BookingForm";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/lien-he")({
  head: () => ({ meta: [{ title: "Liên hệ | GMedia" }] }),
  component: ContactPage,
});

const MAP_SRC =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("62A Phạm Ngọc Thạch, Phường Xuân Hòa, TP. Hồ Chí Minh") +
  "&output=embed";

function ContactPage() {
  return (
    <>
      <PageHero label="// LIÊN HỆ" title="Liên hệ" />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[380px_1fr]">
          <CompanyInfoCard />

          <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-ink">Gửi yêu cầu tư vấn</h2>
            <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[380px_1fr]">
          <div>
            <h2 className="font-heading text-xl font-semibold text-ink">Đặt lịch tư vấn 1:1</h2>
            <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft/75">
              Chọn ngày, khung giờ và hình thức trao đổi bạn muốn. Buổi tư vấn kéo dài 30 phút, miễn
              phí, trực tiếp với người phụ trách đúng dịch vụ bạn cần.
            </p>
            <ul className="mt-5 space-y-2 font-body text-sm text-ink-soft/70">
              <li>• Xem nhanh website hiện tại và đề xuất hướng cải thiện</li>
              <li>• Báo giá theo đúng nhu cầu, không báo giá chung</li>
              <li>• Gọi điện, Zalo hoặc Google Meet đều được</li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="bg-cream pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <iframe
            title={`Bản đồ trụ sở ${BRAND.name}`}
            src={MAP_SRC}
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-xl border border-line"
            style={{ height: "400px" }}
          />
        </div>
      </section>
    </>
  );
}