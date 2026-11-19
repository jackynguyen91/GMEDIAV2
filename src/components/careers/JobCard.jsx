import { ArrowRight, Briefcase, MapPin, Wallet } from "lucide-react";
import { buttonVariants } from "@/components/brand/Button";
import { JOB_LOCATION } from "@/lib/jobs";

export default function JobCard({ job, onApply }) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-paper p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-cream px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
          {job.type}
        </span>
        <span className="rounded-full border border-line px-3 py-1 font-body text-[11px] text-ink-soft/70">
          {job.quantity}
        </span>
      </div>

      <h3 className="mt-4 font-heading text-lg font-semibold text-ink md:text-xl">{job.title}</h3>
      <p className="mt-2 font-body text-[14px] leading-relaxed text-ink-soft/75">{job.summary}</p>

      <ul className="mt-4 flex flex-col gap-2 font-body text-[14px] text-ink-soft/80">
        <li className="flex items-start gap-2">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
          <span>{job.salary}</span>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
          <span>{JOB_LOCATION}</span>
        </li>
        <li className="flex items-start gap-2">
          <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
          <span>{job.requirements[0]}</span>
        </li>
      </ul>

      <button
        type="button"
        onClick={() => onApply(job.id)}
        className={buttonVariants({ variant: "secondary", className: "mt-6 w-full" })}
      >
        Ứng tuyển vị trí này
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  );
}