import PricingCard from "@/components/brand/PricingCard";
import { cn } from "@/lib/utils";

export default function PackageGrid({
  packages,
  ctaLabel,
  ctaHref = "/bao-gia",
  searchFor,
  className,
}) {
  if (!packages?.length) return null;

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {packages.map((pkg) => (
        <PricingCard
          key={pkg.id}
          name={pkg.name}
          price={pkg.price_label}
          note={pkg.price_note}
          features={pkg.features ?? []}
          featured={pkg.highlight}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          ctaSearch={searchFor ? searchFor(pkg) : undefined}
        />
      ))}
    </div>
  );
}