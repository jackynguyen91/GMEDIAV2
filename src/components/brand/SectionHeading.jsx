import { cn } from "@/lib/utils";

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  titleClassName,
  className,
}) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col", centered && "items-center text-center", className)}>
      {label && (
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
          {label}
        </span>
      )}
      {title && (
        <h2
          className={cn(
            "mt-3 font-heading text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl",
            titleClassName
          )}
        >
          {title}
        </h2>
      )}
      <span className="mt-5 h-[3px] w-12 rounded-full bg-gold-gradient" />
      {description && (
        <p className="mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-ink-soft/70">
          {description}
        </p>
      )}
    </div>
  );
}