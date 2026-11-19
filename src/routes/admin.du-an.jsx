import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import Button from "@/components/brand/Button";
import ProjectDialog from "@/components/admin/ProjectDialog";
import ProjectTable from "@/components/admin/ProjectTable";
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

export const Route = createFileRoute("/admin/du-an")({
  ssr: false,
  head: () => ({ meta: [{ title: "Dự án | Quản trị GMedia" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    base44.entities.Project.list({ sort: "sort_order", limit: 200 })
      .then((page) => {
        if (alive) setProjects(page?.items ?? []);
      })
      .catch((err) => {
        if (alive) setError(err?.message ?? "Không tải được dự án.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [version]);

  const reload = () => setVersion((value) => value + 1);

  const handleSave = async (payload) => {
    const { id, ...data } = payload;
    if (id) await base44.entities.Project.update(id, data);
    else await base44.entities.Project.create(data);
    toast.success(id ? "Đã cập nhật dự án." : "Đã thêm dự án.");
    setDialogOpen(false);
    setEditing(null);
    reload();
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await base44.entities.Project.delete(pendingDelete.id);
      toast.success("Đã xóa dự án.");
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
          <h1 className="font-heading text-2xl font-semibold text-ink">Dự án</h1>
          <p className="mt-1 font-body text-sm text-ink-soft/60">
            {projects.length} dự án · {projects.filter((item) => item.is_featured).length} nổi bật
          </p>
        </div>
        <Button
          type="button"
          size="md"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Thêm dự án
        </Button>
      </header>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-line bg-paper shadow-luxe">
        <ProjectTable
          projects={projects}
          loading={loading}
          onEdit={(project) => {
            setEditing(project);
            setDialogOpen(true);
          }}
          onDelete={setPendingDelete}
        />
      </div>

      <ProjectDialog
        open={dialogOpen}
        project={editing}
        onClose={() => {
          setDialogOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa dự án?</AlertDialogTitle>
            <AlertDialogDescription>
              Dự án “{pendingDelete?.title}” sẽ bị xóa khỏi website và không thể khôi phục.
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