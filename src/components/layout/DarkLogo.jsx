import { Image } from "@/components/ui/image";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

// The wordmark is black lettering on a transparent plate. On dark surfaces we
// invert it (lettering becomes white, the gold bar keeps its hue) so the mark
// sits directly on the ink background.
export default function DarkLogo({ className }) {
  return (
    <span className="inline-block [filter:invert(1)_hue-rotate(180deg)] mix-blend-screen">
      <Image
        src={BRAND.logoMarkUrl}
        alt="GMedia - Tech Your Life"
        fittingType="fit"
        className={cn("h-11 w-[123px]", className)}
      />
    </span>
  );
}