import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Cpu, Headphones, HeartHandshake, LayoutTemplate, Maximize2, Rocket, ShieldCheck, Users, Wallet } from "lucide-react";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import ServiceCard from "@/components/brand/ServiceCard";
import CTABanner from "@/components/brand/CTABanner";

export const Route = createFileRoute("/giai-phap")({
  head: () => ({ meta: [{ title: "Giải pháp | GMedia" }] }),
  component: SolutionsPage,
});

const COMMITMENTS = [
  {
    icon: Cpu,
    title: "Công nghệ tối ưu",
    description:
      "Chúng tôi không ngừng nghiên cứu và phát triển các công nghệ hiện đại nhất để cung cấp cho người dùng những sản phẩm tối ưu nhất.",
  },
  {
    icon: Users,
    title: "Nhân sự chuyên nghiệp",
    description:
      "Với hơn 10 năm tham gia hoạt động, GMedia luôn hướng tới đội ngũ nhân sự năng động và sáng tạo, cùng dịch vụ chuyên nghiệp.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo mật thông tin",
    description:
      "Thông tin của Quý khách hàng luôn được đảm bảo an toàn. Chúng tôi cam kết không chia sẻ tài nguyên của Quý khách hàng cho bất cứ bên thứ ba nào.",
  },
  {
    icon: Rocket,
    title: "Triển khai nhanh chóng",
    description:
      "Luôn vì quyền lợi khách hàng, chúng tôi triển khai nhanh chóng các dịch vụ khi được tiếp nhận yêu cầu, không để khách hàng phải đợi lâu.",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ hỗ trợ kỹ thuật trực tuyến 24/7 luôn sẵn sàng giải quyết thắc mắc và sự cố mà khách hàng gặp phải, kể cả ngày nghỉ, lễ và Tết.",
  },
  {
    icon: HeartHandshake,
    title: "Hậu mãi dài lâu",
    description:
      "Xây dựng chính sách bán hàng hướng tới lợi ích của Khách hàng, cùng hàng loạt chương trình tri ân, khuyến mãi sau bán hàng.",
  },
];

const STRENGTHS = [
  {
    icon: LayoutTemplate,
    title: "GIAO DIỆN ĐỘC QUYỀN",
    description:
      "Giao diện của riêng bạn. Chúng tôi cam kết không bán lại hoặc kinh doanh giao diện website từ ý tưởng của bạn.",
  },
  {
    icon: Cpu,
    title: "CÔNG NGHỆ TỐI ƯU",
    description:
      "Lập trình trên nền tảng WordPress và Opencart, tối ưu cho độ ổn định và bảo mật cao nhất, tương thích mọi thiết bị.",
  },
  {
    icon: BadgeCheck,
    title: "SỞ HỮU TRÍ TUỆ",
    description:
      "Sau khi bàn giao bạn có toàn quyền chỉnh sửa thay đổi nội dung và tải xuống mã nguồn của website.",
  },
  {
    icon: Maximize2,
    title: "DỄ DÀNG MỞ RỘNG",
    description:
      "Hệ thống Website dễ dàng mở rộng, thêm các chức năng mới một cách linh hoạt khi doanh nghiệp có nhu cầu.",
  },
  {
    icon: Award,
    title: "UY TÍN LÀM NÊN THƯƠNG HIỆU",
    description:
      "Với 10 năm kinh nghiệm và hơn 150 dự án đã triển khai, GMedia tự tin mang đến dịch vụ thiết kế Website tốt nhất.",
  },
  {
    icon: Wallet,
    title: "CHI PHÍ HỢP LÝ",
    description:
      "Sở hữu trang web chuyên nghiệp, sang trọng mang đậm dấu ấn thương hiệu riêng với ngân sách mong muốn.",
  },
];

function SolutionsPage() {
  return (
    <>
      <PageHero label="// GIẢI PHÁP" title="Giải pháp" />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            label="CHUYÊN NGHIỆP - HIỆN ĐẠI - CÔNG NGHỆ MỚI"
            title="GMEDIA CUNG CẤP GIẢI PHÁP WEBSITE"
            description="GMedia là thương hiệu của Công ty TNHH Công nghệ G Media, hoạt động chuyên về lĩnh vực thiết kế website và giải pháp Digital Marketing."
          />
          <p className="mt-6 text-center font-heading text-sm font-semibold uppercase tracking-[0.15em] text-gold-dark">
            GMEDIA AGENCY: Thiết kế tối ưu, Nhanh chóng, chi phí hợp lý.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((item) => (
              <ServiceCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
            Dịch vụ Thiết kế Website theo yêu cầu
          </h2>
          <span className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-gold-gradient" />
          <p className="mt-6 font-heading text-lg font-semibold text-gold-light md:text-xl">
            “Sự khác biệt làm nên sự thành công của thương hiệu.”
          </p>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-white/70">
            Chúng tôi mong muốn đồng hành cùng các doanh nghiệp trong việc triển khai và phát triển
            website một cách hiệu quả với chi phí hợp lý nhất. Website với ý tưởng riêng của bạn cùng
            với công nghệ của GMedia, đồ họa thiết kế chỉn chu, chuyên nghiệp sẽ gây ấn tượng mạnh
            mẽ, thuyết phục khách hàng hơn nữa.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading align="center" label="// ĐIỂM MẠNH" title="Vì sao chọn GMedia" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STRENGTHS.map((item) => (
              <div key={item.title} className="rounded-xl border border-line bg-paper p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/60 text-gold-dark">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-heading text-sm font-semibold tracking-[0.08em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Cùng bạn kiến tạo thành công"
        description="Chia sẻ ý tưởng website của bạn, GMedia sẽ tư vấn giải pháp phù hợp nhất."
      />
    </>
  );
}