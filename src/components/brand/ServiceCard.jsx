import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServiceCard({ icon: Icon, title, description, to, className }) {
  const classes = cn(
    "group flex h-full flex-col rounded-xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe-lg",
    className
  );

  const content = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/60 text-gold-dark transition-colors duration-300 group-hover:bg-cream">
        {Icon && <Icon className="h-5 w-5" />}
      </span>
      <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2.5 flex-1 font-body text-sm leading-relaxed text-ink-soft/70">
        {description}
      </p>
      {to && (
        <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
          Xem thêm
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  if (!to) {
    return <div className={classes}>{content}</div>;
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}