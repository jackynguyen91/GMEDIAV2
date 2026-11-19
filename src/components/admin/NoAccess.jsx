import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { buttonVariants } from "@/components/brand/Button";

export default function NoAccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md rounded-xl border border-line bg-paper p-8 text-center shadow-luxe">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold-dark">
          <ShieldAlert className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-semibold text-ink">
          Không có quyền truy cập
        </h1>
        <span className="mx-auto mt-4 block h-[2px] w-12 bg-gold-gradient" />
        <p className="mt-4 font-body text-sm leading-relaxed text-ink-soft/70">
          Khu vực quản trị chỉ dành cho tài khoản quản trị viên của GMedia. Vui lòng liên hệ quản
          trị viên nếu bạn cần quyền truy cập.
        </p>
        <Link to="/" className={buttonVariants({ size: "lg", className: "mt-6" })}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}