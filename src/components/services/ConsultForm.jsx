import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import Button from "@/components/brand/Button";
import FormField from "@/components/brand/FormField";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { friendlyError, readAttribution } from "@/lib/lead-client";
import { submitLead } from "@/lib/lead-fns";
import { trackLeadConversion } from "@/lib/tracking";

const EMPTY = { full_name: "", phone: "", honeypot: "" };

export default function ConsultForm() {
  const submit = useServerFn(submitLead);
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phone = values.phone.replace(/[\s.-]/g, "");
    const nextErrors = {};

    if (!values.full_name.trim()) nextErrors.full_name = "Vui lòng nhập họ tên";
    if (!/^0\d{9}$/.test(phone)) nextErrors.phone = "Số điện thoại chưa hợp lệ (10 số, bắt đầu bằng 0)";
    if (!consent) nextErrors.consent = "Vui lòng đồng ý để GMedia liên hệ tư vấn";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await submit({
        data: {
          full_name: values.full_name.trim(),
          phone,
          service_interest: "thiet-ke-website",
          source: "quick_form",
          consent: true,
          honeypot: values.honeypot,
          ...readAttribution(),
        },
      });
      trackLeadConversion({ source: "quick_form", service: "thiet-ke-website" });
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
      <p className="rounded-xl border border-gold bg-white/5 px-5 py-4 font-body text-sm leading-relaxed text-white/85">
        Cảm ơn bạn đã gửi yêu cầu. GMedia sẽ liên hệ tư vấn trong thời gian sớm nhất.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <FormField
          id="consult-name"
          label="Họ tên"
          required
          placeholder="Nguyễn Văn A"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
          className="flex-1"
        />
        <FormField
          id="consult-phone"
          label="Số điện thoại"
          required
          type="tel"
          placeholder="0911 597 086"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
          className="flex-1"
        />
        <Button type="submit" size="lg" loading={submitting} className="shrink-0">
          Gửi yêu cầu
        </Button>
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="consult-honeypot">Website</label>
        <input
          id="consult-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <ConsentCheckbox
        id="consult-consent"
        tone="dark"
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        error={errors.consent}
      />

      {submitError && <p className="font-body text-sm text-red-300">{submitError}</p>}
    </form>
  );
}