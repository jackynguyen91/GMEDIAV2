import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { buttonVariants } from "@/components/brand/Button";
import DarkLogo from "@/components/layout/DarkLogo";
import { BRAND } from "@/lib/brand";
import { MAIN_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Wordmark is 764x274 (ratio 2.788): width follows the height, never distorted.
const LOGO_SIZE =
  "h-11 w-[123px] md:h-[52px] md:w-[145px] min-[1280px]:h-16 min-[1280px]:w-[178px]";
const LOGO_SIZE_SCROLLED = "h-11 w-[123px] md:h-[52px] md:w-[145px]";

const NAV_LINK =
  "group relative inline-flex items-center gap-1 pb-1.5 font-heading text-[13px] font-semibold uppercase leading-none tracking-[0.04em] whitespace-nowrap transition-colors duration-300 hover:text-gold-dark min-[1280px]:text-sm";

export default function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const underline = (active) =>
    cn(
      "absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100",
      active ? "scale-x-100" : "scale-x-0"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-paper transition-shadow duration-300",
        scrolled ? "shadow-[0_10px_28px_-20px_rgba(26,26,26,0.45)]" : ""
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-6 transition-[height] [transition-duration:250ms] ease-out",
          scrolled ? "h-[68px] md:h-20 lg:h-[72px]" : "h-[68px] md:h-20 lg:h-[92px]"
        )}
      >
        <Link
          to="/"
          aria-label="GMedia - Trang chủ"
          className="inline-flex shrink-0 items-center"
        >
          <Image
            src={BRAND.logoMarkUrl}
            alt="GMedia - Tech Your Life"
            fittingType="fit"
            className={cn(scrolled ? LOGO_SIZE_SCROLLED : LOGO_SIZE)}
          />
        </Link>

        <div className="flex min-w-0 items-center gap-3">
          <nav
            aria-label="Main"
            className="hidden items-center gap-[10px] min-[1100px]:flex min-[1280px]:gap-[22px] min-[1440px]:gap-[28px]"
          >
            {MAIN_NAV.map((item) => {
              const active = isNavActive(pathname, item.to);

              if (!item.children) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(NAV_LINK, active ? "text-gold-dark" : "text-ink")}
                  >
                    {item.label}
                    <span aria-hidden="true" className={underline(active)} />
                  </Link>
                );
              }

              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.to)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to={item.to}
                    className={cn(NAV_LINK, active ? "text-gold-dark" : "text-ink")}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-transform duration-300",
                        openMenu === item.to && "rotate-180"
                      )}
                    />
                    <span aria-hidden="true" className={underline(active)} />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-0 top-full w-64 pt-3 transition-all duration-200",
                      openMenu === item.to
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    )}
                  >
                    <div className="overflow-hidden rounded-xl border border-line bg-paper py-2 shadow-luxe-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={cn(
                            "block px-4 py-2.5 font-heading text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200 hover:bg-cream hover:text-gold-dark",
                            pathname === child.to ? "text-gold-dark" : "text-ink-soft"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <Link
            to="/bao-gia"
            className={buttonVariants({
              size: "md",
              className:
                "hidden h-11 shrink-0 rounded-[10px] px-5 font-heading text-sm font-bold uppercase tracking-[0.04em] min-[1100px]:inline-flex",
            })}
          >
            Nhận tư vấn
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Mở menu"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-ink transition-colors duration-300 hover:border-gold hover:text-gold-dark min-[1100px]:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink min-[1100px]:hidden">
          <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/10 px-6">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              aria-label="GMedia - Trang chủ"
              className="inline-flex items-center"
            >
              <DarkLogo />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Đóng menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-white transition-colors duration-300 hover:border-gold hover:text-gold-light"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-2">
            {MAIN_NAV.map((item) => {
              const active = isNavActive(pathname, item.to);

              if (!item.children) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-12 items-center border-b border-white/10 py-3 font-heading text-base font-semibold uppercase leading-relaxed tracking-[0.04em] transition-colors duration-300",
                      active ? "text-gold-light" : "text-white/90 hover:text-gold-light"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.to} className="border-b border-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex min-h-12 flex-1 items-center py-3 font-heading text-base font-semibold uppercase leading-relaxed tracking-[0.04em] transition-colors duration-300",
                        active ? "text-gold-light" : "text-white/90 hover:text-gold-light"
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServices((open) => !open)}
                      aria-label="Mở danh mục dịch vụ"
                      aria-expanded={mobileServices}
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center text-white/70"
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          mobileServices && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {mobileServices && (
                    <div className="mb-3 ml-1 border-l border-gold-dark pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-12 items-center py-2.5 font-heading text-[15px] font-medium uppercase leading-relaxed tracking-[0.04em] text-white/75 transition-colors duration-300 hover:text-gold-light"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="shrink-0 border-t border-white/10 p-6">
            <Link
              to="/bao-gia"
              onClick={() => setMobileOpen(false)}
              className={buttonVariants({
                size: "lg",
                className:
                  "w-full rounded-[10px] font-heading uppercase tracking-[0.04em]",
              })}
            >
              Nhận tư vấn
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}