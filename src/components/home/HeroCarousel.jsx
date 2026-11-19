import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/brand/Button";
import { Image } from "@/components/ui/image";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    label: "Dịch vụ",
    title: "THIẾT KẾ WEBSITE CHUYÊN NGHIỆP",
    description:
      "GMedia chuyên cung cấp giải pháp - dịch vụ về thiết kế Website chuyên nghiệp, chuẩn SEO với chi phí phù hợp cho doanh nghiệp.",
    ctaLabel: "Liên hệ chúng tôi",
    ctaHref: "/lien-he",
    image:
      "https://media.base44.com/images/public/6afe67cf229d726c00590e94/7c838b5f0_generated_image.png",
    imageAlt: "Minh họa giao diện website doanh nghiệp trên laptop",
  },
  {
    label: "GMEDIA",
    title: "TĂNG KHÁCH HÀNG TIỀM NĂNG CÙNG GMEDIA",
    description:
      "Với giao diện Website phù hợp với Ngành nghề và lĩnh vực kinh doanh của bạn!",
    ctaLabel: "Tư vấn giải pháp",
    ctaHref: "/bao-gia",
    image:
      "https://media.base44.com/images/public/6afe67cf229d726c00590e94/4bbe5f943_generated_image.png",
    imageAlt: "Minh họa biểu đồ tăng trưởng khách hàng",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setActive((current) => (current + 1) % SLIDES.length), 6000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_100%_at_10%_0%,rgba(201,162,77,0.18)_0%,rgba(26,26,26,0)_65%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-14 md:pb-16 md:pt-20">
        <div className="grid">
          {SLIDES.map((slide, index) => {
            const isActive = index === active;
            const Heading = isActive ? "h1" : "div";

            return (
              <div
                key={slide.title}
                aria-hidden={!isActive}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-700 ease-out",
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
                )}
              >
                <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                  <div>
                    <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-light">
                      {slide.label}
                    </span>
                    <span className="mt-4 block h-[2px] w-16 bg-gold-gradient" />
                    <Heading className="mt-6 font-heading text-[26px] font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
                      {slide.title}
                    </Heading>
                    <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-white/75 md:text-base">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.ctaHref}
                      tabIndex={isActive ? 0 : -1}
                      className={buttonVariants({ size: "lg", className: "mt-8" })}
                    >
                      {slide.ctaLabel}
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-3 -right-3 hidden h-24 w-24 rounded-xl border border-gold/40 md:block"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Chuyển tới slide ${index + 1}`}
              aria-current={index === active}
              className="group flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  index === active
                    ? "w-9 bg-gold-gradient"
                    : "w-3 bg-white/25 group-hover:bg-white/50"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6 text-center">
        <span className="bg-gold-gradient bg-clip-text font-heading text-base font-bold uppercase tracking-[0.45em] text-transparent sm:text-2xl sm:tracking-[0.6em]">
          {BRAND.slogan}
        </span>
      </div>
    </section>
  );
}