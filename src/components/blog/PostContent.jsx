export default function PostContent({ html }) {
  if (!html) {
    return (
      <p className="font-body text-[15px] leading-relaxed text-ink-soft/70">
        Nội dung bài viết đang được cập nhật.
      </p>
    );
  }

  return <div className="prose-gmedia" dangerouslySetInnerHTML={{ __html: html }} />;
}