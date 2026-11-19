import PageHero from "@/components/brand/PageHero";

export default function BlankPage({ label, title, description, breadcrumbs }) {
  return (
    <>
      <PageHero
        label={label}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="font-body text-sm text-ink-soft/45">
            Nội dung trang đang được hoàn thiện.
          </p>
        </div>
      </section>
    </>
  );
}