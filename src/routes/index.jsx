import { createFileRoute } from "@tanstack/react-router";
import HeroCarousel from "@/components/home/HeroCarousel";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import SalesBanner from "@/components/home/SalesBanner";
import ProjectsSection from "@/components/home/ProjectsSection";
import CTABanner from "@/components/brand/CTABanner";
import { BRAND } from "@/lib/brand";
import { listFeaturedProjects } from "@/lib/content-fns";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: () => listFeaturedProjects(),
  head: () =>
    pageHead({
      title: "Trang chủ",
      description:
        "GMedia chuyên cung cấp giải pháp - dịch vụ về thiết kế Website chuyên nghiệp, chuẩn SEO với chi phí phù hợp cho doanh nghiệp.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  const projects = Route.useLoaderData();

  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <ServicesSection />
      <SalesBanner />
      <ProjectsSection projects={projects} />
      <CTABanner
        title="Cùng bạn kiến tạo thành công"
        ctaLabel="Tư vấn và Báo giá"
        ctaHref="/bao-gia"
        secondaryLabel="Chat Zalo"
        secondaryHref={BRAND.zaloUrl}
      />
    </>
  );
}