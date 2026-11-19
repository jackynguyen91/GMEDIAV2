import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/brand/SectionHeading";
import { Image } from "@/components/ui/image";

export default function ProjectsSection({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="// DỰ ÁN NỔI BẬT"
          title="Dự án thực hiện của chúng tôi"
          titleClassName="italic"
          description="Với đội ngũ nhân viên sáng tạo, nhiệt huyết và giàu kinh nghiệm, GMedia cam kết mang đến cho khách hàng những giải pháp website tối ưu, hiệu quả, giúp khách hàng nâng tầm thương hiệu và tăng cường hiệu quả kinh doanh."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const card = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.cover_image}
                    alt={`Ảnh dự án ${project.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {project.category && (
                    <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                      {project.category}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-xl bg-gold-gradient px-5 py-2.5 font-heading text-sm font-semibold text-ink">
                      Xem dự án
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <h3 className="font-heading text-base font-semibold text-ink">{project.title}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </>
            );

            const className =
              "group block overflow-hidden rounded-xl border border-line bg-paper transition-shadow duration-300 hover:shadow-luxe-lg";

            return project.project_url ? (
              <a
                key={project.id}
                href={project.project_url}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {card}
              </a>
            ) : (
              <Link key={project.id} to="/du-an" className={className}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}