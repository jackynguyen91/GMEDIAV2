import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import CTABanner from "@/components/brand/CTABanner";
import JobCard from "@/components/careers/JobCard";
import ApplyForm from "@/components/forms/ApplyForm";
import { JOB_LOCATION, JOB_OPENINGS } from "@/lib/jobs";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/tuyen-dung")({
  head: () => ({ meta: [{ title: "Tuyển dụng | GMedia" }] }),
  component: CareersPage,
});

function CareersPage() {
  const [position, setPosition] = useState("");
  const formRef = useRef(null);

  const handleApply = (id) => {
    setPosition(id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero label="// TUYỂN DỤNG" title="Tuyển dụng" />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-xl font-semibold text-ink">Đồng hành cùng Nhân Viên</h2>
          <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft/75">
            Chúng tôi luôn coi trọng việc đào tạo nhân sự, tạo ra một môi trường năng động, kích
            thích sự sáng tạo và phát triển toàn diện, vượt trội cho từng thành viên. GMedia luôn xem
            mỗi đồng nghiệp là một Nhân Tài và là Đồng Đội của nhau.
          </p>
          <p className="mt-3 font-body text-sm text-ink-soft/60">
            Địa điểm làm việc: {JOB_LOCATION}
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Vị trí đang tuyển dụng"
            description="GMedia đang mở 4 vị trí cho đội ngũ thiết kế, nội dung và kinh doanh. Chọn vị trí phù hợp và gửi hồ sơ ngay bên dưới."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {JOB_OPENINGS.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        </div>
      </section>

      <section id="ung-tuyen" ref={formRef} className="scroll-mt-28 bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            label="// ỨNG TUYỂN"
            title="Gửi hồ sơ cho GMedia"
            description="Điền thông tin bên dưới, đội ngũ tuyển dụng sẽ phản hồi trong 3 ngày làm việc."
          />

          <div className="mt-8 rounded-xl border border-line bg-paper p-6 md:p-8">
            <ApplyForm
              positions={JOB_OPENINGS}
              defaultPosition={position}
            />
          </div>

          <p className="mt-6 font-body text-sm text-ink-soft/70">
            Hoặc gửi CV trực tiếp về{" "}
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent("Ứng tuyển GMedia")}`}
              className="font-semibold text-gold-dark transition-colors hover:text-ink"
            >
              {BRAND.email}
            </a>
            . Hotline:{" "}
            <a href={`tel:${BRAND.hotlineTel}`} className="font-semibold text-gold-dark">
              {BRAND.hotline}
            </a>
            .
          </p>
        </div>
      </section>

      <CTABanner
        title="Bạn muốn gia nhập GMedia?"
        description="Gửi hồ sơ cho chúng tôi, đội ngũ GMedia sẽ liên hệ với bạn khi có vị trí phù hợp."
        ctaLabel="Liên hệ GMedia"
        ctaHref="/lien-he"
      />
    </>
  );
}