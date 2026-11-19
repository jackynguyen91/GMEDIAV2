import { useEffect, useState } from "react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import Button from "@/components/brand/Button";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

const FIELDS = [
  { key: "hotline", label: "Hotline", placeholder: "0911 597 086" },
  { key: "email", label: "Email", placeholder: "info.gmediatech@gmail.com" },
  { key: "address", label: "Địa chỉ", placeholder: "Tầng 05, Tòa nhà Songdo, ..." },
  { key: "zalo_url", label: "Link Zalo", placeholder: "https://zalo.me/0911597086" },
  { key: "facebook_url", label: "Link Facebook", placeholder: "https://www.facebook.com/..." },
  { key: "instagram_url", label: "Link Instagram", placeholder: "https://www.instagram.com/..." },
];

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2 font-body text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

export default function SettingsForm() {
  const { settings, record, refresh } = useSiteSettings();
  const [values, setValues] = useState({
    hotline: settings.hotline,
    email: settings.email,
    address: settings.address,
    zalo_url: settings.zalo_url,
    facebook_url: settings.facebook_url,
    instagram_url: settings.instagram_url,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!record) return;
    setValues({
      hotline: record.hotline ?? "",
      email: record.email ?? "",
      address: record.address ?? "",
      zalo_url: record.zalo_url ?? "",
      facebook_url: record.facebook_url ?? "",
      instagram_url: record.instagram_url ?? "",
    });
  }, [record]);

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.hotline.trim() || !values.email.trim()) {
      setError("Vui lòng nhập hotline và email liên hệ.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()])
    );
    try {
      if (record?.id) await base44.entities.SiteSetting.update(record.id, payload);
      else await base44.entities.SiteSetting.create(payload);
      await refresh();
      toast.success("Đã lưu thông tin liên hệ.");
    } catch (err) {
      setError(err?.message ?? "Lưu thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-paper p-5 shadow-luxe md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              {field.label}
            </span>
            <input
              value={values[field.key]}
              onChange={set(field.key)}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      {error && <p className="mt-4 font-body text-sm text-destructive">{error}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit" size="md" loading={saving}>
          Lưu thay đổi
        </Button>
        <p className="font-body text-xs text-ink-soft/55">
          Header, footer, trang Liên hệ và nút nổi dùng chung các thông tin này.
        </p>
      </div>
    </form>
  );
}