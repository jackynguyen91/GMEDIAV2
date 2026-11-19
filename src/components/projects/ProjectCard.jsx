import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function ProjectCard({ project }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={`Ảnh dự án ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-heading text-[11px] uppercase tracking-[0.25em] text-ink-soft/30">
            GMedia
          </div>
        )}
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
            {project.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-base font-semibold leading-snug text-ink">
            {project.title}
          </h3>
          {project.project_url && (
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
        </div>
        {project.description && (
          <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-ink-soft/70">
            {project.description}
          </p>
        )}
        {project.project_url && (
          <span className="mt-auto pt-4 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            Xem dự án
          </span>
        )}
      </div>
    </>
  );

  if (project.project_url) {
    return (
      <a
        href={project.project_url}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper transition-shadow duration-300 hover:shadow-luxe-lg"
      >
        {body}
      </a>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper">
      {body}
    </div>
  );
}