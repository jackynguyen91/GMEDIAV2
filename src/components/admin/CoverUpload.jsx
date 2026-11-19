import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

export default function CoverUpload({ value, onChange, label = "Ảnh bìa", inputId = "cover-upload" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Ảnh tối đa 8MB.");
      return;
    }
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
      toast.success("Đã tải ảnh lên.");
    } catch (err) {
      toast.error(err?.message ?? "Tải ảnh thất bại.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
        {label}
      </span>

      <div className="mt-1.5 overflow-hidden rounded-xl border border-line bg-cream/50">
        {value ? (
          <div className="relative">
            <Image src={value} alt={label} className="h-40 w-full object-cover" />
            <div className="absolute right-2 top-2 flex gap-1.5">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg bg-paper/90 px-2 py-1 font-body text-[11px] text-ink shadow-sm"
              >
                Đổi ảnh
              </button>
              <button
                type="button"
                aria-label="Xóa ảnh"
                onClick={() => onChange("")}
                className="rounded-lg bg-paper/90 p-1.5 text-ink shadow-sm hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex h-28 w-full flex-col items-center justify-center gap-1.5 font-body text-xs text-ink-soft/55 transition-colors hover:text-gold-dark"
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ImagePlus className="h-5 w-5" />
            )}
            {uploading ? "Đang tải ảnh..." : "Chọn ảnh từ máy (tối đa 8MB)"}
          </button>
        )}
      </div>

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}