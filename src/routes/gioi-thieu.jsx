import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/brand/PageHero";
import SectionHeading from "@/components/brand/SectionHeading";
import CTABanner from "@/components/brand/CTABanner";
import CompanyInfoCard from "@/components/info/CompanyInfoCard";

export const Route = createFileRoute("/gioi-thieu")({
  head: () => ({ meta: [{ title: "Giới thiệu | GMedia - Tech Your Life" }] }),
  component: AboutPage,
});

const PARALLEL = [
  {
    title: "Đồng hành cùng Khách Hàng",
    text: "Với phương châm: Cùng bạn kiến tạo thành công, GMedia luôn đồng hành và phát triển doanh nghiệp của khách hàng từng bước trên con đường chinh phục những nấc thang mới. Với đội ngũ chuyên viên giàu kinh nghiệm và công nghệ tiên tiến, chúng tôi sẽ xây dựng chiến lược Digital Marketing phù hợp nhất với nhu cầu và mục tiêu của doanh nghiệp.",
  },
  {
    title: "Đồng hành cùng Nhân Viên",
    text: "Chúng tôi luôn coi trọng việc đào tạo nhân sự, tạo ra một môi trường năng động, kích thích sự sáng tạo và phát triển toàn diện, vượt trội cho từng thành viên. GMedia luôn xem mỗi đồng nghiệp là một Nhân Tài và là Đồng Đội của nhau.",
  },
];

const MISSIONS = [
  "Mang đến cho khách hàng những website chất lượng cao: GMedia cam kết thiết kế website theo yêu cầu riêng của khách hàng, đảm bảo tính thẩm mỹ, hiệu quả thu hút và tối ưu hóa cho mọi thiết bị.",
  "Cung cấp dịch vụ chuyên nghiệp: GMedia luôn lắng nghe nhu cầu của khách hàng, tư vấn tận tình và hỗ trợ khách hàng 24/7.",
  "Đóng góp cho sự phát triển của cộng đồng: GMedia tham gia các hoạt động xã hội, chia sẻ kiến thức về thiết kế website và hỗ trợ các doanh nghiệp khởi nghiệp.",
];

function AboutPage() {
  return (
    <>
      <PageHero label="// VỀ GMEDIA" title="Giới thiệu" />

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-body text-[15px] leading-relaxed text-ink-soft/80">
            GMedia Solutions đơn vị triển khai tư vấn Thiết Kế Website - Branding - Website chuẩn
            SEO chuyên nghiệp. Với phương châm: Cùng bạn kiến tạo thành công. GMedia cùng bạn đưa ra
            giải pháp phù hợp với định hướng phát triển của Công Ty.
          </p>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-ink-soft/80">
            Với hơn 10 năm kinh nghiệm trong lĩnh vực cung cấp giải pháp Digital Marketing và Tư vấn
            thiết kế Website chuyên nghiệp, cùng hơn 150 dự án đã triển khai, chúng tôi mang đến cho
            bạn giải pháp Website chuẩn SEO, tương thích với các thiết bị di động với chi phí phù hợp.
          </p>

          <p className="mt-10 border-l-2 border-gold pl-5 font-heading text-xl font-semibold leading-snug text-ink md:text-2xl">
            Phương châm của chúng tôi: Cùng bạn kiến tạo thành công
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {PARALLEL.map((block) => (
            <div key={block.title} className="rounded-xl border border-line bg-paper p-6 md:p-8">
              <h2 className="font-heading text-xl font-semibold text-ink">{block.title}</h2>
              <span className="mt-4 block h-[2px] w-12 bg-gold-gradient" />
              <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft/75">
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            label="// TẦM NHÌN - SỨ MỆNH"
            title="Tầm nhìn và Sứ mệnh của GMedia"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-cream/60 p-6 md:p-8">
              <h3 className="font-heading text-lg font-semibold text-ink">Tầm nhìn</h3>
              <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft/75">
                Trở thành công ty thiết kế website hàng đầu Việt Nam, cung cấp các giải pháp website
                sáng tạo, hiệu quả, giúp khách hàng nâng tầm thương hiệu và gia tăng lợi thế cạnh
                tranh.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-cream/60 p-6 md:p-8">
              <h3 className="font-heading text-lg font-semibold text-ink">Sứ mệnh</h3>
              <ol className="mt-4 space-y-4">
                {MISSIONS.map((mission, index) => (
                  <li key={mission} className="flex gap-3">
                    <span className="font-heading text-lg font-semibold text-gold-dark">
                      {index + 1}.
                    </span>
                    <span className="font-body text-[15px] leading-relaxed text-ink-soft/75">
                      {mission}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <CompanyInfoCard />
        </div>
      </section>

      <CTABanner
        title="Cùng bạn kiến tạo thành công"
        description="Liên hệ GMedia để được tư vấn giải pháp website và Digital Marketing phù hợp với doanh nghiệp của bạn."
      />
    </>
  );
}