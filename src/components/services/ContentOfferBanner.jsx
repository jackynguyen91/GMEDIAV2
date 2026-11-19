const OFFERS = [
  {
    title: "Viết bài chuẩn SEO",
    text: "Với nhiều năm kinh nghiệm, GMedia lên bài viết chuẩn SEO từng ngành hàng cụ thể sẽ giúp website của bạn đạt thứ hạng cao trên các công cụ tìm kiếm.",
  },
  {
    title: "Viết bài quảng cáo",
    text: "GMedia sản xuất nội dung phù hợp với chiến dịch quảng cáo của bạn thu hút để giúp bạn quảng bá sản phẩm, dịch vụ của mình đến khách hàng tiềm năng.",
  },
  {
    title: "Viết content mạng xã hội",
    text: "GMedia lên kế hoạch chi tiết cho nội dung content phù hợp để bắt kịp xu hướng của mạng xã hội và thu hút để giúp bạn quảng bá thương hiệu của mình trên các mạng xã hội như Facebook, Instagram,...",
  },
  {
    title: "Viết bài viết blog",
    text: "GMedia lên kế hoạch cụ thể theo từng tuyến bài viết phù hợp với blog cho website của bạn về bất kỳ chủ đề nào bạn mong muốn.",
  },
];

export default function ContentOfferBanner() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_15%_0%,rgba(201,162,77,0.16)_0%,rgba(26,26,26,0)_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
        <h2 className="max-w-3xl font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
          NHẬN NGAY ƯU ĐÃI KHI ĐẶT DỊCH VỤ CONTENT WEBSITE
        </h2>
        <span className="mt-5 block h-[3px] w-12 rounded-full bg-gold-gradient" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="font-heading text-base font-semibold text-gold-light">
                {offer.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/70">{offer.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}