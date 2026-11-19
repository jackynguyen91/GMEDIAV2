export default function TableOfContents({ items }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Mục lục bài viết" className="rounded-xl border border-line bg-cream/60 p-5">
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
        Mục lục
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="font-body text-sm leading-snug text-ink-soft/75 transition-colors duration-300 hover:text-gold-dark"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}