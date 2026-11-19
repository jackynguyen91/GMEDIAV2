import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border bg-paper px-4 font-body text-sm text-ink transition-colors duration-300 placeholder:text-ink-soft/35 focus:outline-none focus:ring-2";

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  options = [],
  error,
  required = false,
  rows = 4,
  className,
  ...props
}) {
  const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  const stateClass = error
    ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30"
    : "border-line focus:border-gold-dark focus:ring-2 focus:ring-gold/50";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink"
        >
          {label}
          {required && <span className="ml-1 text-gold-dark">*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={fieldId}
          rows={rows}
          placeholder={placeholder}
          className={cn(fieldBase, stateClass, "resize-y py-3")}
          aria-invalid={!!error || undefined}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={fieldId}
          className={cn(fieldBase, stateClass, "h-11 appearance-none pr-10")}
          aria-invalid={!!error || undefined}
          {...props}
        >
          <option value="">{placeholder || "Chọn..."}</option>
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value;
            const text = typeof option === "string" ? option : option.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          className={cn(fieldBase, stateClass, "h-11")}
          aria-invalid={!!error || undefined}
          {...props}
        />
      )}

      {error && <p className="font-body text-xs text-destructive">{error}</p>}
    </div>
  );
}