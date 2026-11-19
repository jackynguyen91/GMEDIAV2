import { Link } from "@tanstack/react-router";
import SectionHeading from "@/components/brand/SectionHeading";
import { buttonVariants } from "@/components/brand/Button";
import { Image } from "@/components/ui/image";
import Counter from "@/components/home/Counter";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

const STATS = [
  { value: 10, suffix: "+", label: "năm kinh nghiệm" },
  { value: 150, suffix: "+", label: "dự án thực hiện" },
];

export default function AboutSection() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image
                src={ABOUT_IMAGE}
                alt="Đội ngũ GMedia cùng khách hàng xây dựng giải pháp website"
                className="h-full w-full object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-xl border border-gold/40 md:block"
            />
          </div>

          <div>
            <SectionHeading label="// VỀ GMEDIA" />

            <p className="mt-6 font-body text-[15px] leading-relaxed text-ink-soft/80">
              GMedia là công ty thiết kế website uy tín với hơn 10 năm kinh nghiệm, đã thực hiện
              thành công hơn 150 dự án cho các doanh nghiệp lớn nhỏ trong nhiều lĩnh vực khác
              nhau.
            </p>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft/80">
              Chúng tôi cam kết mang đến cho khách hàng những giải pháp website sáng tạo, hiệu quả,
              giúp khách hàng nâng tầm thương hiệu và gia tăng lợi thế cạnh tranh.
            </p>
            <p className="mt-5 font-heading text-lg font-semibold text-gold-dark">
              GMedia - Cùng bạn kiến tạo thành công!
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-line bg-cream/70 p-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-heading text-3xl font-semibold text-ink md:text-4xl"
                  />
                  <p className="mt-1.5 font-body text-[11px] uppercase tracking-[0.15em] text-ink-soft/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-6 rounded-xl border border-gold/40 bg-cream p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <p className="max-w-2xl font-heading text-base font-semibold leading-relaxed text-ink md:text-lg">
            Bạn muốn Tối Ưu Chuyển Đổi và Tăng Trưởng cho Doanh Nghiệp - Hãy liên hệ với chúng tôi
            để có giải pháp toàn diện!
          </p>
          <Link
            to="/bao-gia"
            className={buttonVariants({ size: "lg", className: "shrink-0" })}
          >
            Tư vấn và Báo giá
          </Link>
        </div>
      </div>
    </section>
  );
}