import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/brand/SectionHeading";

export default function RelatedPosts({ posts }) {
  if (!posts.length) return null;

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="// BÀI VIẾT LIÊN QUAN" title="Có thể bạn quan tâm" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}