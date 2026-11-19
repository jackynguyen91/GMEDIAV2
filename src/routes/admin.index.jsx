import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import KpiCard from "@/components/admin/KpiCard";
import LeadBarChart from "@/components/admin/LeadBarChart";
import LeadPieChart from "@/components/admin/LeadPieChart";
import RecentLeadsTable from "@/components/admin/RecentLeadsTable";
import { SERVICE_OPTIONS } from "@/lib/leadOptions";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Tổng quan | Quản trị GMedia" }] }),
  component: OverviewPage,
});

const DAY_MS = 86400000;
const DAY_KEY = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });

function buildDaySeries(rows) {
  const counts = new Map();
  rows.forEach((row) => {
    const raw = row.date ?? row.created_date ?? row.day ?? row._id;
    const key = typeof raw === "string" ? raw.slice(0, 10) : "";
    if (key) counts.set(key, (counts.get(key) ?? 0) + (row.count ?? 0));
  });

  return Array.from({ length: 30 }, (_, index) => {
    const key = DAY_KEY.format(new Date(Date.now() - (29 - index) * DAY_MS));
    return {
      label: `${key.slice(8, 10)}/${key.slice(5, 7)}`,
      count: counts.get(key) ?? 0,
    };
  });
}

function OverviewPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    const Lead = base44.entities.Lead;

    (async () => {
      const todayKey = DAY_KEY.format(new Date());
      const todayStart = new Date(`${todayKey}T00:00:00+07:00`).toISOString();
      const weekStart = new Date(new Date(`${todayKey}T00:00:00+07:00`).getTime() - 6 * DAY_MS).toISOString();
      const monthStart = new Date(`${todayKey.slice(0, 7)}-01T00:00:00+07:00`).toISOString();

      const [today, week, month, total, won, barRows, pieRows, recent] = await Promise.all([
        Lead.count({ created_date: { $gte: todayStart } }),
        Lead.count({ created_date: { $gte: weekStart } }),
        Lead.count({ created_date: { $gte: monthStart } }),
        Lead.count({}),
        Lead.count({ status: "won" }),
        Lead.aggregate({ query: {}, dateBucket: { field: "created_date", unit: "day" } })
          .then((result) => result?.rows ?? [])
          .catch(() => []),
        Lead.aggregate({ query: {}, groupBy: "service_interest" })
          .then((result) => result?.rows ?? [])
          .catch(() => []),
        Lead.filter({}, { sort: "-created_date", limit: 10 }),
      ]);

      if (!alive) return;

      const pie = pieRows
        .map((row) => ({
          label:
            SERVICE_OPTIONS.find((item) => item.value === row.service_interest)?.label ??
            row.service_interest ??
            "Chưa chọn",
          count: row.count ?? 0,
        }))
        .filter((row) => row.count > 0);

      setData({
        today,
        week,
        month,
        total,
        won,
        winRate: total > 0 ? Math.round((won / total) * 100) : 0,
        bars: buildDaySeries(barRows),
        pie,
        recent: recent?.items ?? [],
      });
    })().catch((err) => {
      if (alive) setError(err?.message ?? "Không tải được dữ liệu tổng quan.");
    });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Tổng quan</h1>
          <p className="mt-1 font-body text-sm text-ink-soft/60">
            Tình hình lead và hiệu quả kinh doanh của GMedia.
          </p>
        </div>
        <Link
          to="/admin/leads"
          className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark hover:text-ink"
        >
          Xem tất cả lead →
        </Link>
      </header>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </p>
      )}

      {!data && !error && (
        <p className="font-body text-sm text-ink-soft/55">Đang tải số liệu…</p>
      )}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Lead hôm nay" value={data.today} hint="Tính từ 00:00 hôm nay" />
            <KpiCard label="Lead 7 ngày" value={data.week} hint="7 ngày gần nhất" />
            <KpiCard label="Lead tháng này" value={data.month} hint="Từ đầu tháng" />
            <KpiCard
              label="Tỷ lệ chốt"
              value={`${data.winRate}%`}
              hint={`${data.won}/${data.total} lead đã chốt`}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <section className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                Lead theo ngày (30 ngày)
              </h2>
              <span className="mt-3 block h-[2px] w-10 bg-gold-gradient" />
              <div className="mt-4">
                <LeadBarChart data={data.bars} />
              </div>
            </section>

            <section className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                Lead theo dịch vụ
              </h2>
              <span className="mt-3 block h-[2px] w-10 bg-gold-gradient" />
              <div className="mt-4">
                <LeadPieChart data={data.pie} />
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-line bg-paper p-5 shadow-luxe">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink">
              10 lead mới nhất
            </h2>
            <span className="mt-3 block h-[2px] w-10 bg-gold-gradient" />
            <div className="mt-4">
              <RecentLeadsTable leads={data.recent} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}