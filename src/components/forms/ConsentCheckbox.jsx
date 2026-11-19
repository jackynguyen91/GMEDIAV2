import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function ConsentCheckbox({
  id = "lead-consent",
  checked,
  onChange,
  error,
  tone = "light",
  label = "Tôi đồng ý để GMedia liên hệ tư vấn theo thông tin đã cung cấp",
}) {
  const dark = tone === "dark";

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-2.5 font-body text-xs leading-relaxed",
          dark ? "text-white/75" : "text-ink-soft/75"
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 shrink-0 accent-gold-dark"
        />
        <span>
          {label}{" "}
          <Link
            to="/chinh-sach-bao-mat"
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "underline underline-offset-2 transition-colors",
              dark ? "text-gold-light hover:text-white" : "text-gold-dark hover:text-ink"
            )}
          >
            Chính sách bảo mật
          </Link>
        </span>
      </label>
      {error && (
        <p
          className={cn(
            "mt-1.5 font-body text-xs",
            dark ? "text-red-300" : "text-destructive"
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}