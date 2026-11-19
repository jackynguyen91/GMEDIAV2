import { createFileRoute } from "@tanstack/react-router";
import AdsServicePage from "@/components/services/AdsServicePage";
import { listServicePackages } from "@/lib/server-fns";

export const Route = createFileRoute("/dich-vu/facebook-ads")({
  loader: () => listServicePackages({ data: { serviceKey: "facebook_ads" } }),
  head: () => ({ meta: [{ title: "Dịch vụ Facebook Ads | GMedia" }] }),
  component: FacebookAdsPage,
});

function FacebookAdsPage() {
  const packages = Route.useLoaderData();

  return (
    <AdsServicePage
      title="Dịch vụ Facebook Ads"
      description="GMedia cung cấp dịch vụ trọn gói cho các chiến dịch quảng cáo Facebook Ads giúp doanh nghiệp của bạn tiếp cận khách hàng tiềm năng, tăng doanh số bán hàng và nâng cao nhận diện thương hiệu."
      serviceParam="facebook-ads"
      packages={packages}
    />
  );
}