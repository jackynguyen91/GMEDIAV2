import { Link } from "@tanstack/react-router";
import { Megaphone, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const CHANNELS = [
  { name: "Google Ads", icon: Search, to: "/dich-vu/google-ads" },
  { name: "Facebook Ads", icon: Megaphone, to: "/dich-vu/facebook-ads" },
  { name: "Tiktok Shop", icon: ShoppingBag },
  { name: "Zalo OA", icon: MessageCircle },
];

const cardClass =
  "flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3.5";

function ChannelContent({ name, icon: Icon }) {
  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/60 text-gold-dark">
        <Icon className="h-4 w-4" />
      </span>
      <span className="font-heading text-sm font-semibold text-ink">{name}</span>
    </>
  );
}

export default function ChannelStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CHANNELS.map((channel) =>
        channel.to ? (
          <Link
            key={channel.name}
            to={channel.to}
            className={cn(
              cardClass,
              "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-luxe"
            )}
          >
            <ChannelContent {...channel} />
          </Link>
        ) : (
          <div key={channel.name} className={cn(cardClass, "opacity-70")}>
            <ChannelContent {...channel} />
          </div>
        )
      )}
    </div>
  );
}