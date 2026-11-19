import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import Button from "@/components/brand/Button";
import FormField from "@/components/brand/FormField";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { friendlyError, readAttribution } from "@/lib/lead-client";
import { submitLead } from "@/lib/lead-fns";
import { trackLeadConversion } from "@/lib/tracking";

const EMPTY = { full_name: "", phone: "", domain_requested: "", honeypot: "" };

export default function DomainRequestForm() {
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
    if (!values.domain_requested.trim()) nextErrors.domain_requested = "Vui lòng nhập tên miền bạn muốn đăng ký";
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
          domain_requested: values.domain_requested.trim(),
          service_interest: "ten-mien-hosting",
          source: "domain_form",
          consent: true,
          honeypot: values.honeypot,
          ...readAttribution(),
        },
      });
      trackLeadConversion({ source: "domain_form", service: "ten-mien-hosting" });
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
      <p className="rounded-xl border border-gold/40 bg-cream px-5 py-4 font-body text-sm leading-relaxed text-ink-soft/80">
        Đã ghi nhận yêu cầu đăng ký tên miền. Tư vấn viên GMedia sẽ liên hệ với bạn để tư vấn chi
        tiết.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="domain-name-person"
          label="Họ tên"
          required
          placeholder="Nguyễn Văn A"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
        />
        <FormField
          id="domain-phone"
          label="Số điện thoại"
          required
          type="tel"
          placeholder="0911 597 086"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
      </div>

      <FormField
        id="domain-name"
        label="Tên miền"
        required
        placeholder="tencongty.com"
        value={values.domain_requested}
        onChange={update("domain_requested")}
        error={errors.domain_requested}
      />

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="domain-honeypot">Website</label>
        <input
          id="domain-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <ConsentCheckbox
        id="domain-consent"
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        error={errors.consent}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" loading={submitting}>
          Gửi yêu cầu đăng ký
        </Button>
        {submitError && <p className="font-body text-sm text-destructive">{submitError}</p>}
      </div>
    </form>
  );
}