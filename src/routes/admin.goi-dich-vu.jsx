import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import Button from "@/components/brand/Button";
import PackageDialog from "@/components/admin/PackageDialog";
import PackageTable from "@/components/admin/PackageTable";
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

export const Route = createFileRoute("/admin/goi-dich-vu")({
  ssr: false,
  head: () => ({ meta: [{ title: "Gói dịch vụ | Quản trị GMedia" }] }),
  component: PackagesPage,
});

function PackagesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    base44.entities.ServicePackage.list({ sort: "sort_order", limit: 200 })
      .then((page) => {
        if (alive) setItems(page?.items ?? []);
      })
      .catch((err) => {
        if (alive) setError(err?.message ?? "Không tải được gói dịch vụ.");
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
    if (id) await base44.entities.ServicePackage.update(id, data);
    else await base44.entities.ServicePackage.create(data);
    toast.success(id ? "Đã cập nhật gói dịch vụ." : "Đã thêm gói dịch vụ.");
    setDialogOpen(false);
    setEditing(null);
    reload();
  };

  const handleToggle = async (item, field) => {
    const nextValue = !item[field];
    setItems((current) =>
      current.map((row) => (row.id === item.id ? { ...row, [field]: nextValue } : row))
    );
    try {
      await base44.entities.ServicePackage.update(item.id, { [field]: nextValue });
      toast.success(
        field === "is_active"
          ? nextValue
            ? "Gói đã hiển thị trên website."
            : "Gói đã được ẩn khỏi website."
          : nextValue
            ? "Đã bật nhãn nổi bật."
            : "Đã tắt nhãn nổi bật."
      );
    } catch (err) {
      toast.error(err?.message ?? "Cập nhật thất bại.");
      reload();
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    const withOrder = reordered.map((item, index) => ({ ...item, sort_order: index + 1 }));
    setItems(withOrder);
    try {
      await base44.entities.ServicePackage.bulkUpdate(
        withOrder.map((item) => ({ id: item.id, sort_order: item.sort_order }))
      );
      toast.success("Đã cập nhật thứ tự gói.");
    } catch (err) {
      toast.error(err?.message ?? "Đổi thứ tự thất bại.");
      reload();
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await base44.entities.ServicePackage.delete(pendingDelete.id);
      toast.success("Đã xóa gói dịch vụ.");
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
          <h1 className="font-heading text-2xl font-semibold text-ink">Gói dịch vụ</h1>
          <p className="mt-1 font-body text-sm text-ink-soft/60">
            Kéo thả để đổi thứ tự. Thay đổi áp dụng ngay trên trang công khai.
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
          Thêm gói
        </Button>
      </header>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-line bg-paper shadow-luxe">
        <PackageTable
          items={items}
          loading={loading}
          onDragEnd={handleDragEnd}
          onEdit={(pkg) => {
            setEditing(pkg);
            setDialogOpen(true);
          }}
          onToggle={handleToggle}
          onDelete={setPendingDelete}
        />
      </div>

      <PackageDialog
        open={dialogOpen}
        pkg={editing}
        onClose={() => {
          setDialogOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa gói dịch vụ?</AlertDialogTitle>
            <AlertDialogDescription>
              Gói “{pendingDelete?.name}” sẽ bị xóa khỏi website. Nếu chỉ muốn tạm ẩn, hãy tắt công
              tắc Hiển thị.
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