import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import Button from "@/components/brand/Button";
import FormField from "@/components/brand/FormField";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { friendlyError, readAttribution } from "@/lib/lead-client";
import { submitLead } from "@/lib/lead-fns";
import { trackLeadConversion } from "@/lib/tracking";
import { BRAND } from "@/lib/brand";

const TIME_SLOTS = ["09:00 - 10:00", "10:00 - 11:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];

const CHANNELS = [
  { value: "dien-thoai", label: "Gọi điện thoại" },
  { value: "zalo", label: "Zalo" },
  { value: "google-meet", label: "Google Meet" },
];

const EMPTY = {
  full_name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  channel: "dien-thoai",
  note: "",
  honeypot: "",
};

function formatDateVi(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export default function BookingForm() {
  const submit = useServerFn(submitLead);
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phone = values.phone.replace(/[\s.-]/g, "");
    const nextErrors = {};

    if (!values.full_name.trim()) nextErrors.full_name = "Vui lòng nhập họ tên";
    if (!/^0\d{9}$/.test(phone)) nextErrors.phone = "Số điện thoại chưa hợp lệ (10 số, bắt đầu bằng 0)";
    if (!values.date) nextErrors.date = "Vui lòng chọn ngày mong muốn";
    else if (values.date < new Date().toISOString().slice(0, 10))
      nextErrors.date = "Ngày đã chọn đã qua, vui lòng chọn ngày khác";
    if (!values.time) nextErrors.time = "Vui lòng chọn khung giờ";
    if (!consent) nextErrors.consent = "Vui lòng đồng ý để GMedia liên hệ theo thông tin đã cung cấp";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const channelLabel = CHANNELS.find((item) => item.value === values.channel)?.label ?? "";
    const message = [
      `[Đặt lịch tư vấn] ${formatDateVi(values.date)} · ${values.time} · ${channelLabel}`,
      values.note.trim() ? `Nhu cầu: ${values.note.trim()}` : "",
    ]
      .filter(Boolean)
      .join(" · ");

    setSubmitting(true);
    setSubmitError("");
    try {
      await submit({
        data: {
          full_name: values.full_name.trim(),
          phone,
          email: values.email.trim(),
          source: "booking_form",
          message,
          consent: true,
          honeypot: values.honeypot,
          ...readAttribution(),
        },
      });
      trackLeadConversion({ source: "booking_form", service: "khac" });
      setSent(true);
      setValues(EMPTY);
      setConsent(false);
    } catch (error) {
      setSubmitError(friendlyError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-gold bg-cream p-6">
        <p className="font-heading text-base font-semibold text-ink">Đã giữ lịch cho bạn</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft/80">
          GMedia sẽ xác nhận lại qua điện thoại trong giờ làm việc. Nếu cần đổi giờ, bạn gọi{" "}
          <a href={`tel:${BRAND.hotlineTel}`} className="font-semibold text-gold-dark">
            {BRAND.hotline}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="booking-name"
          label="Họ tên"
          required
          placeholder="Nguyễn Văn A"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
        />
        <FormField
          id="booking-phone"
          label="Số điện thoại"
          required
          type="tel"
          placeholder="0911 597 086"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
        <FormField
          id="booking-date"
          label="Ngày mong muốn"
          required
          type="date"
          value={values.date}
          onChange={update("date")}
          error={errors.date}
        />
        <FormField
          id="booking-time"
          label="Khung giờ"
          required
          type="select"
          placeholder="Chọn khung giờ"
          options={TIME_SLOTS}
          value={values.time}
          onChange={update("time")}
          error={errors.time}
        />
        <FormField
          id="booking-email"
          label="Email"
          type="email"
          placeholder="ban@gmail.com"
          value={values.email}
          onChange={update("email")}
        />
        <FormField
          id="booking-channel"
          label="Hình thức trao đổi"
          type="select"
          options={CHANNELS}
          value={values.channel}
          onChange={update("channel")}
        />
      </div>

      <FormField
        id="booking-note"
        label="Nhu cầu cần tư vấn"
        type="textarea"
        rows={3}
        placeholder="Ví dụ: cần làm website bán hàng cho xưởng nội thất, dự kiến chạy Google Ads…"
        value={values.note}
        onChange={update("note")}
      />

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="booking-honeypot">Website</label>
        <input
          id="booking-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <ConsentCheckbox
        id="booking-consent"
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        error={errors.consent}
      />

      {submitError && <p className="font-body text-sm text-destructive">{submitError}</p>}

      <Button type="submit" size="lg" loading={submitting} className="w-full sm:w-auto">
        Đặt lịch tư vấn
      </Button>
    </form>
  );
}