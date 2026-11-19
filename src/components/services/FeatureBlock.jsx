import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export default function FeatureBlock({ title, description, image, alt, reverse = false }) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden rounded-xl border border-line",
          reverse && "md:order-2"
        )}
      >
        <Image src={image} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className={cn(reverse && "md:order-1")}>
        <h3 className="font-heading text-xl font-semibold leading-snug text-ink md:text-2xl">
          {title}
        </h3>
        <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
        <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft/75">
          {description}
        </p>
      </div>
    </div>
  );
}