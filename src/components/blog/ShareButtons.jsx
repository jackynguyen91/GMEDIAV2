import { useState } from "react";
import { Check, Facebook, Link2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButtons({ url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Đã sao chép liên kết bài viết.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không sao chép được liên kết.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft/50">
        Chia sẻ
      </span>
      <a
        href={shareUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 font-body text-xs text-ink transition-colors duration-300 hover:border-gold hover:text-gold-dark"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 font-body text-xs text-ink transition-colors duration-300 hover:border-gold hover:text-gold-dark"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Đã sao chép" : "Sao chép link"}
      </button>
    </div>
  );
}