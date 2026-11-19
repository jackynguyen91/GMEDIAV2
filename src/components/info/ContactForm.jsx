import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import Button from "@/components/brand/Button";
import FormField from "@/components/brand/FormField";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { SERVICE_OPTIONS } from "@/lib/leadOptions";
import { friendlyError, readAttribution } from "@/lib/lead-client";
import { submitLead } from "@/lib/lead-fns";
import { trackLeadConversion } from "@/lib/tracking";

const EMPTY = {
  full_name: "",
  phone: "",
  email: "",
  service_interest: "",
  message: "",
  honeypot: "",
};

export default function ContactForm() {
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

    if (!values.full_name.trim()) nextErrors.full_name = "Vui lòng nhập họ và tên";
    if (!/^0\d{9}$/.test(phone)) nextErrors.phone = "Số điện thoại chưa hợp lệ (10 số, bắt đầu bằng 0)";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      nextErrors.email = "Email chưa đúng định dạng";
    }
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
          email: values.email.trim(),
          service_interest: values.service_interest || undefined,
          message: values.message.trim(),
          source: "contact_form",
          consent: true,
          honeypot: values.honeypot,
          ...readAttribution(),
        },
      });
      trackLeadConversion({ source: "contact_form", service: values.service_interest });
      setSent(true);
      setValues(EMPTY);
      setConsent(false);
    } catch (error) {
      setSubmitError(friendlyError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-name"
          label="Họ và tên"
          required
          placeholder="Nguyễn Văn A"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
        />
        <FormField
          id="contact-phone"
          label="Số điện thoại"
          required
          type="tel"
          placeholder="0911 597 086"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
        <FormField
          id="contact-email"
          label="Email"
          type="email"
          placeholder="ban@congty.vn"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
        <FormField
          id="contact-service"
          label="Dịch vụ quan tâm"
          type="select"
          placeholder="Chọn dịch vụ"
          options={SERVICE_OPTIONS}
          value={values.service_interest}
          onChange={update("service_interest")}
        />
      </div>

      <FormField
        id="contact-message"
        label="Nội dung"
        type="textarea"
        rows={5}
        placeholder="Mô tả ngắn về nhu cầu của bạn"
        value={values.message}
        onChange={update("message")}
      />

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="contact-honeypot">Website</label>
        <input
          id="contact-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <ConsentCheckbox
        id="contact-consent"
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        error={errors.consent}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" loading={submitting}>
          Gửi liên hệ
        </Button>
        {sent && (
          <p className="font-body text-sm text-gold-dark">
            Cảm ơn bạn đã gửi liên hệ. GMedia sẽ phản hồi trong thời gian sớm nhất.
          </p>
        )}
        {submitError && <p className="font-body text-sm text-destructive">{submitError}</p>}
      </div>
    </form>
  );
}