import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/brand/Button";

export function NotFound({ children }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center md:py-28">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
          // 404
        </span>
        <p className="mt-4 font-heading text-6xl font-semibold tracking-tight text-ink md:text-7xl">404</p>
        <span className="mt-6 block h-[3px] w-12 rounded-full bg-gold-gradient" />
        <h1 className="mt-6 font-heading text-2xl font-semibold text-ink md:text-3xl">
          Không tìm thấy trang
        </h1>
        <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-ink-soft">
          {children ?? "Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className={buttonVariants({ size: "md" })}>
            Về trang chủ
          </Link>
          <Link to="/lien-he" className={buttonVariants({ variant: "secondary", size: "md" })}>
            Liên hệ GMedia
          </Link>
        </div>
      </div>
    </section>
  );
}