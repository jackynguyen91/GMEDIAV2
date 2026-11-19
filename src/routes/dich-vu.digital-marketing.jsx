import { createFileRoute } from "@tanstack/react-router";
import AdsServicePage from "@/components/services/AdsServicePage";
import { listServicePackages } from "@/lib/server-fns";

export const Route = createFileRoute("/dich-vu/digital-marketing")({
  loader: () => listServicePackages({ data: { serviceKey: "digital_marketing" } }),
  head: () => ({ meta: [{ title: "Digital Marketing | GMedia" }] }),
  component: DigitalMarketingPage,
});

function DigitalMarketingPage() {
  const packages = Route.useLoaderData();

  return (
    <AdsServicePage
      title="Digital Marketing"
      description="GMedia cung cấp dịch vụ trọn gói cho các chiến dịch quảng cáo Google Ads và Facebook Ads, Zalo OA, Tiktok Shop, v.v., giúp doanh nghiệp của bạn tiếp cận khách hàng tiềm năng, tăng doanh số bán hàng và nâng cao nhận diện thương hiệu."
      serviceParam="digital-marketing"
      packages={packages}
    />
  );
}