import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/brand/Button";
import { cn } from "@/lib/utils";

export default function CTABanner({
  title,
  description,
  ctaLabel = "Nhận tư vấn",
  ctaHref = "/bao-gia",
  ctaSearch,
  secondaryLabel,
  secondaryHref,
  className,
  children,
}) {
  return (
    <section className={cn("relative overflow-hidden bg-ink", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_15%_0%,rgba(201,162,77,0.16)_0%,rgba(26,26,26,0)_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-white/65">
                {description}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {ctaLabel && (
              <Link to={ctaHref} search={ctaSearch} className={buttonVariants({ size: "lg" })}>
                {ctaLabel}
              </Link>
            )}
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className: "border-white/60 text-white hover:bg-white hover:text-ink",
                })}
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
        {children && <div className="mt-8 w-full max-w-2xl">{children}</div>}
      </div>
    </section>
  );
}