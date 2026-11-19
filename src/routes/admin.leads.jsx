import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import LeadDrawer from "@/components/admin/LeadDrawer";
import LeadFilters from "@/components/admin/LeadFilters";
import LeadTable from "@/components/admin/LeadTable";
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
import { downloadExcel } from "@/lib/leadExcel";

export const Route = createFileRoute("/admin/leads")({
  ssr: false,
  head: () => ({ meta: [{ title: "Lead | Quản trị GMedia" }] }),
  component: LeadsPage,
});

const EMPTY_FILTERS = { search: "", status: "", service: "", source: "", from: "", to: "" };
const PAGE_SIZE = 20;

function buildQuery(filters) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.service) query.service_interest = filters.service;
  if (filters.source) query.source = filters.source;
  if (filters.from || filters.to) {
    const created = {};
    if (filters.from) created.$gte = new Date(`${filters.from}T00:00:00+07:00`).toISOString();
    if (filters.to) created.$lte = new Date(`${filters.to}T23:59:59+07:00`).toISOString();
    query.created_date = created;
  }
  const term = filters.search.trim();
  if (term) {
    query.$or = [{ full_name: { $regex: term, $options: "i" } }, { phone: { $regex: term } }];
  }
  return query;
}

function LeadsPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [cursorStack, setCursorStack] = useState([undefined]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    setPage(0);
    setCursorStack([undefined]);
  }, [filters.status, filters.service, filters.source, filters.from, filters.to, search]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    const query = buildQuery({ ...filters, search });
    const cursor = cursorStack[page];

    Promise.all([
      base44.entities.Lead.filter(query, { sort: "-created_date", limit: PAGE_SIZE, cursor }),
      base44.entities.Lead.count(query),
    ])
      .then(([result, count]) => {
        if (!alive) return;
        setRows(result?.items ?? []);
        setNextCursor(result?.next_cursor ?? null);
        setTotal(count ?? 0);
      })
      .catch((err) => {
        if (alive) setError(err?.message ?? "Không tải được danh sách lead.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [filters, search, page, cursorStack, version]);

  const handleUpdated = useCallback(async (patch) => {
    if (!selected) return;
    try {
      await base44.entities.Lead.update(selected.id, patch);
      setSelected((current) => (current ? { ...current, ...patch } : current));
      setRows((current) =>
        current.map((row) => (row.id === selected.id ? { ...row, ...patch } : row))
      );
      if (patch.status) toast.success("Đã cập nhật trạng thái lead.");
    } catch (err) {
      toast.error(err?.message ?? "Cập nhật thất bại.");
    }
  }, [selected]);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await base44.entities.Lead.delete(pendingDelete.id);
      toast.success("Đã xóa lead.");
      if (selected?.id === pendingDelete.id) setSelected(null);
      setPendingDelete(null);
      setVersion((value) => value + 1);
    } catch (err) {
      toast.error(err?.message ?? "Xóa thất bại.");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const query = buildQuery({ ...filters, search });
      const all = [];
      let cursor;
      for (let index = 0; index < 20; index += 1) {
        const result = await base44.entities.Lead.filter(query, {
          sort: "-created_date",
          limit: 100,
          cursor,
        });
        all.push(...(result?.items ?? []));
        if (!result?.has_more || !result?.next_cursor) break;
        cursor = result.next_cursor;
      }
      if (!all.length) {
        toast.info("Không có lead nào để xuất.");
        return;
      }
      downloadExcel(all, `gmedia-lead-${new Date().toISOString().slice(0, 10)}.xls`);
      toast.success(`Đã xuất ${all.length} lead ra Excel.`);
    } catch (err) {
      toast.error(err?.message ?? "Xuất Excel thất bại.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-w-0 max-w-full space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Lead</h1>
          <p className="mt-1 font-body text-sm text-ink-soft/60">
            {total} lead theo bộ lọc hiện tại.
          </p>
        </div>
      </header>

      <LeadFilters
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
        onExport={handleExport}
        exporting={exporting}
      />

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="min-w-0 max-w-full rounded-xl border border-line bg-paper shadow-luxe">
        <LeadTable
          leads={rows}
          loading={loading}
          selectedId={selected?.id}
          onSelect={setSelected}
          onDelete={setPendingDelete}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
          <p className="font-body text-xs text-ink-soft/55">
            Trang {page + 1} · {rows.length} dòng mỗi trang
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0 || loading}
              className="rounded-xl border border-line px-3 py-1.5 font-body text-xs text-ink transition-colors hover:border-gold disabled:opacity-40"
            >
              Trước
            </button>
            <button
              type="button"
              onClick={() => {
                if (!nextCursor) return;
                setCursorStack((current) => {
                  const copy = [...current];
                  copy[page + 1] = nextCursor;
                  return copy;
                });
                setPage((current) => current + 1);
              }}
              disabled={!nextCursor || loading}
              className="rounded-xl border border-line px-3 py-1.5 font-body text-xs text-ink transition-colors hover:border-gold disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleUpdated}
          onDeleteRequest={setPendingDelete}
        />
      )}

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa lead này?</AlertDialogTitle>
            <AlertDialogDescription>
              Lead của {pendingDelete?.full_name} ({pendingDelete?.phone}) sẽ bị xóa vĩnh viễn và
              không thể khôi phục.
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