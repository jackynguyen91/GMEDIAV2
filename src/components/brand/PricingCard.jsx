import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/brand/Button";
import { cn } from "@/lib/utils";

export default function PricingCard({
  name,
  price,
  note,
  features = [],
  ctaLabel = "Nhận báo giá",
  ctaHref = "/bao-gia",
  ctaSearch,
  featured = false,
}) {
  return (
    <div
      className={cn(
        "h-full rounded-xl",
        featured
          ? "bg-gold-gradient p-[2px] shadow-luxe-lg"
          : "border border-line bg-paper"
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col bg-paper p-7",
          featured ? "rounded-[10px]" : "rounded-xl"
        )}
      >
        {featured && (
          <span className="mb-4 inline-flex self-start rounded-full bg-gold-gradient px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
            Phổ biến
          </span>
        )}

        <h3 className="font-heading text-lg font-semibold text-ink">{name}</h3>
        <p className="mt-3 font-heading text-2xl font-semibold text-ink">{price}</p>
        {note && <p className="mt-1.5 font-body text-xs text-ink-soft/50">{note}</p>}

        <ul className="mt-6 flex-1 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-ink-soft/80"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to={ctaHref}
          search={ctaSearch}
          className={buttonVariants({
            variant: featured ? "primary" : "secondary",
            className: "mt-7 w-full",
          })}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}