import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import DarkLogo from "@/components/layout/DarkLogo";
import { BRAND } from "@/lib/brand";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { FOOTER_ABOUT_LINKS, FOOTER_SERVICE_LINKS } from "@/lib/nav";

function ColumnTitle({ children }) {
  return (
    <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
      {children}
    </h3>
  );
}

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-ink text-cream">
      <div aria-hidden="true" className="h-[2px] w-full bg-gold-gradient" />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <DarkLogo />
          <p className="mt-5 font-heading text-sm font-semibold text-white">{BRAND.legalName}</p>
          <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
            {BRAND.description}
          </p>
          <p className="mt-4 font-body text-sm italic text-gold-light">{BRAND.tagline}</p>
        </div>

        <div>
          <ColumnTitle>Về chúng tôi</ColumnTitle>
          <ul className="mt-5 space-y-3">
            {FOOTER_ABOUT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-body text-sm text-white/65 transition-colors duration-300 hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Dịch vụ</ColumnTitle>
          <ul className="mt-5 space-y-3">
            {FOOTER_SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-body text-sm text-white/65 transition-colors duration-300 hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Thông tin liên hệ</ColumnTitle>
          <ul className="mt-5 space-y-3 font-body text-sm text-white/65">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="leading-relaxed">{settings.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`mailto:${settings.email}`}
                className="transition-colors duration-300 hover:text-gold-light"
              >
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`tel:${settings.hotlineTel}`}
                className="transition-colors duration-300 hover:text-gold-light"
              >
                {settings.hotline}
              </a>
            </li>
            <li className="pt-1 text-xs uppercase tracking-wider text-white/50">
              MST: {BRAND.taxId}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-5 text-center font-body text-xs text-white/50">
          Copyright 2026 © All rights reserved by GMedia
        </p>
      </div>
    </footer>
  );
}