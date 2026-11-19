import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import Button from "@/components/brand/Button";
import FormField from "@/components/brand/FormField";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { friendlyError, readAttribution } from "@/lib/lead-client";
import { submitLead } from "@/lib/lead-fns";
import { trackLeadConversion } from "@/lib/tracking";
import { BRAND } from "@/lib/brand";

const EMPTY = {
  full_name: "",
  phone: "",
  email: "",
  position: "",
  cv_url: "",
  note: "",
  honeypot: "",
};

export default function ApplyForm({ positions = [], defaultPosition = "" }) {
  const submit = useServerFn(submitLead);
  const [values, setValues] = useState({ ...EMPTY, position: defaultPosition });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (defaultPosition) setValues((current) => ({ ...current, position: defaultPosition }));
  }, [defaultPosition]);

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phone = values.phone.replace(/[\s.-]/g, "");
    const nextErrors = {};

    if (!values.full_name.trim()) nextErrors.full_name = "Vui lòng nhập họ tên";
    if (!/^0\d{9}$/.test(phone)) nextErrors.phone = "Số điện thoại chưa hợp lệ (10 số, bắt đầu bằng 0)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      nextErrors.email = "Vui lòng nhập email để GMedia phản hồi";
    if (!values.position) nextErrors.position = "Vui lòng chọn vị trí ứng tuyển";
    if (!consent) nextErrors.consent = "Vui lòng đồng ý để GMedia liên hệ theo thông tin đã cung cấp";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const positionLabel =
      positions.find((item) => item.id === values.position)?.title ?? values.position;
    const message = [
      `[Ứng tuyển] ${positionLabel}`,
      values.cv_url.trim() ? `CV: ${values.cv_url.trim()}` : "CV: ứng viên gửi kèm sau",
      values.note.trim() ? `Giới thiệu: ${values.note.trim()}` : "",
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
          source: "apply_form",
          message,
          consent: true,
          honeypot: values.honeypot,
          ...readAttribution(),
        },
      });
      trackLeadConversion({ source: "apply_form", service: "khac" });
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
        <p className="font-heading text-base font-semibold text-ink">Đã nhận hồ sơ của bạn</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft/80">
          GMedia sẽ xem hồ sơ và phản hồi trong 3 ngày làm việc. Cần trao đổi gấp, bạn gọi hotline{" "}
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
          id="apply-name"
          label="Họ tên"
          required
          placeholder="Nguyễn Văn A"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
        />
        <FormField
          id="apply-phone"
          label="Số điện thoại"
          required
          type="tel"
          placeholder="0911 597 086"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
        <FormField
          id="apply-email"
          label="Email"
          required
          type="email"
          placeholder="ban@gmail.com"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
        <FormField
          id="apply-position"
          label="Vị trí ứng tuyển"
          required
          type="select"
          placeholder="Chọn vị trí"
          options={positions.map((item) => ({ value: item.id, label: item.title }))}
          value={values.position}
          onChange={update("position")}
          error={errors.position}
        />
      </div>

      <FormField
        id="apply-cv"
        label="Link CV / Portfolio"
        type="url"
        placeholder="https://drive.google.com/..."
        value={values.cv_url}
        onChange={update("cv_url")}
      />
      <FormField
        id="apply-note"
        label="Giới thiệu ngắn"
        type="textarea"
        rows={3}
        placeholder="Kinh nghiệm nổi bật, thời gian có thể bắt đầu làm việc…"
        value={values.note}
        onChange={update("note")}
      />

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="apply-honeypot">Website</label>
        <input
          id="apply-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <ConsentCheckbox
        id="apply-consent"
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        error={errors.consent}
      />

      {submitError && <p className="font-body text-sm text-destructive">{submitError}</p>}

      <Button type="submit" size="lg" loading={submitting} className="w-full sm:w-auto">
        Gửi hồ sơ ứng tuyển
      </Button>
    </form>
  );
}