import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

export default function TopBar() {
  const { settings } = useSiteSettings();

  return (
    <div className="hidden bg-ink md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 font-body text-xs text-white/70">
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${settings.email}`}
            className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold-light"
          >
            <Mail className="h-3.5 w-3.5 text-gold" />
            {settings.email}
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <a
            href={`tel:${settings.hotlineTel}`}
            className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold-light"
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            {settings.hotline}
          </a>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={settings.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook GMedia"
            className="rounded-full p-1.5 transition-colors duration-300 hover:text-gold-light"
          >
            <Facebook className="h-3.5 w-3.5" />
          </a>
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram GMedia"
            className="rounded-full p-1.5 transition-colors duration-300 hover:text-gold-light"
          >
            <Instagram className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}