import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import PostEditorForm from "@/components/admin/PostEditorForm";

export const Route = createFileRoute("/admin/bai-viet/$postId")({
  ssr: false,
  head: () => ({ meta: [{ title: "Soạn bài viết | Quản trị GMedia" }] }),
  component: PostEditorPage,
});

function PostEditorPage() {
  const { postId } = Route.useParams();

  return (
    <div className="space-y-5">
      <Link
        to="/admin/bai-viet"
        className="inline-flex items-center gap-2 font-body text-xs text-ink-soft/60 transition-colors hover:text-gold-dark"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Danh sách bài viết
      </Link>
      <h1 className="font-heading text-2xl font-semibold text-ink">
        {postId === "moi" ? "Bài viết mới" : "Sửa bài viết"}
      </h1>
      <PostEditorForm postId={postId} />
    </div>
  );
}