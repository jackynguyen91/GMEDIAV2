import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import Button, { buttonVariants } from "@/components/brand/Button";
import FormField from "@/components/brand/FormField";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, packagesForService } from "@/lib/leadOptions";
import { friendlyError, readAttribution } from "@/lib/lead-client";
import { submitLead } from "@/lib/lead-fns";
import { trackLeadConversion } from "@/lib/tracking";
import { BRAND } from "@/lib/brand";

const EMPTY = {
  full_name: "",
  phone: "",
  email: "",
  company: "",
  service_interest: "",
  package_name: "",
  budget_range: "",
  message: "",
  honeypot: "",
};

export default function QuoteForm({ packages = [], initialService = "", initialPackage = "" }) {
  const submit = useServerFn(submitLead);
  const [values, setValues] = useState({
    ...EMPTY,
    service_interest: SERVICE_OPTIONS.some((item) => item.value === initialService)
      ? initialService
      : "",
    package_name: initialPackage,
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  const packageOptions = packagesForService(packages, values.service_interest).map((pkg) => ({
    value: pkg.name,
    label: pkg.name,
  }));

  const update = (field) => (event) => {
    const value = event.target.value;
    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "service_interest" ? { package_name: "" } : {}),
    }));
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
          company: values.company.trim(),
          service_interest: values.service_interest || undefined,
          package_name: values.package_name || undefined,
          budget_range: values.budget_range || undefined,
          message: values.message.trim(),
          source: "quote_form",
          consent: true,
          honeypot: values.honeypot,
          ...readAttribution(),
        },
      });
      trackLeadConversion({ source: "quote_form", service: values.service_interest });
      setDone(true);
    } catch (error) {
      setSubmitError(friendlyError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-gold/50 bg-paper p-8 text-center md:p-12">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Cảm ơn bạn đã gửi yêu cầu!
        </h2>
        <span className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-gold-gradient" />
        <p className="mx-auto mt-5 max-w-md font-body text-[15px] leading-relaxed text-ink-soft/75">
          GMedia đã nhận được thông tin và sẽ liên hệ tư vấn cho bạn trong thời gian sớm nhất.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={BRAND.zaloUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            Chat Zalo
          </a>
          <Link to="/" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="quote-name"
          label="Họ và tên"
          required
          placeholder="Nguyễn Văn A"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
        />
        <FormField
          id="quote-phone"
          label="Số điện thoại"
          required
          type="tel"
          placeholder="0911 597 086"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
        <FormField
          id="quote-email"
          label="Email"
          type="email"
          placeholder="ban@congty.vn"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
        <FormField
          id="quote-company"
          label="Tên công ty"
          placeholder="Công ty TNHH ABC"
          value={values.company}
          onChange={update("company")}
        />
        <FormField
          id="quote-service"
          label="Dịch vụ quan tâm"
          type="select"
          placeholder="Chọn dịch vụ"
          options={SERVICE_OPTIONS}
          value={values.service_interest}
          onChange={update("service_interest")}
        />
        <FormField
          id="quote-package"
          label="Gói dịch vụ"
          type="select"
          placeholder={
            packageOptions.length > 0 ? "Chọn gói dịch vụ" : "Vui lòng chọn dịch vụ trước"
          }
          options={packageOptions}
          disabled={packageOptions.length === 0}
          value={values.package_name}
          onChange={update("package_name")}
        />
        <FormField
          id="quote-budget"
          label="Ngân sách dự kiến"
          type="select"
          placeholder="Chọn ngân sách"
          options={BUDGET_OPTIONS}
          value={values.budget_range}
          onChange={update("budget_range")}
          className="sm:col-span-2"
        />
      </div>

      <FormField
        id="quote-message"
        label="Nội dung yêu cầu"
        type="textarea"
        rows={5}
        placeholder="Mô tả ngắn về nhu cầu của bạn"
        value={values.message}
        onChange={update("message")}
      />

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="quote-honeypot">Website</label>
        <input
          id="quote-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <ConsentCheckbox
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        error={errors.consent}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" loading={submitting}>
          Gửi yêu cầu
        </Button>
        {submitError && <p className="font-body text-sm text-destructive">{submitError}</p>}
      </div>
    </form>
  );
}