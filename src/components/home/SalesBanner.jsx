import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/brand/Button";

export default function SalesBanner() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_85%_0%,rgba(201,162,77,0.16)_0%,rgba(26,26,26,0)_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
        <span aria-hidden="true" className="block h-[3px] w-16 bg-gold-gradient" />
        <h2 className="mt-6 max-w-3xl font-heading text-2xl font-semibold leading-snug text-white md:text-4xl">
          WEBSITE GIÚP BẠN CÓ CƠ HỘI BÁN HÀNG HIỆU QUẢ HƠN
        </h2>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/70 md:text-base">
          Hãy cùng chúng tôi lên ý tưởng và bạn sẽ sở hữu một Website chuyên nghiệp theo phong cách
          của bạn.
        </p>
        <Link to="/bao-gia" className={buttonVariants({ size: "lg", className: "mt-7" })}>
          Nhận tư vấn
        </Link>
      </div>
    </section>
  );
}