import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-paper text-gold-dark shadow-luxe transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:shadow-luxe-lg animate-pulse-gold";

export default function FloatingActions() {
  const { settings } = useSiteSettings();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
      <a
        href={settings.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        className={buttonClass}
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <a
        href={`tel:${settings.hotlineTel}`}
        aria-label="Gọi hotline"
        className={cn(buttonClass, "[animation-delay:600ms]")}
      >
        <Phone className="h-5 w-5" />
      </a>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Lên đầu trang"
          className={cn(buttonClass, "[animation-delay:1200ms]")}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}