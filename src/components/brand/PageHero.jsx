import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export default function PageHero({ label, title, description, breadcrumbs = [] }) {
  const trail = [{ label: "Trang chủ", to: "/" }, ...breadcrumbs, { label: title }];
  const crumbs = trail.filter(
    (crumb, index) => index === 0 || crumb.label !== trail[index - 1].label
  );

  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_130%_at_85%_0%,rgba(201,162,77,0.18)_0%,rgba(26,26,26,0)_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-dark/60 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 font-body text-xs text-white/70"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                {isLast || !crumb.to ? (
                  <span className="text-white/80">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="transition-colors duration-300 hover:text-gold-light"
                  >
                    {crumb.label}
                  </Link>
                )}
                {!isLast && <ChevronRight className="h-3 w-3 text-white/25" />}
              </span>
            );
          })}
        </nav>

        {label && (
          <span className="mt-8 block font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-light">
            {label}
          </span>
        )}

        <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <span className="mt-6 block h-[3px] w-12 rounded-full bg-gold-gradient" />

        {description && (
          <p className="mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-white/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}