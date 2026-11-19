import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Users,
  X,
} from "lucide-react";
import DarkLogo from "@/components/layout/DarkLogo";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

const COMPANY_NAME = "G Media Tech CO., LTD";

const NAV_ITEMS = [
  { label: "Tổng quan", to: "/admin", icon: LayoutDashboard },
  { label: "Lead", to: "/admin/leads", icon: Users },
  { label: "Bài viết", to: "/admin/bai-viet", icon: FileText },
  { label: "Dự án", to: "/admin/du-an", icon: Briefcase },
  { label: "Gói dịch vụ", to: "/admin/goi-dich-vu", icon: Package },
  { label: "Cài đặt", to: "/admin/cai-dat", icon: Settings },
];

function isActive(pathname, to) {
  return to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
}

export default function AdminShell({ children }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-cream">
      <aside className="hidden w-[296px] shrink-0 flex-col bg-ink md:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Link to="/admin" aria-label="GMedia Admin">
            <DarkLogo />
          </Link>
        </div>

        <nav aria-label="Quản trị" className="flex-1 px-3 py-5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[13px] font-semibold transition-colors",
                  active
                    ? "bg-white/5 text-gold-light shadow-[inset_3px_0_0_0_#C9A24D]"
                    : "text-white/65 hover:bg-white/5 hover:text-cream"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate font-heading text-xs font-semibold text-white/80">{COMPANY_NAME}</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 font-body text-xs text-white/65 transition-colors hover:text-gold-light"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Xem website
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="flex items-center gap-2 font-body text-xs text-white/65 transition-colors hover:text-gold-light"
            >
              <LogOut className="h-3.5 w-3.5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-ink px-4 py-2.5 md:hidden">
          <Link to="/admin" aria-label="GMedia Admin" className="min-w-0">
            <DarkLogo />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="admin-mobile-menu"
            aria-label={menuOpen ? "Đóng menu quản trị" : "Mở menu quản trị"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-cream transition-colors hover:border-gold-light hover:text-gold-light"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="admin-mobile-menu"
            aria-label="Quản trị di động"
            className="border-b border-white/10 bg-ink px-3 pb-3 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[13px] font-semibold transition-colors",
                    active
                      ? "bg-white/5 text-gold-light shadow-[inset_3px_0_0_0_#C9A24D]"
                      : "text-white/65 hover:bg-white/5 hover:text-cream"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              <p className="font-heading text-xs font-semibold text-white/80">{COMPANY_NAME}</p>
              <Link
                to="/"
                className="flex items-center gap-2 font-body text-xs text-white/65 transition-colors hover:text-gold-light"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Xem website
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="flex items-center gap-2 font-body text-xs text-white/65 transition-colors hover:text-gold-light"
              >
                <LogOut className="h-3.5 w-3.5" />
                Đăng xuất
              </button>
            </div>
          </nav>
        )}

        <main className="min-w-0 max-w-full flex-1 overflow-x-hidden px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}