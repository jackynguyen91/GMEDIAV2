import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/brand/Button";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { BRAND } from "@/lib/brand";

export default function CompanyInfoCard() {
  const { settings } = useSiteSettings();

  return (
    <div className="rounded-xl border border-gold/50 bg-paper p-6 shadow-luxe md:p-8">
      <h2 className="font-heading text-lg font-semibold text-ink">
        Công Ty TNHH Công Nghệ G Media
      </h2>
      <p className="mt-1.5 font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60">
        Mã Số Thuế: {BRAND.taxId}
      </p>
      <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />

      <p className="mt-5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
        GMEDIA AGENCY
      </p>

      <ul className="mt-5 space-y-4 font-body text-sm leading-relaxed text-ink-soft/80">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          <span>Trụ sở chính: {settings.address}</span>
        </li>
        <li className="flex gap-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          <a href={`mailto:${settings.email}`} className="transition-colors hover:text-gold-dark">
            {settings.email}
          </a>
        </li>
        <li className="flex gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          <a href={`tel:${settings.hotlineTel}`} className="transition-colors hover:text-gold-dark">
            Hotline: {settings.hotline} (Mr. Đức)
          </a>
        </li>
        <li className="flex gap-3">
          <Globe className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          <a
            href={BRAND.website}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold-dark"
          >
            {BRAND.website.replace(/^https?:\/\//, "")}
          </a>
        </li>
      </ul>

      <a
        href={settings.zaloUrl}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ size: "md", className: "mt-6 w-full" })}
      >
        Chat Zalo
      </a>
    </div>
  );
}