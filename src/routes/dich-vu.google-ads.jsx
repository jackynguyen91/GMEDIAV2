import { createFileRoute } from "@tanstack/react-router";
import AdsServicePage from "@/components/services/AdsServicePage";
import { listServicePackages } from "@/lib/server-fns";

export const Route = createFileRoute("/dich-vu/google-ads")({
  loader: () => listServicePackages({ data: { serviceKey: "google_ads" } }),
  head: () => ({ meta: [{ title: "Dịch vụ Google Ads | GMedia" }] }),
  component: GoogleAdsPage,
});

function GoogleAdsPage() {
  const packages = Route.useLoaderData();

  return (
    <AdsServicePage
      title="Dịch vụ Google Ads"
      description="GMedia cung cấp dịch vụ trọn gói cho các chiến dịch quảng cáo Google Ads giúp doanh nghiệp của bạn tiếp cận khách hàng tiềm năng, tăng doanh số bán hàng và nâng cao nhận diện thương hiệu."
      serviceParam="google-ads"
      packages={packages}
    />
  );
}