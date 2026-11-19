import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import Button from "@/components/brand/Button";
import PostTable from "@/components/admin/PostTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/bai-viet/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Bài viết | Quản trị GMedia" }] }),
  component: PostsPage,
});

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    base44.entities.BlogPost.list({ sort: "-created_date", limit: 200 })
      .then((page) => {
        if (alive) setPosts(page?.items ?? []);
      })
      .catch((err) => {
        if (alive) setError(err?.message ?? "Không tải được bài viết.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [version]);

  const reload = () => setVersion((value) => value + 1);

  const handleTogglePublish = async (post) => {
    const next = !post.is_published;
    try {
      await base44.entities.BlogPost.update(post.id, {
        is_published: next,
        published_at: next ? post.published_at || new Date().toISOString() : post.published_at || "",
      });
      toast.success(next ? "Đã xuất bản bài viết." : "Đã chuyển bài viết về nháp.");
      reload();
    } catch (err) {
      toast.error(err?.message ?? "Cập nhật thất bại.");
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await base44.entities.BlogPost.delete(pendingDelete.id);
      toast.success("Đã xóa bài viết.");
      setPendingDelete(null);
      reload();
    } catch (err) {
      toast.error(err?.message ?? "Xóa thất bại.");
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Bài viết</h1>
          <p className="mt-1 font-body text-sm text-ink-soft/60">
            {posts.length} bài viết · {posts.filter((post) => post.is_published).length} đã xuất bản
          </p>
        </div>
        <Link to="/admin/bai-viet/$postId" params={{ postId: "moi" }}>
          <Button type="button" size="md">
            <Plus className="h-4 w-4" />
            Viết bài mới
          </Button>
        </Link>
      </header>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-line bg-paper shadow-luxe">
        <PostTable
          posts={posts}
          loading={loading}
          onTogglePublish={handleTogglePublish}
          onDelete={setPendingDelete}
        />
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa bài viết?</AlertDialogTitle>
            <AlertDialogDescription>
              Bài viết “{pendingDelete?.title}” sẽ bị xóa vĩnh viễn và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}