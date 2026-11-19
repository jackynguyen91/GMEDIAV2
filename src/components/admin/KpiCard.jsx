export default function KpiCard({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft/55">
        {label}
      </p>
      <p className="mt-3 font-heading text-3xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 font-body text-xs text-ink-soft/55">{hint}</p>}
      <span className="mt-4 block h-[2px] w-10 bg-gold-gradient" />
    </div>
  );
}