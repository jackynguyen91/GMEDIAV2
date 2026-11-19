import {
  Code2,
  HeartHandshake,
  LayoutTemplate,
  Lightbulb,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import SectionHeading from "@/components/brand/SectionHeading";
import ServiceCard from "@/components/brand/ServiceCard";

const SERVICES = [
  {
    icon: Code2,
    title: "Website Design",
    description:
      "Chúng tôi không chỉ có kỹ năng viết mã tốt. Kinh nghiệm của chúng tôi nổi bật với so với các nhà phát triển website khác. Chúng tôi có đội ngũ nhân viên chuyên nghiệp, giàu kinh nghiệm và am hiểu về các công nghệ web mới nhất.",
    to: "/dich-vu/thiet-ke-website",
  },
  {
    icon: LayoutTemplate,
    title: "Thiết kế giao diện UX/UI",
    description:
      "Xây dựng sản phẩm bạn cần đúng thời hạn với đội ngũ giàu kinh nghiệm sử dụng quy trình thiết kế rõ ràng và hiệu quả.",
    to: "/dich-vu/thiet-ke-website",
  },
  {
    icon: ShieldCheck,
    title: "Kiểm thử QA",
    description:
      "Chúng tôi sẽ nhờ các chuyên gia trong ngành thực hiện kiểm tra và đánh giá toàn diện, nhiều giai đoạn đối với website và phần mềm của bạn.",
    to: "/dich-vu/thiet-ke-website",
  },
  {
    icon: Lightbulb,
    title: "Tư vấn kỹ thuật",
    description:
      "Chúng tôi với kinh nghiệm lâu năm sẽ tư vấn chi tiết những kỹ thuật để Khách hàng có thể an tâm khi sử dụng sản phẩm.",
    to: "/dich-vu",
  },
  {
    icon: HeartHandshake,
    title: "Đội ngũ tận tâm",
    description:
      "Với hơn 10 năm tham gia hoạt động, GMedia luôn hướng tới đội ngũ nhân sự năng động và sáng tạo, cùng dịch vụ chuyên nghiệp.",
    to: "/gioi-thieu",
  },
  {
    icon: Smartphone,
    title: "Phát triển WebApp - MobileApp",
    description:
      "Tạo phần mềm doanh nghiệp phức tạp, đảm bảo tích hợp phần mềm đáng tin cậy, hiện đại hóa hệ thống kế thừa của bạn.",
    to: "/giai-phap",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="// DỊCH VỤ TẠI GMEDIA"
          title="GIẢI PHÁP WEBSITE - APP MOBILE CHUYÊN NGHIỆP"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              to={service.to}
            />
          ))}
        </div>
      </div>
    </section>
  );
}